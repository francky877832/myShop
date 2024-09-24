import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView, ImageBackground} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as SecureStore from 'expo-secure-store';


import { appColors, customText, appFont, formErrorStyle } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents';

import auth from '@react-native-firebase/auth';


import { server } from '../../remote/server';
import { serialize, getFirebaseErrorMessage } from '../../utils/commonAppFonctions'
import { UserContext } from '../../context/UserContext';


import userValidationSchema from '../forms/validations/userValidation';
import * as Yup from 'yup';

const UserLogin = (props) =>
{
    const {  } = props
    const route = useRoute()
    const navigation = useNavigation()
    const {checkEmail, checkPassword, checkUsername, user, setUser, updateUser, setIsAuthenticated, loginUserWithEmailAndPassword} = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    
    const [isPasswordShowed, setIsPasswordShowed] = useState(false)

    const [isEmailCorrect, setIsEmailCorrect] = useState("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState("")
    const [isUsernameCorrect, setIsUsernameCorrect] = useState("")


    const [errors, setErrors] = useState({});



//console.log(user)   
const loginUser = async (email, username, password) => {
    try
    {
        setIsLoading(true)
        const formData = new FormData()
        const form = {email, password, username:email.split('.')[0]}
        await userValidationSchema.validate(form, { abortEarly: false });

        const userCredential = await auth().signInWithEmailAndPassword(email, password);

        const firebase_user = userCredential.user;

        formData.append('password', password); //OR firebase_user.password
        const newUser = await updateUser(email, formData);

        const user = await loginUserWithEmailAndPassword(newUser.email, newUser.username, newUser.password)

        if(!firebase_user || !user)
        {   
            if(!newUser)
            {
                const error = new Error('Utilisateur non trouvé');
                error.code = 'auth/user-not-found';
                throw error;
            }
        }

        navigation.replace('Preferences');
        return;
    }
    catch(error)
    {
        
        console.log(error)

        if (error instanceof Yup.ValidationError) 
        {
            const formErrors = {};
            error.inner.forEach(err => {
                formErrors[err.path] = err.message;
            });
                //console.log(formErrors)
            setErrors(formErrors);
        }
        else
        {
            if(error.code)
            {
                Alert.alert("Erreur",getFirebaseErrorMessage(error.code))
                return;
            }
            Alert.alert("Error", "Une erreur est sruvenue lors de la verificaiton de vos informations. Vérifiez les données fournies.")
        }
        return;
    }finally{
        setIsLoading(false)
    }
}

// {errors.images && <Text style={[formErrorStyle.text]}>{errors.images}</Text>}
/*
<LinearGradient
                colors={['#f27a1a', '#ff8a2a', '#ba5c11', '#551b01']} // Ajoutez autant de couleurs que nécessaire
                locations={[0.2, 0.1, 0.3, 0.7]} // Réglez les pourcentages de chaque couleur
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1, }}
                style={[{flex:1,}]}
                >
                    <View style={[userLoginStyles.titleBox]}>
                        <Text style={[userLoginStyles.title]}>Connectez-Vous</Text>
                    </View>
                </LinearGradient>
            */
    return(
<KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
        <View style={[userLoginStyles.container]}>
                <ImageBackground source={require('../../assets/images/login_background.jpg')} style={userLoginStyles.backgroundImage}>
                <View style={[userLoginStyles.cover]}></View>

                <View>
                    <Text style={userLoginStyles.text}>Connectez-vous</Text>
                </View>

            <View style={[userLoginStyles.infoContainer]}>
                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Email" onChangeText={(text)=>{setEmail(text)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input, ]}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[userLoginStyles.inputContainer, isEmailFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='email' type='entypo' size={24} color={isEmailFocused?appColors.secondaryColor1:appColors.black} />
                                </Pressable>
                            }
                            rightIcon={ 
                                isEmailCorrect === 'true' ?
                                <Pressable onPress={() => {}}>
                                    <Icon name='checkmark-circle-outline' type='ionicon' size={24} color={appColors.green} />
                                </Pressable>
                                :
                                isEmailCorrect === 'false' ?
                                 <Pressable onPress={() => {}}>
                                 <Icon name='close-circle-outline' type='ionicon' size={24} color={appColors.red} />
                             </Pressable>
                             :
                             false
                            }
                            value={email}
                        /> 
                        {errors.email && <Text style={[formErrorStyle.text]}>{errors.email}</Text>}
                </View>

                <View style={{height:10}}></View>

                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Mot De Passe" onChangeText={(pwd)=>{setPassword(pwd)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input,]}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1},isPasswordFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='lock-closed-sharp' type='ionicon' size={24} color={isPasswordFocused?appColors.secondaryColor1:appColors.black} />
                                </Pressable>
                            }
                            rightIcon = {
                                isPasswordShowed ?
                                    <Pressable onPress={()=>{setIsPasswordShowed(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsPasswordShowed(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                            value={password}
                            secureTextEntry={!isPasswordShowed}
                        /> 
                        {errors.password && <Text style={[formErrorStyle.text]}>{errors.password}</Text>} 
                </View>   

                <Pressable style={[userLoginStyles.forgotBox]} onPress={() => { navigation.navigate('ResetPassword') } }>
                    <Text style={[customText.text, userLoginStyles.forgotText]}>Mot de passe oublié ?</Text>
                </Pressable>                 
            
                <View style={{height:10}}></View>
            <CustomButton text="Valider" onPress={()=>{loginUser(email, username, password)}} color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable: userLoginStyles.pressable, text:userLoginStyles.text}} />
                            
                            
            </View>
              <Text>{/* <Button title="Sign Up" onPress={()=>{navigation.navigate("UserSignup")}} /> */}</Text>
        </ImageBackground>

        <CustomModalActivityIndicator onRequestClose={setIsLoading} isLoading={isLoading} size="large" color={appColors.secondaryColor1} message="Vérification des donnéees..." />
       

        </View>
</KeyboardAwareScrollView>
    )
/*}else{
    navigation.navigate("Preferences", {user:user})
}*/
}


export default UserLogin


