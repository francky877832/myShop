import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { useNavigation } from '@react-navigation/native';


import auth from '@react-native-firebase/auth';
import { UserContext } from '../../context/UserContext';
import bcrypt from 'bcryptjs';

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


    const signInWithEmailAndPassword = useCallback(async (email, password)=>{
        return await auth().signInWithEmailAndPassword(email, password);
    },[])

    const updatePassword = async (oldPassword, newPassword1, newPassword2) => {
        try {
            setIsPostLoading(true)
            const email = user.email
           
            let updatedDatas = {}
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if(isMatch)
            {
                if(newPassword1 === newPassword2)
                {
                    updatedDatas = {
                        password : newPassword1
                    }

                    const userCredential = await signInWithEmailAndPassword(email, oldPassword)
                    if (userCredential.user) 
                    {
                        await userCredential.user.updatePassword(newPassword1);
                        //MONGODB
                        await updateUser(user._id, updatedDatas)
                        Alert.alert('Mot de passe mis à jour avec succès.');
                        setHasUploaded(true)
                    } else {
                        Alert.alert('Aucun utilisateur connecté.');
                    }
                }
                else
                {
                    
                }
            }
            else
            {
    
            }

            //Il me rste gerer les erreurs
           
            setIsPostLoading(false)
        } catch (error) 
        {
            Alert.alert(error.message);
            setIsPostLoading(false)
        }

    }
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