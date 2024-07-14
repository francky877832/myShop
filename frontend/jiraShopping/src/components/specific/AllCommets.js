import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, KeyboardAvoidingView, Alert, InteractionManager  } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


import Comments from './Comments';
import { commentsStyles } from '../../styles/commentsStyles';
import { appColors, screenHeight } from '../../styles/commonStyles';

import { server } from '../../remote/server';
import { reshapeComments, convertWordsToNumbers, containsEmail } from '../../utils/commonAppFonctions';


const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
const AllCommets = (props) =>
{
    const { navigation } = props
    const route = useRoute()
    const product = route.params.product
    const [isFocused, setIsFocused] = useState(false)
    const [isResponseTo, setIsResponseTo] = useState(product._id)
    const [inputValue, setInputValue] = useState("")
    const [onNewComment, setOnNewComment] = useState(false)

    const inputRef = useRef(null)
    
useEffect(()=>{
    
    const task = InteractionManager.runAfterInteractions(() => {
        if (inputRef.current && route.params.inputFocused)
            inputRef.current.focus()
    })

    return () => task.cancel();

}, [])


//username
const addComment = async (item) => {
    const checkNumber =  convertWordsToNumbers(inputValue)
    //console.log(checkNumber)
    if(containsEmail(inputValue) || checkNumber==false)
    {
        Alert.alert("Erreur!!!","Votre commentaire viole les regles de la commnauté. Evitez de partager les contacts : numéro de téléphone, email, profil reseau sauciaux.\
                    Si vous pensez que ceci est une erreur, veillez contacter le service client.")
                return;
    }
 
    

    const comment = {
        user: loggedUserId,
        username : loggedUser,
        product : item._id,
        text : inputValue,
        isResponseTo : isResponseTo,
    }
    
        try{
            //console.log("Ok")
            const response = await fetch(`${server}/api/datas/comments/add/${item._id}`, {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json',
                },})
                        //console.log(datas)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            Alert.alert("Comment ajouté avec success.")
                        
        }catch(error){
            Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        }

}



    return(
<View style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={[allCommetsStyles.container,{}]}  
            resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} 
            scrollEnabled={true}
            extraScrollHeight={20}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
        >
                <ScrollView contentContainerStyle={[{  }]} >
                    <Comments setters={{inputValue:inputValue, setInputValue:setInputValue, setIsResponseTo:setIsResponseTo}} onNewComment={onNewComment} all={true} allComments={route.params.comments} product={route.params.product}/>
                </ScrollView>
        </KeyboardAwareScrollView>
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
                    rightIcon={ 
                        <Pressable onPress={() => {addComment(route.params.product);setOnNewComment(!onNewComment)}} style={[commentsStyles.sendButton, {}]}>
                            <Icon name='send-sharp' type='ionicon' size={40} color={appColors.secondaryColor1} />
                        </Pressable>
                    }
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
        flex:1,
        backgroundColor : appColors.white,
        //height:screenHeight-100,
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

