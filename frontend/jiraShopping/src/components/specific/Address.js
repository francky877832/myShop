import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {CustomButton} from '../common/CommonSimpleComponents'

import { appColors, customText, appFont } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { useNavigation, useRoute } from '@react-navigation/native';

import { storeCache, getCache } from '../../cache/cacheFunctions';
import { UserContext } from '../../context/UserContext';
import { setIsLoading } from '../../store/favourites/favouritesSlice';


const GEO_NAMES_USERNAME = 'francky877832';
const COUNTRY_CODE = 'CM';
const loggedUser = "Francky"

const CityPicker = (props) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    const {selectedCity, setSelectedCity} = props
    //console.log("cityNames")
    useEffect(() => {
      const fetchCities = async () => {
        try {
          const response = await fetch(`http://api.geonames.org/searchJSON?country=${COUNTRY_CODE}&featureClass=P&maxRows=1000&username=${GEO_NAMES_USERNAME}`);
          const data = await response.json();
          const cityNames = data.geonames.map(city => ({
            id: city.geonameId.toString(),
            name: city.name
          }));
          
            if(!response.ok)
            {
                throw new Error("Erreur lors de la recuperation des addresses", await response.text())
            }
          setCities(cityNames);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cities:', error);
          setLoading(false);
        }
      };
  
      fetchCities();
    }, []);
  
    /*if (loading) {
      return <ActivityIndicator size="large" color={appColors.black} />;
    }*/
    return(
        <View style={adressStyles.cityContainer}>
            <Text style={adressStyles.label}>Votre Ville</Text>
            { 
            loading 
                ?
                <ActivityIndicator size="large" color={appColors.black} />
            
                :
                <Picker
                    selectedValue={selectedCity}
                    onValueChange={(itemValue) => setSelectedCity(itemValue)}
                    style={adressStyles.picker}
                >
                    {cities.map((city) => (
                    <Picker.Item key={city.id} label={city.name} value={city.name} />
                    ))}
                </Picker>
            }
        </View>
    )
}

