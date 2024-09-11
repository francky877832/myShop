import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {CustomButton, PriceDetails, CustomActivityIndicator} from '../common/CommonSimpleComponents'
import { RadioButton } from 'react-native-paper';

import { appColors, customText, appFont } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { productStyles } from '../../styles/productStyles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { verifyInfosStyles } from '../../styles/verifyInfosStyles';
import { UserContext } from '../../context/UserContext';
import { formatMoney, formatPhoneNumber, caculateProductTotalPrices } from '../../utils/commonAppFonctions'
import { getAuthToken, completeTransaction, campay_credentials } from '../../utils/paymentFunctions';

const ValidatePayment = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const { details } = route.params

    const [authToken, setAuthToken] = useState(null)
    const [succesInfos, setSuccessInfos] = useState(null)
    const [errors, setErrors] = useState(null)
    //const [code, setCode] = useState('');
    //const [transactionId, setTransactionId] = useState('');

    const [isCodeFocused, setIsCodeFocused] = useState(false)
    
    

    useEffect(()=>{
        const fetchAuthToken = async () => {
            getAuthToken(campay_credentials.username, campay_credentials.password).then(async (credentials)=>{
                if (credentials.token) {
                    setAuthToken(credentials.token);
                    
                    const payment_details = {
  
                        "amount": `${details.amount}`,
                        "from": `237${details.phone.trim()}`,
                        "description": "Test",
                        "external_reference": details.external_reference
                    }
                    const response = await completeTransaction(credentials.token, payment_details)
                    
                    if(response.ussd_code)
                    {
                        setSuccessInfos(response)
                    }
                    else
                    {
                        setErrors(response)
                    }
                }
            }).catch((error)=>{
                console.log(error)
                setErrors(error)
            })
        };
      
          fetchAuthToken();
    }, [])

    if(!authToken)
    {
        return <CustomActivityIndicator color={appColors.secondaryColor1} size='large' />
    }
    return (
        <View style={[validatePaymentStyles.container]}>
            <Text></Text>
        </View>
    )
}

export default ValidatePayment

const validatePaymentStyles = StyleSheet.create({
    container :
    {

    },
})



/*
 <View style={[validatePaymentStyles.contents]}>
                    <Input placeholder="" value={code} onChangeText={(code)=>{setCode(code)}}
                        inputMode='numeric'
                        multiline={false}
                        maxLength={100}
                        placeholderTextColor={appColors.secondaryColor3}
                        inputStyle = {[searchBarStyles.inputText, {color:appColors.clearBlack,}]}
                        onFocus={() => setIsCodeFocused(true)}
                        onBlur={() => setIsCodeFocused(false)}
                        underlineColorAndroid='transparent'
                        containerStyle={[validatePaymentStyles.inputBox]}
                        inputContainerStyle = {[isCodeFocused && searchBarStyles.inputContainerFocused, validatePaymentStyles.inputContainer, ]}
                    />
                </View>
*/