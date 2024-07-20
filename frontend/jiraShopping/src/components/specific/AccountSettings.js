import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Alert, Pressable, Image, Keyboard, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Icon } from 'react-native-elements';

import PhoneAuth from './PhoneAuth';

import { appColors, customText, appFont, screenHeight, screenWidth } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';

import { UserContext } from '../../context/UserContext';

import { requestPermissions, pickImages, takePhoto, resizeImages } from '../../utils/utilsFunctions'
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';


//<Image source={{uri: item.images[0]}}  style={[]} />
const loggedUser = "Francky"
const   AccountSettings = (props) => {


    const navigation = useNavigation()

    const [allowBack, setAllowBack] = useState(false);
    const [username, setUsername] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [slogan, setSlogan] = useState("")

    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isTelFocused, setIsTelFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isSloganFocused, setIsSloganFocused] = useState(false)
    const [isEmailLoading, setIsEmailLoading] = useState(false)

    const {user, setUser} = useContext(UserContext)
    //console.log(user)
    const [pp, setPp] = useState([user.image])
    const [cameraOrGalery, setCameraOrGalery] = useState(false)
    const [isPostLoading, setIsPostLoading] = useState(false)


    const MAX_IMAGES = 1, MIN_IMAGES = 1
    const IMG_MAX_HEIGHT = screenHeight/2
    const IMG_MAX_WIDTH = screenWidth


   //GoBackPermission
   const onBackPress = useCallback((e) => {
    if (allowBack) {
        return;
    }

    if (e) {
      e.preventDefault(); // Empêcher le comportement par défaut de la navigation
    }

    Alert.alert(
      "Attention!",
      "Abandoné les modifications ?",
      [
        { text: "Non", onPress: () => null, style: "cancel" },
        { text: "Oui", onPress: () =>{
                setAllowBack(true);
                //navigation.goBack();
                navigation.dispatch(e.data.action);
            }
         }
      ]
    );
  }, [allowBack, navigation]);


useEffect(()=>{
//Appel de useCallBack
   // Ajouter l'écouteur pour l'événement de retour
const unsubscribe = navigation.addListener('beforeRemove', onBackPress);
return unsubscribe;
}, [navigation, onBackPress])

    const pickUpImages = async () =>{
        
        const img = await pickImages(MAX_IMAGES, MIN_IMAGES, [])
    //console.log(img)
        setPp((prevImages)=>{
                return [
                    img[0].uri,
                ]
            }
        )
        setCameraOrGalery(false)  
    }
    
           
    //
    const takeUpPhoto = async () => {
        const img = await takePhoto(MAX_IMAGES, MIN_IMAGES, pp)
        setPp((prevImages) => [img.uri]);
        setCameraOrGalery(false)
    }

    //console.log(pp)
const updateProfil = async () => {
    setIsPostLoading(true)
    const pp_ = await resizeImages(pp,IMG_MAX_HEIGHT,IMG_MAX_WIDTH)
}
    return(
<View style={[accountSettingsStyles.container]}>
    <KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex:1}}>
            <View style={[accountSettingsStyles.topBox]}></View>

            <View style={[accountSettingsStyles.pp]}>
                <Pressable>
                <Image source={{uri: pp[0] }} style={[accountSettingsStyles.imgeProfil]} />
                </Pressable>
                <Pressable style={[{left:20,marginTop:50,}]} onPress={()=>{setCameraOrGalery(!cameraOrGalery)}}>
                    <Text style={[accountSettingsStyles.text,{textAlignVertical:"bottom",textDecorationLine:"underline",color:appColors.secondaryColor1,}]}>Mettre a jour</Text>
                </Pressable>
            </View>

            <View style={[accountSettingsStyles.infosBox]}>
                <View style={[accountSettingsStyles.inputBox]}>
                    <Text style={[accountSettingsStyles.text,]}>Nom D'utilisateur</Text>
                        <Input placeholder="EX : Samsung Galaxy Z-Fold" value={username} onChangeText={(name)=>{setUsername(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isUsernameFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                </View>

                
                    
                    <PhoneAuth user={user} setUser={setUser} tel={tel} setTel={setTel} isTelFocused={isTelFocused} setIsTelFocused={setIsTelFocused}  

                        accountSettingsStyles={accountSettingsStyles}
                    />
    

                <View style={[accountSettingsStyles.inputBox]}>
                        <View style={[accountSettingsStyles.VerifierBox]}>
                            <Text style={[accountSettingsStyles.text,]}>Email</Text>
                            {!user.isEmailVerified ?
                                <Pressable style={[accountSettingsStyles.verifier, {}]}>
                                    { !isEmailLoading ?
                                        <Text style={[accountSettingsStyles.text,{color:appColors.white,fontWeight:"bold",}]}>Verifier</Text>
                                        :
                                        <ActivityIndicator color={appColors.white} size="small" />
                                    }
                                </Pressable>
                                :
                                <View>
                                    <Icon type="ionicon" name="checkmark-circle" color={appColors.green} />
                                </View>
                            }
                        </View>

                        <Input placeholder="EX : thestyle@gmail.com" value={email} onChangeText={(name)=>{setEmail(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isEmailFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                </View>

                <View style={[accountSettingsStyles.inputBox]}>
                    <Text style={[accountSettingsStyles.text,]}>Slogan De Votre Boutique</Text>
                        <Input placeholder="EX : TheStyle, votre marque." value={slogan} onChangeText={(name)=>{setSlogan(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsSloganFocused(true)}
                            onBlur={() => setIsSloganFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, ,isSloganFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                </View>
            </View>


            <View style={[addProductStyles.addProductSubmitView,{}]}>
                { !isPostLoading ?
                        <CustomButton text="Enregistrer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={updateProfil} />
                        :
                        <ActivityIndicator color={appColors.secondaryColor1} size="large" />
                }
            </View>
        </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView> 

    {cameraOrGalery &&
            <View style={[addProductStyles.bottomPicker]}>
                <Pressable onPress={pickUpImages}>
                    <Icon name="images-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos</Text>
                </Pressable>
                <Pressable onPress={takeUpPhoto}>
                    <Icon name="camera-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Camera</Text>
                </Pressable>
            </View>
        }         
</View>
    )
}
export default AccountSettings

const accountSettingsStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        backgroundColor : appColors.white,
        borderTopWidth : 1,
        borderColor : appColors.secondaryColor3,
    },
    topBox :
    {
        backgroundColor : appColors.lightOrange,
        height : screenHeight/4,
    },
    pp :
    {
        flexDirection : "row",
        left : 20,
        top : -50,
        //backgroundColor : appColors.white,
    },
    imgeProfil:
    {
        width : 100,
        height : 100,
        borderRadius : 50,
    },

    infosBox :
    {
        paddingLeft : 25,
        backgroundColor : appColors.white,
        top : -20,
    },
    inputBox :
    {

    },
    text:
    {
        ...customText.text,
        fontSize : 15,
        fontWeight : "bold",
    },
    VerifierBox :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingRight : 10,
    },
    verifier :
    {
        backgroundColor : appColors.secondaryColor1,
        padding : 5,
        paddingHorizontal : 10,
        borderRadius : 15,
    },
   
})