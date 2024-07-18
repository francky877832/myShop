import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont, screenHeight } from '../../styles/commonStyles';
import BadgeIcon from '../common/BadgeIcon';
import {CustomButton} from '../common/CommonSimpleComponents'
import { formatMoney } from '../../utils/commonAppFonctions';
import { offersDatas } from '../../utils/offersDatas';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import badgeIconStyles from '../../styles/badgeIconStyles';
//<Image source={{uri: item.images[0]}}  style={[]} />
const loggedUser = "Francky"
const   AccountSettings = (props) => {

    const [valueName, setValueName] = useState("")
    const [isNameFocused, setIsNameFocused] = useState(false)

    const [username, setUsername] = useState("")
    const [tel, setTel] = useState("")
    const [email, setEmail] = useState("")
    const [slogan, setSlogan] = useState("")

    const [isUsernameFocused, setIsUsernameFocused] = useState(false)
    const [isTelFocused, setIsTelFocused] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isSloganFocused, setIsSloganFocused] = useState(false)


    const submitProduct = ()=>{

    }
    return(
<View style={[accountSettingsStyles.container]}>
    <KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex:1}}>
            <View style={[accountSettingsStyles.topBox]}></View>

            <View style={[accountSettingsStyles.pp]}>
                <Pressable>
                    <Image source={require('../../assets/images/product5.png')}  style={[accountSettingsStyles.imgeProfil]} />
                </Pressable>
                <Pressable style={[{left:20,marginTop:50,}]}>
                    <Text style={[accountSettingsStyles.text,{textAlignVertical:"bottom",textDecorationLine:"underline",color:appColors.secondaryColor1,}]}>Mettre a jour</Text>
                </Pressable>
            </View>

            <View style={[accountSettingsStyles.infosBox]}>
                <View style={[accountSettingsStyles.inputBox]}>
                    <Text style={[accountSettingsStyles.text,]}>Nom D'utilisateur</Text>
                        <Input placeholder="EX : Samsung Galaxy Z-Fold" value={username} onChangeText={(name)=>{setUsername(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                            onFocus={() => setIsUsernameFocused(true)}
                            onBlur={() => setIsUsernameFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isUsernameFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                </View>

                <View style={[accountSettingsStyles.inputBox]}>
                    <View style={[accountSettingsStyles.VerifierBox]}>
                        <Text style={[accountSettingsStyles.text,]}>Numero De Téléphone</Text>
                        <Pressable style={[accountSettingsStyles.verifier,{}]}>
                            <Text style={[accountSettingsStyles.text,{color:appColors.white,fontWeight:"bold",}]}>Verifier</Text>
                        </Pressable>
                    </View>
                    
                        <Input placeholder="EX : Samsung Galaxy Z-Fold" value={tel} onChangeText={(name)=>{setTel(name)}}
                            inputMode='text'
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

                <View style={[accountSettingsStyles.inputBox]}>
                        <View style={[accountSettingsStyles.VerifierBox]}>
                            <Text style={[accountSettingsStyles.text,]}>Email</Text>
                            <Pressable style={[accountSettingsStyles.verifier, {}]}>
                                <Text style={[accountSettingsStyles.text,{color:appColors.white,fontWeight:"bold",}]}>Verifier</Text>
                            </Pressable>
                        </View>

                        <Input placeholder="EX : Samsung Galaxy Z-Fold" value={email} onChangeText={(name)=>{setEmail(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsEmailFocused(true)}
                            onBlur={() => setIsEmailFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isEmailFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                </View>

                <View style={[accountSettingsStyles.inputBox]}>
                    <Text style={[accountSettingsStyles.text,]}>Slogan De Votre Boutique</Text>
                        <Input placeholder="EX : Samsung Galaxy Z-Fold" value={slogan} onChangeText={(name)=>{setSlogan(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,} ]}
                            onFocus={() => setIsSloganFocused(true)}
                            onBlur={() => setIsSloganFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={[]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, ,isSloganFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                </View>
            </View>


            <View style={[addProductStyles.addProductSubmitView,{}]}>
                <CustomButton text="Enregistrer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={submitProduct} />
            </View>
        </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>          
</View>
    )
}
export default AccountSettings

const accountSettingsStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        backgroundColor : appColors.white,
        borderTopWidth : 1,
        borderColor : appColors.secondaryColor3,
    },
    topBox :
    {
        backgroundColor : appColors.lightOrange,
        height : screenHeight/4,
    },
    pp :
    {
        flexDirection : "row",
        left : 20,
        top : -50,
        //backgroundColor : appColors.white,
    },
    imgeProfil:
    {
        width : 100,
        height : 100,
        borderRadius : 50,
    },

    infosBox :
    {
        paddingLeft : 25,
        backgroundColor : appColors.white,
        top : -20,
    },
    inputBox :
    {

    },
    text:
    {
        ...customText.text,
        fontSize : 15,
        fontWeight : "bold",
    },
    VerifierBox :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingRight : 10,
    },
    verifier :
    {
        backgroundColor : appColors.secondaryColor1,
        padding : 5,
        paddingHorizontal : 10,
        borderRadius : 15,
    },
   
})