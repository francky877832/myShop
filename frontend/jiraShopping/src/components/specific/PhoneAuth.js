import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native';

import auth from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';

export default function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState("+905347480703");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm.confirm(code);
      const user = userCredential.user;
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
      console.log("Invalid code");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="Send Code" onPress={signInWithPhoneNumber} />
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter verification code"
        keyboardType="number-pad"
      />
      <Button title="Verify Code" onPress={confirmCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
