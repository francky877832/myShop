import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Alert, Pressable, Image, Keyboard, TouchableWithoutFeedback, ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Icon } from 'react-native-elements';

import PhoneAuth from './PhoneAuth';

import { appColors, customText, appFont, screenHeight, screenWidth } from '../../styles/commonStyles';
import {CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';

import { UserContext } from '../../context/UserContext';

import { requestPermissions, pickImages, takePhoto, resizeImages } from '../../utils/utilsFunctions'
import { useNavigation } from '@react-navigation/native';
import { server, usersImagesPath } from '../../remote/server';
import { storeCache } from '../../cache/cacheFunctions';

import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';


//<Image source={{uri: item.images[0]}}  style={[]} />
const loggedUser = "Francky"
const   AccountSettings = (props) => {


    const navigation = useNavigation()
    const {user, setUser, updateUser} = useContext(UserContext)


    const [allowBack, setAllowBack] = useState(false);
    const [username, setUsername] = useState(user.username)
    const [tel, setTel] = useState(user.phone)
    const [email, setEmail] = useState(user.email)
    const [slogan, setSlogan] = useState(user.slogan)
    const [isEmailVerified, setIsEmailVerified] = useState(user.isEmailVerified)
    const [showPasswordInput, setShowPasswordInput] = useState(false)
    const [password, setPassword] = useState("")
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [hasSentEmail, setHasSentEmail] = useState(false)

    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isTelFocused, setIsTelFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isSloganFocused, setIsSloganFocused] = useState(false)
    const [isEmailLoading, setIsEmailLoading] = useState(false)

    const [hasUploaded, setHasUploaded] = useState(false)
    const [checkEmail, setCheckEmail] = useState(false)

    //console.log(`${usersImagesPath}/${user.image}`)
    const [pp, setPp] = useState([`${usersImagesPath}/${user.image}`])
    const [ppImage, setPpImage] = useState([])
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
   if(!hasUploaded)
    {
        const unsubscribe = navigation.addListener('beforeRemove', onBackPress);
        return unsubscribe;
    }
}, [navigation, onBackPress, hasUploaded])




    const signInWithEmailAndPassword = useCallback(async (email, password)=>{
        return await auth().signInWithEmailAndPassword(email, password);
    },[])

    useEffect(()=>{
        //const email = user.email
        //const password = user.password

        //const email = 'francky877832@gmail.com'
        //const password = '0000000'

        async function singIn()
        {
            try
            {

            
                const userCredential = await signInWithEmailAndPassword(email, password)
                if (userCredential.user.emailVerified && !(user.isEmailVerified))
                {
                    setUser(prev => ({...prev, isEmailVerified:1}))
                    setIsEmailVerified(true)
                    setShowPasswordInput(false)
                    //MONGODB


                }
            }catch(error)
            {
                console.log(error)
            }
        }

        
        if(email && password)
        {
            singIn()
        }

    }, [checkEmail])
           
    //

    const pickUpImages = async () => {
        
        const img = await pickImages(MAX_IMAGES, MIN_IMAGES, [])
    //console.log(img)
        if(img)
        {
            setPp((prevImages)=>{
                    return [
                        img[0].uri,
                    ]
                }
            )
            setPpImage(img)
        }
        setCameraOrGalery(false)  
    }

    const takeUpPhoto = async () => {
        const img = await takePhoto(MAX_IMAGES, MIN_IMAGES, pp)
        if(img)
        {
            setPp((prevImages) => [img.uri]);
            setPpImage(img)
        }
        setCameraOrGalery(false)
    }

    const verifyEmail = async (email, password)=> {
        //const myEmail = "francky877832@gmail.com"
        //const myPassword = "0000000"
        //console.log(email, password)
        setIsEmailLoading(true)
            try 
            {
                const userCredential = await signInWithEmailAndPassword(email, password)
                console.log(userCredential)
                if (!userCredential.user.emailVerified)
                {
                    await userCredential.user.sendEmailVerification();
                    Alert.alert("", 'Vérification par email envoyée ! Vérifiez votre boîte de réception.');
                }
                
                setIsEmailLoading(false)
                setHasSentEmail(true)
            } catch (error) {
                setIsEmailLoading(false)
                Alert.alert("Error : ", error.message);
            }
    }
    //console.log(pp)

