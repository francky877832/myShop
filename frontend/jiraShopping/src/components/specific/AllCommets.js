import { API_BACKEND } from '@env';

import React, { useState, forwardRef, useRef, useEffect, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform, KeyboardAvoidingView, Alert, InteractionManager  } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import Comments from './Comments';
import { CustomActivityIndicator } from "../common/CommonSimpleComponents";

import { commentsStyles } from '../../styles/commentsStyles';
import { appColors, screenHeight } from '../../styles/commonStyles';

import { server } from '../../remote/server';
import { reshapeComments, convertWordsToNumbers, containsEmail } from '../../utils/commonAppFonctions';
import { ProductItemContext } from '../../context/ProductItemContext';


const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
const AllCommets = (props) =>
{
    const navigation = useNavigation()
    const route = useRoute()
    const { product } = route.params
    const { comments, setComments } = useContext(ProductItemContext)
    const [comments_, setComments_] = useState(comments)
    //const setIsLoading = route.params.setIsLoading
    const [isFocused, setIsFocused] = useState(false)
    const [isResponseTo, setIsResponseTo] = useState(product._id)
    const [inputValue, setInputValue] = useState("")
    const [onNewComment, setOnNewComment] = useState(false)
    const [refreshComponent, setRefreshComponent] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    const inputRef = useRef(null)
    
useEffect(()=>{
    
    const task = InteractionManager.runAfterInteractions(() => {
        if (inputRef.current && route.params.inputFocused)
            inputRef.current.focus()
    })

    return () => task.cancel();

}, [])


useEffect(()=>{
    //Appel de useCallBack
       // Ajouter l'écouteur pour l'événement de retour
    const unsubscribe = navigation.addListener('beforeRemove', ()=>{
        (e) => {
            if (e) {
              e.preventDefault(); // Empêcher le comportement par défaut de la navigation
            }
            //setOnNewComment(true)
            //setIsLoading_(true)
            navigation.dispatch(e.data.action);
        }
    });
    return unsubscribe;
}, [navigation])


const updateComments_ = (comment)=>{
    //console.log("okcOMMENT")
    setComments_((prevComments)=>{
        return [comment, ...prevComments]
    })
}
//username
const addComment = async (item) => {
    
    const checkNumber =  convertWordsToNumbers(inputValue)
    //console.log(checkNumber)
    if(containsEmail(inputValue) || checkNumber==false)
    {
        Alert.alert("Erreur!!!","Votre commentaire viole les regles de la commnauté. Evitez de partager les contacts : numéro de téléphone, email, profil reseau sauciaux.\
                    Si vous pensez que ceci est une erreur, veillez contacter le service client.")
            setIsLoading(false)
                    return;
    }  

    const comment = {
        user: loggedUserId,
        username : loggedUser,
        product : item._id,
        text : inputValue,
        isResponseTo : isResponseTo,
    }
 

    //console.log(comment)
        try{
            //console.log("Ok")
            const response = await fetch(`${API_BACKEND}/api/datas/comments/add/${item._id}`, {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json',
                },})
                        //console.log(datas)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête'+(await response.text()));
            }

            //Alert.alert("Comment ajouté avec success.")
            //setIsLoading(true)
            //updateComments_(comment)
            setComments([comment,...comments_])
            setIsLoading(false)
        }catch(error){
            Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            setIsLoading(false)
        }

}

/*
  <KeyboardAwareScrollView style={[allCommetsStyles.container,{}]}  
            //resetScrollToCoords={{ x: 0, y: 0 }} 
            contentContainerStyle={{flexGrow:1}} 
            scrollEnabled={true}
            //extraScrollHeight={0}
            //keyboardShouldPersistTaps="always"
            enableOnAndroid={true}
        >


</KeyboardAwareScrollView>


*/

    return(
<View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={[allCommetsStyles.container,{}]} >
                <Comments setters={{inputValue:inputValue, setInputValue:setInputValue, setIsResponseTo:setIsResponseTo}}  onNewComment={onNewComment} setOnNewComment={setOnNewComment} all={true} comments={comments_} product={product}/>
            </ScrollView>
        
        <View style={[allCommetsStyles.inputContainer]}>
            <Input placeholder="Posez une question" onChangeText={(text)=>{setInputValue(text)}}
                    multiline={true}
                    numberOfLines={1}
                    placeholderTextColor={appColors.lightWhite}
                    inputStyle = {[commentsStyles.searchBarInput, commentsStyles.input, isFocused && commentsStyles.inputFocused,]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    underlineColorAndroid='transparent'
                    inputContainerStyle={{ borderBottomWidth:isFocused?0:1, }}
                    ref={inputRef}
                    rightIcon={ isLoading 
                        ?
                            <ActivityIndicator color={appColors.secondaryColor1} /> 
                        :
                        <Pressable onPress={() => {setIsLoading(true);addComment(route.params.product);}} style={[commentsStyles.sendButton, {}]}>
                            <Icon name='send-sharp' type='ionicon' size={40} color={appColors.secondaryColor1} />
                        </Pressable>}
                    value={inputValue}
                />
                
        </View>
</View>
    )
}


export default AllCommets

const allCommetsStyles = StyleSheet.create({
    container :
    {
        //flex:1,
        backgroundColor : appColors.white,
        minHeight:screenHeight,
    },
    inputContainer :
    {
        position : "relative",
        left : 0,
        right : 0,
        bottom : 0,
        backgroundColor : appColors.white,
        borderTopWidth : 1,
        borderColor : appColors.lightWhite,
    },
})

