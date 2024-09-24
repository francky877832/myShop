import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

import { appColors, customText, appFont } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton } from '../common/CommonSimpleComponents';
import { UserContext } from '../../context/UserContext';


import userValidationSchema from '../forms/validations/userValidation';
import * as Yup from 'yup';

const ResetPassword = (props) =>
{
    const {  } = props
    const route = useRoute()
    const navigation = useNavigation()
    const {checkEmail, checkPassword, checkUsername, user, setUser, getUser, updateUser, setIsAuthenticated, loginUserWithEmailAndPassword} = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")


    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    

    const [isEmailCorrect, setIsEmailCorrect] = useState("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState("")
    const [isUsernameCorrect, setIsUsernameCorrect] = useState("")

    const [emailExists, setEmailExists] = useState(false)
    const [errors, setErrors] = useState({});


    const  resetUserPassword = async (email) => {
    try
    {
        setErrors({});
        if(!emailExists)
        {
            //mongoDb getUser
           const userExists = await getUser(email)
           //console.log()
           setEmailExists(true)
            if(!userExists)
            {
                //return; if not exists
                Alert.alert('Error', 'Email non trouvée')
                      
            }
            
            return;
        }

        const form = {password}
        await userValidationSchema.validate(form, { abortEarly: false });
    /*
        const formData = new FormData()
        //password
        formData.append('password', email);
          const newUser = await updateUser(email, formData);
          //console.log(newUser)
          storeCache('user', {email:newUser.email, username:newUser.username, password:newUser.password})
    */

          //Rediriger ver UserLogin
    }
    catch(error)
    {
        console.log(error)
        if (error instanceof Yup.ValidationError) {
            const formErrors = {};
            error.inner.forEach(err => {
                formErrors[err.path] = err.message;
            });
                //console.log(formErrors)
        setErrors(formErrors);
        }
    }
}

    return(
        <View style={[{flex:1}]}>
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
                            inputContainerStyle={[{borderBottomWidth:1},isEmailFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='mail-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
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
                </View>
{ emailExists &&
        <View>
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
                                    <Icon name='key-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                            }
                            rightIcon={ 
                                isPasswordCorrect === 'true' ?
                                <Pressable onPress={() => {}}>
                                    <Icon name='checkmark-circle-outline' type='ionicon' size={24} color={appColors.green} />
                                </Pressable>
                                :
                                isPasswordCorrect === 'false' ?
                                 <Pressable onPress={() => {}}>
                                    <Icon name='close-circle-outline' type='ionicon' size={24} color={appColors.red} />
                                </Pressable>
                                :
                                false
                            }
                            value={password}
                            secureTextEntry
                        />   
                </View> 


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
                                    <Icon name='key-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                            }
                            rightIcon={ 
                                isPasswordCorrect === 'true' ?
                                <Pressable onPress={() => {}}>
                                    <Icon name='checkmark-circle-outline' type='ionicon' size={24} color={appColors.green} />
                                </Pressable>
                                :
                                isPasswordCorrect === 'false' ?
                                 <Pressable onPress={() => {}}>
                                    <Icon name='close-circle-outline' type='ionicon' size={24} color={appColors.red} />
                                </Pressable>
                                :
                                false
                            }
                            value={password}
                            secureTextEntry
                        />   
                </View> 
        </View>
}


               

                    <CustomButton text="Valider" onPress={()=>{resetUserPassword(email)}} color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable: userLoginStyles.pressable, text:userLoginStyles.text}} />
                </View>
                    <Button title="Login" onPress={()=>{navigation.navigate("UserLogin")}} />

        </View>
    )
}


export default ResetPassword


