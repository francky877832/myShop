import React, { useState, forwardRef, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Button, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as SecureStore from 'expo-secure-store';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import { userLoginStyles } from './userLoginStyles';

import { CustomButton } from '../common/CommonSimpleComponents';

import { server } from '../../remote/server';
import { serialize } from '../../utils/commonAppFonctions'
import { UserContext } from '../../context/UserContext';
const UserLogin = (props) =>
{
    const {  } = props
    const route = useRoute()
    const navigation = useNavigation()
    const {checkEmail, checkPassword, checkUsername, user, setUser, isAuthenticated, setIsAuthenticated, loginUserWithEmailAndPassword} = useContext(UserContext)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const [isEmailFocused, setIsEmailFocused] = useState(true)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    

    const [isEmailCorrect, setIsEmailCorrect] = useState("")
    const [isPasswordCorrect, setIsPasswordCorrect] = useState("")
    const [isUsernameCorrect, setIsUsernameCorrect] = useState("")


//console.log(user)
    

useEffect(() => {
    const checkToken = async () => {
        //await SecureStore.deleteItemAsync('user');
        //await SecureStore.deleteItemAsync('authToken');

        try{
            const token = await SecureStore.getItemAsync('authToken');
            
            if(!!token)
            {
                const user = JSON.parse(await SecureStore.getItemAsync('user'));
                //A remplace par user.email...
                await loginUserWithEmailAndPassword("francky877832@gmail.com", "francky877832", "0000000")

                //setIsAuthenticated(true);
                return;
            }
        }
        catch(error)
        {
            console.log(error)
            setIsAuthenticated(false);
        }
    }
        checkToken();
}, []);
    
      useEffect(() => {
        if (isAuthenticated) {
          // Naviguer vers une autre page si l'utilisateur est authentifié
          navigation.replace('Preferences');
        }
      }, [isAuthenticated, navigation]);
    
    

/*if(!isAuthenticated)
{*/
    return(
<KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
        <View style={[userLoginStyles.container]}>
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

            <View style={[userLoginStyles.infoContainer]}>
                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Votre Email" onChangeText={(text)=>{checkEmail(text)}}
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

                <View style={[userLoginStyles.credentialContainers]}>
                    <Input placeholder="Nom De Votre Boutique" onChangeText={(shop)=>{checkUsername(shop)}}
                            multiline={false}
                            numberOfLines={1}
                            placeholderTextColor={appColors.lightWhite}
                            inputStyle = {[userLoginStyles.input,]}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1},isUsernameFocused && userLoginStyles.inputFocused,]}
                            leftIcon={ 
                                <Pressable onPress={() => {}}>
                                    <Icon name='basket-outline' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                </Pressable>
                            }
                            rightIcon={ 
                                isUsernameCorrect === 'true'  ?
                                <Pressable onPress={() => {}}>
                                    <Icon name='checkmark-circle-outline' type='ionicon' size={24} color={appColors.green} />
                                </Pressable>
                                :
                                isUsernameCorrect === 'false'  ?
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
                    <Input placeholder="Votre Mot De Passe" onChangeText={(pwd)=>{checkPassword(pwd)}}
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
            
            <CustomButton text="Valider" onPress={loginUserWithEmailAndPassword} color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable: userLoginStyles.pressable, text:userLoginStyles.text}} />
           
            </View>
              <Text>{/* <Button title="Sign Up" onPress={()=>{navigation.navigate("UserSignup")}} /> */}</Text>
        </View>
</KeyboardAwareScrollView>
    )
/*}else{
    navigation.navigate("Preferences", {user:user})
}*/
}


export default UserLogin