const   Address = (props) => {
    
    const navigation = useNavigation()
    const route = useRoute()
    //const { user, temporaryAddress, setTemporaryAddress } = useContext(UserContext)
    const [temporaryAddress, setTemporaryAddress] = useState({})
    const [allowBack, setAllowBack] = useState(false);
    const [addressTitle, setAdressTitle] = useState("")
    const [completeName, setCompleteName] = useState("")
    const [tel, setTel] = useState("")
    const [selectedCity, setSelectedCity] = useState("");
    const [quater, setQuater] = useState("");
    const [completeAddress, setCompleteAddress] = useState("")

    const [isAddressTitleFocused, setIsAddressTitleFocused] = useState(false)
    const [isCompleteNameFocused, setIsCompleteNameFocused] = useState(false)
    const [isTelFocused, setIsTelFocused] = useState(false)
    const [isQuaterFocused, setIsQuaterFocused] = useState(false);
    const [isCompleteAddressFocused, setIsCompleteAddressFocused] = useState(false)

    const [isPostLoading, setIsPostLoading] = useState(false)




// Ajouter l'écouteur pour l'événement de retour
const onBackPress = useCallback((e) => {
    if (allowBack || route.params.page=='VerifyDeliveryInfos') {
        return;
    }

    if (e) {
      e.preventDefault(); // Empêcher le comportement par défaut de la navigation
    }


        Alert.alert(
        "Attention!",
        "Abandoné les modifications ?",
        [
            { text: "Non", onPress: () => setIsPostLoading(false), style: "cancel" },
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
    const unsubscribe = navigation.addListener('beforeRemove', onBackPress);
    return unsubscribe;
}, [navigation])


   
     const handleTemporaryAddress = (temporaryAddress) =>
    {
        setTemporaryAddress(temporaryAddress)
        navigation.navigate('VerifyDeliveryInfos', {page:'VerifyDeliveryInfosAddress'})
    }

    const updateAddress = async ()=>{
        setIsPostLoading(true)

        const newAddress = {
            quater: quater,
            city: selectedCity,
            country: 'Cameroon',
            title: addressTitle
        }
        const userPhone = {phone:tel}

        const updateUserInfos = async (infos) => 
        {
                //MONGODB
            navigation.navigate('VerifyDeliveryInfos', {page:'VerifyDeliveryInfosAddress'})
        }

    if(route.params.page=='VerifyDeliveryInfos')
    {
        Alert.alert(
            "Modification De L'adresse",
            "Voulez Vous définitivement changer d'adresse ou uniquement pour cette livraison ?",
            [
              { text: "Non", onPress: () => handleTemporaryAddress(), style: "cancel" },
              { text: "Oui", onPress: async () => { await updateUserInfos()} }
            ]
          );
    }
    else
    {
        await updateUserInfos()
    }

    }

    return (
<View style={[adressStyles.container]}>
    <KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{flex:1}}>
            <View style={[adressStyles.containers]}>
            <View style={[{height:20}]}></View>
                        <Input placeholder="Nommer l'endroit ou vous vivez : Tonnerre" value={addressTitle} onChangeText={(name)=>{setAdressTitle(name);}}
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
            </View>
            <View style={[{height:20}]}></View>

            <View style={[adressStyles.containers]}>
                <View style={[adressStyles.titlesBox]}>
                    <Text style={[adressStyles.text, adressStyles.titles,{}]}>Informations De Contact</Text>
                </View>
                    <View style={[{}]}>
                        <Input placeholder="Nom Complet" value={completeName} onChangeText={(name)=>{setCompleteName(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                            onFocus={() => setIsCompleteNameFocused(true)}
                            onBlur={() => setIsCompleteNameFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isCompleteNameFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />

                        <Input placeholder="Téléphone" value={tel} onChangeText={(name)=>{setTel(name)}}
                            inputMode='tel'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                            onFocus={() => setIsTelFocused(true)}
                            onBlur={() => setIsTelFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isTelFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                    </View>
            </View>
            <View style={[{height:20}]}></View>

            <View style={[adressStyles.containers]}>
                <View style={[adressStyles.titlesBox]}>
                    <Text style={[adressStyles.text, adressStyles.titles,{}]}>Localisation</Text>
                </View>
                    
                    <View style={[{}]}>
                        <CityPicker selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

                        <Input placeholder="Quartier" value={quater} onChangeText={(name)=>{setQuater(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                            onFocus={() => setIsQuaterFocused(true)}
                            onBlur={() => setIsQuaterFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isQuaterFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />

                        <Input placeholder="Votre Adresse" value={completeAddress} onChangeText={(name)=>{setCompleteAddress(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                            onFocus={() => setIsCompleteAddressFocused(true)}
                            onBlur={() => setIsCompleteAddressFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isCompleteAddressFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                    </View>
            </View>
            <View style={[{height:20}]}></View>

            <View style={[addProductStyles.addProductSubmitView,{}]}>
                { !isPostLoading ?
                        <CustomButton text="Enregistrer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={updateAddress} />
                        :
                        <ActivityIndicator color={appColors.secondaryColor1} size="large" />
                }
            </View>
        </ScrollView>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
</View>
    )
}
export default Address

const adressStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        borderTopWidth : 1,
        borderColor : appColors.secondaryColor3,
    },
    containers :
    {
        backgroundColor : appColors.white,
        paddingLeft : 10,
    },
    text:
    {
        ...customText.text,
        fontSize : 15,
        fontWeight : "bold",
    },
    titlesBox :
    {
        //left : 20,
    },
    titles :
    {
        fontSize : 20,
    },



//FOR CityPicker
    cityContainer: 
    {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        //backgroundColor : "red",
      },
      label: {
        fontSize: 18,
        marginBottom: 10,
      },
      picker: {
        height: 50,
        width: '100%',
        borderWidth : 1,
        borderColor : appColors.blue,
        backgroundColor : appColors.gray,
      },
      errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
      },
})