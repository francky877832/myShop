import { API_BACKEND } from '@env';

import React, { useState, forwardRef, useRef, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform, KeyboardAvoidingView, Alert, InteractionManager  } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Comments from './Comments';
import EmptyList from '../common/EmptyList';
import { CustomActivityIndicator } from "../common/CommonSimpleComponents";

import { commentsStyles } from '../../styles/commentsStyles';
import { appColors, screenHeight } from '../../styles/commonStyles';

import { server } from '../../remote/server';
import { reshapeComments, convertWordsToNumbers, containsEmail } from '../../utils/commonAppFonctions';
import { CommentsContext } from '../../context/CommentsContext';
import { UserContext } from '../../context/UserContext';

import { sendNotifications } from '../../utils/commonAppNetworkFunctions'
import { customText } from 'react-native-paper';

/*
const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
*/
const AllCommets = (props) =>
{
    const navigation = useNavigation()
    const route = useRoute()
    const { product, inputFocused, comments } = route.params
    const { reshapedComments, setReshapedComments, onNewComment, setOnNewComment, setPage, isResponseTo, setIsResponseTo, loadMoreComments, loadLastComment} = useContext(CommentsContext)
  
    //const [comments_, setComments_] = useState(reshapedComments)
    //const setIsLoading = route.params.setIsLoading
    const [isFocused, setIsFocused] = useState(false)
    //const [isResponseTo, setIsResponseTo] = useState(null)
    const [inputValue, setInputValue] = useState("")
    const [refreshComponent, setRefreshComponent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userToResponse , setUserToResponse] = useState(false)
    
    const flatListRef = useRef(null);
    const {user} = useContext(UserContext)

    const handleChangeText = useCallback((text) => {
        setInputValue(text);
      }, []);
    const inputRef = useRef(null)
    
useEffect(()=>{
    
    const task = InteractionManager.runAfterInteractions(() => {
        if (inputRef.current && route.params.inputFocused)
        {
            inputRef.current.focus()
        }
    })

    return () => task.cancel();

}, [])

useEffect(() => {
      const onBackPress = (e) => {
        e.preventDefault();
  
        setUserToResponse(null);
        setIsResponseTo(null);
  
        navigation.dispatch(e.data.action);
      };
  
      const unsubscribe = navigation.addListener('beforeRemove', onBackPress);
  
      return unsubscribe;
    }, [navigation])


const updateReshapedComments = (comment)=>{
    //console.log("isResponseTo")
    setReshapedComments((prevComments)=>{
        //console.log(isResponseTo)
        //console.log(prevComments)
        if (!Array.isArray(prevComments)) {
            prevComments = [];
        }

        let updatedComments = [...prevComments];
        if(!!isResponseTo)
        {
            //console.log("updatedComments")
            updatedComments = prevComments.map((item)=>{
                    //console.log(cm)
                if(item._id === comment.isResponseTo)
                {
                    /*if (!Array.isArray(updatedComments[i].subComment)) {
                        updatedComments[i].subComment = [];
                    }*/
                    //console.log( updatedComments[i].subComment)
                    //updatedComments[i].subComment.push(comment)
                    let subComment = []
                    if (Array.isArray(item.subComment)) {
                        subComment = [...item.subComment];
                    }
                    return {...item, subComment:[...subComment, comment]}
                }
                return item
            })
        }
        else
        {//console.log("prevComments")
            updatedComments.unshift(comment)
        }
            return updatedComments
    })
}
//username
const addComment = async (item) => {
    setIsLoading(true);
    const checkNumber =  convertWordsToNumbers(inputValue)
    //console.log(checkNumber)
    if(containsEmail(inputValue) || checkNumber==false)
    {
        Alert.alert("Erreur!!!","Votre commentaire viole les regles de la commnauté. Evitez de partager les contacts : numéro de téléphone, email, profil reseau sauciaux.\
                    Si vous pensez que ceci est une erreur, veillez contacter le service client.")
            setIsLoading(false)
                    return;
    }  

   
        try{
            //console.log("Ok")
            const comment = {
                //_id : "",
                id : Math.random().toString(),
                user: user._id,
                username : user.username,
                product : item._id,
                text : inputValue,
                subComment : [],
                isResponseTo : isResponseTo
            }
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
            }
            //console.log(isResponseTo)
                updateReshapedComments(comment)

            const response = await fetch(`${server}/api/datas/comments/add/${isResponseTo}`, {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json',
                },})
                        //console.log(datas)
                
            if (!response.ok) {
                throw new Error('Erreur lors de la requête'+(await response.text()));
            }

            await loadLastComment(product, user)
            setPage((prevPage) => prevPage - 1);
            setIsLoading(false)
            //console.log(item.seller)
            if(!isResponseTo) //!isResponseTo)
            {
                if(user._id!=item.seller._id)
                {
                    await sendNotifications({ user:item.seller._id, source:"app", model:"PRODUCTS", type:"ON_NEW_COMMENT", datas:item._id })
                }
            }
            else
            {   
                if(user._id!=userToResponse?._id)
                { 
                    await sendNotifications({ user:userToResponse?._id, source:"app", model:"PRODUCTS", type:"ON_RESPONSE_COMMENT", datas:item._id })
                }
            }
       
        }catch(error){
            console.log(error)
            Alert.alert("Erreur", "Une erreur est survenue! "+ error.message)
            setIsLoading(false)
            setOnNewComment(false)
        } finally {
            setIsLoading(false)
            setOnNewComment(false)
        }

}

