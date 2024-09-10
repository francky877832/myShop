import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Alert, Linking } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {CustomButton, PriceDetails} from '../common/CommonSimpleComponents'
import { RadioButton } from 'react-native-paper';

import { appColors, customText, appFont } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { productStyles } from '../../styles/productStyles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { verifyInfosStyles } from '../../styles/verifyInfosStyles';
import { UserContext } from '../../context/UserContext';
import { formatMoney, formatPhoneNumber, caculateProductTotalPrices } from '../../utils/commonAppFonctions'

const VerifyDeliveryInfos = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const { user, temporaryAddress, setTemporaryAddress } = useContext(UserContext)
    const {products} = route.params
    //const user = {address:{title:'Ndokoti'}, phone:'677127907'}
    //const [temporaryAddress, setTemporaryAddress] = useState({address:{title:'Ndokoti'},})

    const [addressTitle, setAdressTitle] = useState(temporaryAddress.address.title)
    const [phone, setPhone] = useState(user.phone)

    const [showPriceDetails, setShowPriceDetails] = useState(false)
    const [hasAcceptedContrat, setHasAcceptedContrat] = useState(false)


    const [isAddressTitleFocused, setIsAddressTitleFocused] = useState(false)
    const [isPhoneFocused, setIsPhoneFocused] = useState(false)


    const handleAddressCliked = () => 
    {
        navigation.navigate('VerifyDeliveryInfosAddress', {page:'VerifyDeliveryInfos', })
    }

    const handleValidatePressed = () => 
    {
        if(!hasAcceptedContrat)
        {
            Alert.alert("Attention!","Vous devez accepter les termes dictés par le contrat de vente pour votre sécurité et la sécurité de vos achats.");
            return;
        }
      
        const ordersDetails = {
            address : temporaryAddress,
            phone : phone,
        }
        navigation.navigate('ConfirmDeliveryInfos', {infos:ordersDetails})
        
    }

    const handleContratPressed = () => {
        const visitContratLink = () => {
            Linking.openURL('https://www.google.com');
        }
        Alert.alert(
            "Information",
            "L'applicaiton essaye de vous diriger vers un lien externe. Continuer ?",
            [
                { text: "Non", onPress: () => null, style: "cancel" },
                { text: "Oui", onPress: () =>{visitContratLink() }
                }
            ]
            );
    }

    return (
        <View style={[verifyInfosStyles.container]}>
            <View style={[{height:10}]}></View>
            <View style={[verifyInfosStyles.containers]}> 
                <View style={[verifyInfosStyles.titles]}>
                    <Text  style={[verifyInfosStyles.titlesText]}>Addresse De Livraison</Text>
                </View>

                <View style={[verifyInfosStyles.contents]}>
                    <Pressable onPress={() => { handleAddressCliked()}}>
                        <Input placeholder="Nommer l'endroit ou vous vivez : Tonnerre" value={addressTitle} onChangeText={(name)=>{setAdressTitle(name)}}
                            inputMode='text'
                            multiline={false}
                            readOnly={true}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.clearBlack,}]}
                            onFocus={() => setIsAddressTitleFocused(true)}
                            onBlur={() => setIsAddressTitleFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[verifyInfosStyles.inputBox]}
                            inputContainerStyle = {[isAddressTitleFocused && searchBarStyles.inputContainerFocused, verifyInfosStyles.inputContainer, ]}
                        />
                    </Pressable>
                    <View style={[verifyInfosStyles.secondaryBox]}>
                        <Text  style={[customText.text, verifyInfosStyles.secondaryText]}>Aucune addresse trouvée. Cliquez pour modifier vos informations.</Text>
                    </View>
                
                </View>
            </View>


            <View style={[verifyInfosStyles.containers]}> 
                <View style={[{height:20}]}></View>

                <View  style={[verifyInfosStyles.titles, {flexDirection:'row',alignItems:'center'}]}>
                    <Text  style={[verifyInfosStyles.titlesText]}>Numéro Orangey Ou MTN Money </Text> 
                    <Text style={[verifyInfosStyles.titlesText, {fontSize:11, fontWeight:'normal'}]}>(avec +237)</Text>
                </View>

                <View style={[verifyInfosStyles.contents]}>
                    <Input placeholder="+237677127907" value={phone} onChangeText={(tel)=>{setPhone(formatPhoneNumber(tel))}}
                        inputMode='numeric'
                        multiline={false}
                        maxLength={100}
                        placeholderTextColor={appColors.secondaryColor3}
                        inputStyle = {[searchBarStyles.inputText, {color:appColors.clearBlack,}]}
                        onFocus={() => setIsPhoneFocused(true)}
                        onBlur={() => setIsPhoneFocused(false)}
                        underlineColorAndroid='transparent'
                        containerStyle={[verifyInfosStyles.inputBox]}
                        inputContainerStyle = {[isPhoneFocused && searchBarStyles.inputContainerFocused, verifyInfosStyles.inputContainer, ]}
                    />

                    <View style={[verifyInfosStyles.secondaryBox]}>
                        <Text  style={[customText.text, verifyInfosStyles.secondaryText]}>Il s'agit du numéro sur lequel vous serez debités pour votre achat. Il peut etre different de votre numero de contact, qui est definit dans la partie adresse ci-haute.</Text>
                    </View>
                </View>
            </View>

            <View style={[{height:20}]}></View>

           <View style={[verifyInfosStyles.containers, verifyInfosStyles.radiocontainers]}>
                <RadioButton.Group onValueChange={value => setHasAcceptedContrat(prev=>!prev)} value={hasAcceptedContrat}>
                    <View style={[verifyInfosStyles.contents, verifyInfosStyles.radioContents]}>
                        <RadioButton value={true} />
                            <View style={[verifyInfosStyles.radioItem]}>
                                <Text style={[customText.text,]}>Accepter les conditions du </Text>
                                <Pressable style={[ verifyInfosStyles.pressableContrat]} onPress={()=>(handleContratPressed())}>
                                    <Text style={[customText.text, verifyInfosStyles.pressableContratText]}>Contrat De Vente</Text>
                                </Pressable>
                                <Text style={[customText.text,]}>. </Text>
                            </View>
                    </View>
                </RadioButton.Group>
            </View>

            <View style={[{height:20}]}></View>

            <View style={[verifyInfosStyles.bottom]}> 
                <Pressable style={[verifyInfosStyles.button, verifyInfosStyles.price]} onPress={()=>{setShowPriceDetails(!showPriceDetails)}}>
                        {
                        showPriceDetails 
                            ?
                                <Icon type='octicon' name="triangle-down" size={24} color={appColors.secondaryColor1} />
                            :
                                <Icon type='octicon' name="triangle-up" size={24} color={appColors.secondaryColor1} />
                        }      
                        <View style={[{width:10}]}></View>      
                   <Text numberOfLines={2} style={[customText.text, productStyles.price, verifyInfosStyles.buttonText,]}>{formatMoney(15000)} XAF</Text>
                </Pressable>

                <View style={[verifyInfosStyles.acheter]}>
                    <CustomButton text="Payer" disable={false} styles={{ pressable: verifyInfosStyles.button, text: verifyInfosStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={() => { handleValidatePressed()}} />
                </View>
            </View>
            
        </View>
    )
}

export default VerifyDeliveryInfos