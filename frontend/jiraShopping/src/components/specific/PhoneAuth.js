import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, TextInput, Pressable } from 'react-native';
import { Input } from 'react-native-elements';

import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';

import { appColors, customText, appFont, screenHeight } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles'

export default function PhoneAuth(props) {
  const [phoneNumber, setPhoneNumber] = useState("+905347480703");
  const [code, setCode] = useState("");
  const [isCodeFocused, setIsCodeFocused] = useState(true)
  const [confirm, setConfirm] = useState(null);
  const [showCodeInput, setShowCodeInput] = useState(false)

  const {tel, setTel, setIsTelFocused, isTelFocused, accountSettingsStyles, user, setUser
   } = props  

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setShowCodeInput(true)
    } catch (error) {
      Alert.alert("Erreur","Une erreur inconnue est survenue. Rééssayez plus tard.")
      console.log("Error: ", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      //const user = userCredential.user;
      setUser({...user, isPhoneVerified:1})
      setShowCodeInput(false)
      Alert.alert('Valid code')
      /*const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();
      if (userDocument.exists) {
        Alert.alert("You have an account");
      } else {
        Alert.alert("New user");
      }*/
    } catch (error) {
      Alert.alert("Erreur","Une erreur inconnue est survenue. Rééssayez plus tard.")

      console.log("Invalid code");
    }
  };

  return (
    <View style={phoneAuthStyle.container}>

      <View style={[accountSettingsStyles.inputBox]}>
        <View style={[accountSettingsStyles.VerifierBox]}>
                        <Text style={[accountSettingsStyles.text,]}>Numero De Téléphone</Text>
                        {!user.isPhoneVerified &&
                            <Pressable onPress={signInWithPhoneNumber} style={[accountSettingsStyles.verifier,{}]}>
                                <Text style={[accountSettingsStyles.text,{color:appColors.white,fontWeight:"bold",}]}>Verifier</Text>
                            </Pressable>
                        }
                    </View>

                    <Input placeholder="EX : +237677120000" value={tel} onChangeText={(name)=>{setTel(name)}}
                            keyboardType="phone-pad"
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsTelFocused(true)}
                            onBlur={() => setIsTelFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isTelFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
        </View>
      {showCodeInput &&
        <View>
                  <Input placeholder="Code recu par mesage" value={code} onChangeText={(name)=>{setCode(name)}}
                            keyboardType="phone-pad"
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsCodeFocused(true)}
                            onBlur={() => setIsCodeFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isCodeFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
          <Pressable style={[phoneAuthStyle.confirmCode]} onPress={confirmCode}>
                <Text style={[{color:appColors.white}]}>Verify Code</Text>        
          </Pressable>
            
          <View style={{height:20}}></View>
        </View>
        }
    
   </View>
  );
}

const phoneAuthStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmCode :
  {
      backgroundColor:appColors.secondaryColor1,
      justifyContent:"center",
      alignItems:"center",
      padding:10,
      borderRadius:20,
  }

});