useEffect(()=>{ //or useFocusEffect(useCallback(,[]))
        
    // all ? false : 
    console.log("o")

    const fetchData = async () => {
        //setIsLoading(true);
        console.log("o")
        await loadMoreComments(product)    
    };
 
    //if (isLoading) {
    fetchData();
    //}
    
 }, [onNewComment])

/*
 <ScrollView ref={scrollViewRef} contentContainerStyle={[allCommetsStyles.container,{}]} >
                <Comments scrollViewRef={scrollViewRef} inputRef={inputRef} setters={{inputValue:inputValue, setInputValue:setInputValue, setIsResponseTo:setIsResponseTo}}  all={true} reshapedComments={reshapedComments} product={product}/>
            </ScrollView>
*/

    return(
<View style={{ flex: 1 }}>
    { reshapedComments.length <= 0 
    
    ?

        <View style={[allCommetsStyles.container,{paddingBottom:100}]}>
            <EmptyList iconType='font-awesome' iconName="commenting-o" iconSize={100} iconColor={appColors.secondaryColor1} text="Ce produit n'a pas encore reçu de commentaires. Soyez le premier a commenter pour garantir votre achat." />
        </View>

    :

        <View  style={[allCommetsStyles.container,{}]} >
            <Comments navigation={navigation} user={user} setUserToResponse={setUserToResponse} flatListRef={flatListRef} inputRef={inputRef} setters={{inputValue:inputValue, setInputValue:setInputValue, setIsResponseTo:setIsResponseTo}}  all={true} reshapedComments={reshapedComments} product={product}/>
        </View>
    }
       
        <View style={[allCommetsStyles.inputContainer]}>
            
            {!!userToResponse &&
                <View>
                    <View style={[{height:20, backgroundColor:appColors.white}]}></View>
                    <View style={[allCommetsStyles.isResponseTo]}>
                        <Pressable  View style={[allCommetsStyles.isResponseToClose]}  onPress={()=>{setUserToResponse(null);setIsResponseTo(null)}} >
                            <Icon name="close" type='ionicon' size={20} color={appColors.white} />
                        </Pressable>
                        <View>
                            <Pressable  onPress={()=>{}}>
                                <Icon name="arrow-undo-sharp" type='ionicon' size={24} color={appColors.secondaryColor1} />
                            </Pressable>
                            <View View style={[allCommetsStyles.isResponseToTextContainer]}>
                                <Text style={[customText.text,{color:appColors.secondaryColor3,fontWeight:'bold'}]}>Vous répondez a - {userToResponse.username}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            }
        <Input
                placeholder="Posez une question"
                onChangeText={handleChangeText}
                multiline={true}
                placeholderTextColor={appColors.lightWhite}
                inputStyle={[
                    //commentsStyles.searchBarInput,
                    //commentsStyles.input,
                    isFocused && commentsStyles.inputFocused,
                    {fontSize:14}
                ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid='transparent'
                inputContainerStyle={{ borderBottomWidth: isFocused ? 0 : 1 }}
                ref={inputRef}
                rightIcon={isLoading 
                    ? <ActivityIndicator color={appColors.secondaryColor1} /> 
                    : <Pressable onPress={() => { addComment(route.params.product); }} style={[commentsStyles.sendButton]}>
                        <Icon name='send-sharp' type='ionicon' size={40} color={appColors.secondaryColor1} />
                    </Pressable>
                }
                value={inputValue}
                autoCorrect={false}
            />
                
        </View>
                        { isLoading &&
                            <ActivityIndicator color={appColors.secondaryColor1} /> 
                        }
</View>
    )
}


export default React.memo(AllCommets)

const allCommetsStyles = StyleSheet.create({
    container :
    {
        //flex:1,
        backgroundColor : appColors.white,
        heighteight:screenHeight,
        paddingBottom : 70,
    },
    inputContainer :
    {
        flex : 1,
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
        backgroundColor : appColors.white,
        borderTopWidth : 1,
        borderColor : appColors.lightWhite,
        paddingHorizontal : 5,
        zIndex:99
    },
    isResponseTo:
    {
        //flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : appColors.gray,
        borderLeftWidth : 10,
        borderLeftColor : appColors.secondaryColor1,
        borderTopLeftRadius : 10,
        borderBottomLeftRadius : 10,
    },
    isResponseToClose:
    {
        position : 'absolute',
        right : 0,
        top : -2,
        //backgroundColor : appColors.red,
    }
})

