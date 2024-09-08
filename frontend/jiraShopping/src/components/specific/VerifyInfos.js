import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
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
import { formatMoney } from '../../utils/commonAppFonctions'

const VerifyInfos = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const {user} = useContext(UserContext)

    const [showPriceDetails, setShowPriceDetails] = useState(false)
    const [hasAcceptedContrat, setHasAcceptedContrat] = useState(false)
    const [addressTitle, setAdressTitle] = useState("ok")


    const [isAddressTitleFocused, setIsAddressTitleFocused] = useState(false)


    return (
        <View style={[]}>
            <View> 
                <View style={[{height:20}]}></View>

                <View>
                    <Text>Addresse De Livraison</Text>
                </View>

                <View>
                    <Input placeholder="Nommer l'endroit ou vous vivez : Tonnerre" value={addressTitle} onChangeText={(name)=>{setAdressTitle(name)}}
                        inputMode='text'
                        multiline={false}
                        maxLength={100}
                        placeholderTextColor={appColors.secondaryColor3}
                        inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                        onFocus={() => setIsAddressTitleFocused(true)}
                        onBlur={() => setIsAddressTitleFocused(false)}
                        underlineColorAndroid='transparent'
                        containerStyle={ []}
                        inputContainerStyle = {[searchBarStyles.inputContainer, isAddressTitleFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                    />
                {
                !addressTitle &&
                    <View>
                        <Text>Aucune addresse trouvée. Cliquez pour modifier vos informations.</Text>
                    </View>
                }
                </View>
            </View>


            <View> 
                <View style={[{height:20}]}></View>

                <View>
                    <Text>Numéro De Payement (Orange Money Ou MTN Money)</Text>
                </View>

                <View>
                    <Input placeholder="+237677127907" value={addressTitle} onChangeText={(name)=>{setAdressTitle(name)}}
                        inputMode='numeric'
                        multiline={false}
                        maxLength={100}
                        placeholderTextColor={appColors.secondaryColor3}
                        inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                        onFocus={() => setIsAddressTitleFocused(true)}
                        onBlur={() => setIsAddressTitleFocused(false)}
                        underlineColorAndroid='transparent'
                        containerStyle={ []}
                        inputContainerStyle = {[searchBarStyles.inputContainer, isAddressTitleFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                    />
                {
                !addressTitle &&
                    <View>
                        <Text>Aucune addresse trouvée. Cliquez pour modifier vos informations.</Text>
                    </View>
                }
                </View>
            </View>
           
           <View>
                <RadioButton.Group onValueChange={value => setHasAcceptedContrat(prev=>!prev)} value={hasAcceptedContrat}>
                    <View style={[verifyInfosStyles]}>
                        <RadioButton value={true} />
                            <View>
                                <Text>Accepter les conditions du</Text>
                                <Pressable>
                                    <Text>Contrat De Vente</Text>
                                </Pressable>
                            </View>
                    </View>
                </RadioButton.Group>
            </View>

            <View> 
                <Pressable style={[verifyInfosStyles.button, verifyInfosStyles.price]} onPress={()=>{setShowPriceDetails(!showPriceDetails)}}>
                        {
                        showPriceDetails 
                            ?
                                <Icon type='octicon' name="triangle-down" size={24} color={appColors.secondaryColor1} />
                            :
                                <Icon type='octicon' name="triangle-up" size={24} color={appColors.secondaryColor1} />
                        }      
                                 
                   <Text numberOfLines={2} style={[customText.text, productStyles.price, verifyInfosStyles.buttonText,]}>{formatMoney(15000)} XAF</Text>
                </Pressable>

                <View style={[verifyInfosStyles.acheter]}>
                    <CustomButton text="Acheter" disable={false} styles={{ pressable: verifyInfosStyles.button, text: verifyInfosStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={() => { }} />
                </View>
            </View>
            
        </View>
    )
}

export default VerifyInfos