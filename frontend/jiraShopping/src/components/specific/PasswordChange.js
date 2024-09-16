import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'

import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import { UserContext } from '../../context/UserContext';
import bcrypt from 'bcryptjs';
import { storeCache } from '../../cache/cacheFunctions';

//import firestore from '@react-native-firebase/firestore';

const loggedUser = "Francky"

const   PasswordChange = (props) => {
    const navigation = useNavigation()
    const {user, setUser, updateUser} = useContext(UserContext)
    const [allowBack, setAllowBack] = useState(false);

    const [oldPassword, setOldPassword] = useState("")
    const [newPassword1, setNewPassword1] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [hasUploaded, setHasUploaded] = useState(false)



    const [isOldPasswordFocused, setIsOldPasswordFocused] = useState("")
    const [isNewPasswordFocused1, setIsNewPasswordFocused1] = useState("")
    const [isNewPasswordFocused2, setIsNewPasswordFocused2] = useState("")

    const [isOldPasswordShowed, setIsOldPasswordShowed] = useState(false)
    const [isNewPasswordShowed1, setIsNewPasswordShowed1] = useState(false)
    const [isNewPasswordShowed2, setIsNewPasswordShowed2] = useState(false)

    const [isPostLoading, setIsPostLoading] = useState(false)

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
        if(!hasUploaded)
        {
            const unsubscribe = navigation.addListener('beforeRemove', onBackPress);
            return unsubscribe;
        }
    }, [navigation, allowBack, hasUploaded])


    const signInWithEmailAndPassword = useCallback(async (email, password) => {
        return await auth().signInWithEmailAndPassword(email, password);
      }, []);
      
      const updatePassword = async (oldPassword, newPassword1, newPassword2) => {
        try {
          setIsPostLoading(true);
          const email = user.email;
          const formData = new FormData();
      
          if (newPassword1 !== newPassword2) {
            throw new Error('Vos 2 mots de passe ne correspondent pas.');
          }
      
          const userCredential = await signInWithEmailAndPassword(email, oldPassword);
          if (!userCredential.user) {
            throw new Error('Aucun utilisateur connecté.');
          }
      
          await userCredential.user.updatePassword(newPassword1);

      
          formData.append('password', newPassword1);
          const newUser = await updateUser(user._id, formData);
          //console.log(newUser)
          storeCache('user', {email:newUser.email, username:newUser.username, password:newUser.password})
      
          Alert.alert('Success', 'Mot de passe mis à jour avec succès.');
          setHasUploaded(true);
        } catch (error) {
          if (error.code === 'auth/wrong-password') {
            Alert.alert('Erreur', 'Votre ancien mot de passe est incorrect.');
          } else if (error.code === 'auth/weak-password') {
            Alert.alert('Erreur', 'Le nouveau mot de passe est trop faible.');
          } else if (error.message) {
            Alert.alert('Erreur', error.message);
          } else {
            Alert.alert('Erreur', 'Une erreur s\'est produite.');
          }
        } finally {
          setIsPostLoading(false);
        }
      };
      
    return(
        <View style={[passwordChangeStyles.container]}>
            <View style={[passwordChangeStyles.inputBox]}>
                    <Text style={[passwordChangeStyles.text,]}>Ancien Mot De Passe</Text>
                        <Input placeholder="********" value={oldPassword} onChangeText={(name)=>{setOldPassword(name)}}
                            secureTextEntry={!isOldPasswordShowed}
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsOldPasswordFocused(true)}
                            onBlur={() => setIsOldPasswordFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isOldPasswordFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                            rightIcon = {
                                isOldPasswordShowed ?
                                    <Pressable onPress={()=>{setIsOldPasswordShowed(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsOldPasswordShowed(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                        />
                </View>

                <View style={[passwordChangeStyles.inputBox]}>
                    <Text style={[passwordChangeStyles.text,]}>Nouveau Mot De Passe</Text>
                        <Input placeholder="********" value={newPassword1} onChangeText={(name)=>{setNewPassword1(name)}}
                            secureTextEntry={!isNewPasswordShowed1}
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsNewPasswordFocused1(true)}
                            onBlur={() => setIsNewPasswordFocused1(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isNewPasswordFocused1 && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                            rightIcon = {
                                isNewPasswordShowed1 ?
                                    <Pressable onPress={()=>{setIsNewPasswordShowed1(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsNewPasswordShowed1(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                        />
                </View>

                <View style={[passwordChangeStyles.inputBox]}>
                    <Text style={[passwordChangeStyles.text,]}>Nouveau Mot De Passe</Text>
                        <Input placeholder="********" value={newPassword2} onChangeText={(name)=>{setNewPassword2(name)}}
                            secureTextEntry={!isNewPasswordShowed2}
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsNewPasswordFocused2(true)}
                            onBlur={() => setIsNewPasswordFocused2(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isNewPasswordFocused2 && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                            rightIcon = {
                                isNewPasswordShowed2 ?
                                    <Pressable onPress={()=>{setIsNewPasswordShowed2(false)}}>
                                        <Icon type="ionicon" name="eye-off-outline" size={24} color={appColors.gray} />
                                    </Pressable>
                                :
                                <Pressable onPress={()=>{setIsNewPasswordShowed2(true)}}>
                                        <Icon type="ionicon" name="eye-outline" size={24} color={appColors.secondaryColor1} />
                                    </Pressable>
                            }
                        />
                </View>

            <View style={[addProductStyles.addProductSubmitView,{}]}>
                { !isPostLoading ?
                        <CustomButton text="Changer De Mot De Passe" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={()=>{updatePassword(oldPassword, newPassword1, newPassword2)}} />
                        :
                        <ActivityIndicator color={appColors.secondaryColor1} size="large" />
                }
            </View>

            <CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Profil en cours de mise a jour..." />

        </View>
    )
}
export default PasswordChange

const passwordChangeStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        backgroundColor : appColors.white,
        borderTopWidth : 1,
        borderColor : appColors.secondaryColor3,
        paddingTop : 20,
    },
    inputBox :
    {
        paddingLeft : 20,
    },
    text:
    {
        ...customText.text,
        fontSize : 15,
        fontWeight : "bold",
    },
})