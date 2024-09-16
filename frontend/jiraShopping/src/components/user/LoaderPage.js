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

const LoaderPage = (props) => {

    const route = useRoute()
    const navigation = useNavigation()
    const {checkEmail, checkPassword, checkUsername, user, setUser, isAuthenticated, setIsAuthenticated, loginUserWithEmailAndPassword} = useContext(UserContext)

    useEffect(() => {
        const checkToken = async () => {
            //await SecureStore.deleteItemAsync('user');
            //await SecureStore.deleteItemAsync('authToken');
    //console.log("oj")
            try{
                const token = await SecureStore.getItemAsync('authToken');
                
                if(!!token)
                {
                    const user = JSON.parse(await SecureStore.getItemAsync('user'));
                    //console.log(user)
                    //A remplace par user.email...
                    ///await loginUserWithEmailAndPassword("francky877832@gmail.com", "francky877832", "0000000")
                    loginUserWithEmailAndPassword(user.email, user.username, user.password).then(()=>{
                        //Chargement des données de l'Appli
                        navigation.replace('Preferences');
                        return;
                    }).cacth((error) => {
                        navigation.replace('UserLogin');
                        return;
                    })
                    
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
/*
        if (isAuthenticated) {
            // Naviguer vers une autre page si l'utilisateur est authentifié
              navigation.replace('Preferences');
        }
        else
        {
            navigation.replace('UserLogin');
        }
*/
    }, []);

    useEffect(() => {
       
      }, [isAuthenticated, navigation]);
    
      return (
            <View>
                <Text>Loader</Text>
            </View>
      )
}


export default LoaderPage