const updateProfil = async () => {
    setIsPostLoading(true)
    //const pp_ = await resizeImages(pp, IMG_MAX_HEIGHT, IMG_MAX_WIDTH)

    const formData = new FormData();

    const newInfos = {
        username : username,
        phone : tel,
        email : email,
        slogan : slogan,
        isEmailVerified : isEmailVerified?1:0,
    }

    for (const key in newInfos) {
        //console.log(key)
        formData.append(key, newInfos[key]);
    }
    //console.log(ppImage)
    if (ppImage.length>0) {
        formData.append('profilePicture', {
            uri: ppImage[0].uri,      
            name: ppImage[0].fileName,     
            type: ppImage[0].mimeType  
        });
    }


   try {
       
        const newUser = await updateUser(user._id, formData)
        //MISE EN CACHE
        storeCache('user', {email:newUser.email, username:newUser.username, password:newUser.password})
        setUser(newUser)

        Alert.alert('Success', 'Profil mis à jour avec succès.');

       setHasUploaded(true)

    } catch (error) {
        console.error('Erreur lors de la requête:', error);
        setIsPostLoading(false)
    }finally {
        setIsPostLoading(false)
    }

}

    return(
<View style={[accountSettingsStyles.container]}>
    <KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex:1}}>
            <View style={[accountSettingsStyles.topBox]}></View>

            <View style={[accountSettingsStyles.pp]}>
                <Pressable>
                <Image source={{uri: `${pp[0]}` }} style={[accountSettingsStyles.imgeProfil]} />
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
                                <View>
                                    { (!isEmailLoading && !hasSentEmail) ?
                                        <Pressable style={[accountSettingsStyles.verifier, {}]} onPress={()=>{setShowPasswordInput(true)}}>
                                            <Text style={[accountSettingsStyles.text,{color:appColors.white,fontWeight:"bold",}]}>Verifier</Text>
                                        </Pressable>
                                        :
                                        <Pressable style={[accountSettingsStyles.verifier, {backgroundColor:appColors.green}]} onPress={()=>{setCheckEmail(prev=>!prev);setShowPasswordInput(false);}}>
                                            <Text style={[accountSettingsStyles.text,{color:appColors.white,fontWeight:"bold",}]}>Mettre A Jour</Text>
                                        </Pressable>
                                    }
                                </View>
                                
                                :
                                <View>
                                    <Icon type="ionicon" name="checkmark-circle" color={appColors.green} />
                                </View>
                            }
                        </View>

                        <Input placeholder="EX : thestyle@gmail.com" value={email} onChangeText={(email)=>{setEmail(email)}}
                            inputMode='email'
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

                {
                        showPasswordInput &&
                        <View>
                            <Input placeholder="Votre mot de passe" value={password} onChangeText={(pass)=>{setPassword(pass)}}
                                            keyboardType="phone-pad"
                                            multiline={false}
                                            maxLength={100}
                                            placeholderTextColor={appColors.secondaryColor3}
                                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            underlineColorAndroid='transparent'
                                            containerStyle={ []}
                                            inputContainerStyle = {[searchBarStyles.inputContainer, isPasswordFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                                        />
                        {
                        hasSentEmail ?
                            <Pressable style={[accountSettingsStyles.confirmPassword]} onPress={() => {verifyEmail(email, password)}}>
                              { !isEmailLoading ?
                                    <Text style={[{color:appColors.white, fontWeight:'bold',}]}>Envoyer L'email</Text>        
                                    :
                                    <ActivityIndicator color={appColors.white} size="small" />
                              }
                            </Pressable>
                            :
                            <Pressable style={[accountSettingsStyles.confirmPassword,  {backgroundColor:appColors.green}]} onPress={() => {setCheckEmail(rev=>!prev)}}>
                                <Text style={[{color:appColors.white, fontWeight:'bold',}]}>J'ai Déja Validé Mon Email</Text>        
                          </Pressable>
                        }
                            
                          <View style={{height:20}}></View>
                        </View>
                    }

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

    <CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Profil en cours de mise a jour..." />
     
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
        paddingRight : 25,
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
    confirmPassword :
    {
      backgroundColor:appColors.secondaryColor1,
      justifyContent:"center",
      alignItems:"center",
      padding:10,
      borderRadius:20,
    }
   
})