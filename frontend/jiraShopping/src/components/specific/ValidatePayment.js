import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {CustomButton, PriceDetails, CustomActivityIndicator, CustomModalActivityIndicator} from '../common/CommonSimpleComponents'
import { RadioButton } from 'react-native-paper';

import { appColors, customText, appFont } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { productStyles } from '../../styles/productStyles';
import { validatePaymentStyles } from '../../styles/validatePaymentStyles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { verifyInfosStyles } from '../../styles/verifyInfosStyles';
import { UserContext } from '../../context/UserContext';
import { formatMoney, formatPhoneNumber, caculateProductTotalPrices } from '../../utils/commonAppFonctions'
import { getAuthToken, completeTransaction, campay_credentials } from '../../utils/paymentFunctions';


const ValidatePayment = () => {
    const route = useRoute()
    const navigation = useNavigation()
    //const { details } = route.params
    const details = {}
    const [authToken, setAuthToken] = useState(null)
    const [successInfos, setSuccessInfos] = useState(false)
    const [errors, setErrors] = useState(false)
    //const [code, setCode] = useState('');
    //const [transactionId, setTransactionId] = useState('');

    const [isCodeFocused, setIsCodeFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false) //true normally
    const [loadingMessage, setLoadingMessage] = useState("Envoie de la reponse de payment...")
    
    

    useEffect(()=>{
        const fetchAuthToken = async () => {
            setIsLoading(true)
            getAuthToken(campay_credentials.username, campay_credentials.password).then(async (credentials)=>{
                if (credentials.token) {
                    setAuthToken(credentials.token);
                    setIsLoading(false)
                    
                    const payment_details = {
  
                        "amount": `${details.amount}`,
                        "from": `237${details.phone.trim()}`,
                        "description": "Test",
                        "external_reference": details.external_reference
                    }
                    const response = await completeTransaction(credentials.token, payment_details)
                    
                    if(response.ussd_code)
                    {
                        //Or setSuccessInfos(response)
                        setSuccessInfos(true)
                        setErrors(false)
                    }
                    else
                    {   ////Or setErrors(response)
                        setErrors(true)
                        setSuccessInfos(false)
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
        //return <CustomModalActivityIndicator color={appColors.secondaryColor1} size='large' />
    }
    return (
        <View style={[validatePaymentStyles.container]}>
            {successInfos &&
                <View style={[validatePaymentStyles.successInfosContainer]}>
                    <Icon name='checkmark-circle' type='ionicon' size={100} color={appColors.green} />
                    <View style={[{alignItems:'center'}]}>
                        <Text style={[customText.text, validatePaymentStyles.successInfosText]}>Votre demande de paiement a été envoyée avec succes. Tapez #150# pour Orange ou *126# pour MTN.</Text>
                        <Pressable onPress={()=> { navigation.navigate('Preferences')}}>
                            <Text style={[customText.text, validatePaymentStyles.successInfosLink]}>Revenir a la page d'accueil</Text>
                        </Pressable>
                    </View>
                </View>
        
            }

            {errors &&
                <View style={[validatePaymentStyles.errorsContainer]}>
                    <Icon name='close-circle' type='ionicon' size={100} color={appColors.red} />
                    <View style={[{alignItems:'center'}]}>
                        <Text style={[customText.text, validatePaymentStyles.errorsText]}>Votre demande de paiement a échoué. Vérifiez votre numéro et reessayez. Si cela periste, contactez le service client.</Text>
                        <Pressable onPress={()=> { navigation.goBack()}}>
                            <Text style={[customText.text, validatePaymentStyles.errorsLink]}>Revenir a la page de confirmation</Text>
                        </Pressable>
                    </View>
                </View>
        
            }

            <CustomModalActivityIndicator onRequestClose={setIsLoading} isLoading={isLoading} size="large" color={appColors.secondaryColor1} message={loadingMessage} />

        </View>
    )
}

export default ValidatePayment



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