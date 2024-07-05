import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RadioButton, } from 'react-native-paper';

import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


import { appColors, customText } from '../../styles/commonStyles';
import { CustomButton } from "../common/CommonSimpleComponents"

import { addProductStyles } from '../../styles/addProductStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { Icon } from 'react-native-elements';
import Categories from '../common/Categories';
import { formatMoney } from '../../utils/commonAppFonctions';
import { categoriesStyles } from '../../styles/categoriesStyles';

import { ProductItemContext } from '../../context/ProductItemContext';

const AddProduct = (props) => {
    
    const navigation = useNavigation();
    const [allowBack, setAllowBack] = useState(false);
    const {selectedCategories, updateSelectedCategory, setSelectedBrand, selectedBrand,selectedColor, setSelectedColor} = useContext(ProductItemContext)

    const [valueName, setValueName] = useState("")
    const [valueDesc, setValueDesc] = useState("")
    const [valuePrice, setValuePrice] = useState("")
    const [valueGaranti, setValueGaranti] = useState("")
    const [valueStock, setValueStock] = useState("")
    const [valueEtat, setValueEtat] = useState("")
    const [valueFeesBy, setValueFeesBy] = useState("")

//IsFocused pour ls inputText
    const [isNameFocused, setIsNameFocused] = useState(false)
    const [isDescFocused, setIsDescFocused] = useState(false)
    const [isPriceFocused, setIsPriceFocused] = useState(false)
    const [isGarantiFocused, setIsGarantiFocused] = useState(false)
    const [isStockFocused, setIsStockFocused] = useState(false)
    //const [valueBrand, setValueBrand] = useState("")
    //const [valueCategory, setValueCategory] = useState("")

    const [images, setImages] = useState([]);
    const [cameraOrGalery, setCameraOrGalery] = useState(false)
    const MAX_IMAGES = 6, MIN_IMAGES = 3


//Traitement des donnees et envoie au serveur

    //GoBackPermission
    const onBackPress = useCallback((e) => {
        if (allowBack) {
            return;
        }

        if (e) {
          e.preventDefault(); // Empêcher le comportement par défaut de la navigation
        }
    
        Alert.alert(
          "Attention!",
          "Abandoné l'ajout de produit ?",
          [
            { text: "Non", onPress: () => null, style: "cancel" },
            { text: "Oui", onPress: () =>{
                    setAllowBack(true);
                    navigation.goBack();
                    navigation.dispatch(e.data.action);
                }
             }
          ]
        );
      }, [allowBack, navigation]);


useEffect(()=>{
    //Appel de useCallBack
       // Ajouter l'écouteur pour l'événement de retour
    const unsubscribe = navigation.addListener('beforeRemove', onBackPress);
    return unsubscribe;
}, [navigation, onBackPress])


//Demande de permission
const requestPermissions = async () => {
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus !== 'granted') {
    Alert.alert('Permission to access gallery is required!');
    return false;
    }
    
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
    Alert.alert('Permission to access camera is required!');
    return false;
    }
    
    return true;
};

const pickImages = async () => {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return;

        const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        base64: false,
        orderedSelection : true,
        selectionLimit : MAX_IMAGES,
        quality: 1,
        });

        if (!result.canceled) {
            if (images.length >= MAX_IMAGES) { //result.assets.length < MIN_IMAGES || --- A appliquer lors de la validation
                Alert.alert(`Vous pouvez selectionner entre ${MIN_IMAGES}  et ${MAX_IMAGES} images.`);
                return;
            }
        const newImages = result.assets.slice(0, MAX_IMAGES - images.length);
            setImages((prevImages) => [...prevImages, ...newImages]);
            setCameraOrGalery(false)
        }
};
//
const takePhoto = async () => {
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) return;

        const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: false,
        quality: 1,
        });

        if (images.length >= MAX_IMAGES) { //result.assets.length < MIN_IMAGES || --- A appliquer lors de la validation
            Alert.alert(`Vous pouvez selectionner entre ${MIN_IMAGES}  et ${MAX_IMAGES} images.`);
            return;
        } 
        if (!result.canceled) {
            //setImages((prevImages) => [...prevImages, result]);
            //console.log(result);
            setImages((prevImages) => [...prevImages, { uri: result.assets[0].uri }]);

            setCameraOrGalery(false)
        }
};

const deleteSelectedImage = (uri) => {
    for(let i in images)
    {
        if(images[i].uri == uri)
        {
                //console.log(images.length)
                const filteredImages = images.filter((image, index) => index != i);
                //console.log(filteredImages.length)
                setImages(filteredImages);
            break;
        }
    }
}


const submitProduct = () => {
    
}

   return (
<KeyboardAvoidingView style={{flex:1}}  keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={[addProductStyles.container,{}]}>
            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Photos</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={[{flexDirection:"row",}]}>
                        <View style={[addProductStyles.imageBox,]}>
                            <Pressable onPress={()=>{setCameraOrGalery(!cameraOrGalery)}}>
                                <Icon name="camera-outline" type="ionicon" size={50} color={appColors.secondaryColor1} />
                                <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos {images.length}/{MAX_IMAGES}</Text>
                            </Pressable>
                        </View>
                            <View style={{width:5,}}></View>
                        <FlatList
                            data={images.length > 0 ? images.length < MAX_IMAGES ? [...images, ...new Array(MAX_IMAGES-images.length)] : images : [1,2,3,4,5,6]}
                            nestedScrollEnabled={true}
                            renderItem={ ({item}) => { return(
                               
                                    <View style={[addProductStyles.imageBox,]}>
                                        { images.length > 0  && item!=undefined &&
                                            <View style={{flex:1,borderWidth:1}}>
                                                <Image source={{ uri: item.uri }} style={{width:100,height:100,}} />
                                                <Pressable onPress={()=>{deleteSelectedImage(item.uri);}} style={{width:20,height:20,backgroundColor:appColors.lightBlack,position:"absolute",alignSelf:"flex-end",top:0,}}>
                                                    <Icon name="close" type="ionicon" size={18} color={appColors.secondaryColor1} />
                                                </Pressable>
                                            </View>
                                        }
                                    </View>
                                )
                             }
                            }
                            keyExtractor={ (item) => { return Math.random().toString(); } }
                            horizontal={true}
                            ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[]}
                        />
                    </View>
                </View>
            </View>

            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Nom Du Produit</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                        <Input placeholder="EX : Samsung Galaxy Z-Fold" value={valueName} onChangeText={(name)=>{setValueName(name)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsNameFocused(true)}
                            onBlur={() => setIsNameFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isNameFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                    </View>
            </View>

            
            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Description Du Produit</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                        <Input placeholder="EX : Téléphone neuf, je l!ai juste utilisé 2 fois. 128 Go et 8 Go de Ram..." value={valueDesc} onChangeText={(desc)=>{setValueDesc(desc)}}
                            inputMode='text'
                            multiline={true}
                            maxLength={500}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsDescFocused(true)}
                            onBlur={() => setIsDescFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isDescFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                    </View>
            </View>

            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Etat Du Produit</Text>
                </View>
                
                <View style={[addProductStyles.contents,]}>
                    <View style={{width:10,}}></View>
                        <RadioButton.Group onValueChange={val => {setValueEtat(val)}} value={valueEtat} style={[addProductStyles.radioGroup,{backgroundColor:"red",}]}>
                            <View style={[addProductStyles.radioBox,]}>
                                <View style={addProductStyles.radioContainer}>
                                    <RadioButton value="new" />
                                    <Text>Neuf</Text>
                                </View>
                                
                                <View style={addProductStyles.radioContainer}>
                                    <RadioButton value="used" />
                                    <Text>Utilisé</Text>
                                </View>
                                
                                <View style={addProductStyles.radioContainer}>
                                    <RadioButton value="new used" />
                                    <Text>Peu Utilisé</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                </View>
            </View>


            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Details</Text>
                </View>

                <View style={[addProductStyles.contents,addProductStyles.categoryContainer]}>
                        
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"category"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Categorie</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                        </Pressable>

                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"brand"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Marque</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />

                        </Pressable>
                        
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"color"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Couleur</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                        </Pressable>
                </View>

            </View>

            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Frais De Transport Payés Par...</Text>
                </View>
                
                <View style={[addProductStyles.contents,]}>
                    <View style={{width:10,}}></View>
                        <RadioButton.Group onValueChange={val => {setValueFeesBy(val)}} value={valueFeesBy} style={[addProductStyles.radioGroup,{backgroundColor:"red",}]}>
                            <View style={[addProductStyles.radioBox,]}>
                                <View style={addProductStyles.radioContainer}>
                                    <RadioButton value="seller" />
                                    <Text>Moi</Text>
                                </View>
                                
                                <View style={addProductStyles.radioContainer}>
                                    <RadioButton value="buyer" />
                                    <Text>L'acheteur</Text>
                                </View>
                                
                            </View>
                        </RadioButton.Group>
                </View>
            </View>

            


            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Garanti Et Stock</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                        <Input placeholder="Garanti en Mois" value={valueGaranti} onChangeText={(garanti)=>{setValueGaranti(garanti)}}
                            inputMode='numeric'
                            multiline={false}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsGarantiFocused(true)}
                            onBlur={() => setIsGarantiFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isGarantiFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />

                    <Input placeholder="Nombre de ce produit. Ex : 1" value={valueStock} onChangeText={(stock)=>{setValueStock(stock)}}
                            inputMode='numeric'
                            multiline={false}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsStockFocused(true)}
                            onBlur={() => setIsStockFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isStockFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                    </View>
            </View>



            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Prix En FCFA</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                        <Input placeholder="EX : 2500" value={valuePrice} onChangeText={(price)=>{setValuePrice(formatMoney(price))}}
                            inputMode='numeric'
                            multiline={false}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsPriceFocused(true)}
                            onBlur={() => setIsPriceFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer, isPriceFocused && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                        />
                    </View>
            </View>


            
            </ScrollView>
        </TouchableWithoutFeedback>
        
        {cameraOrGalery &&
            <View style={[addProductStyles.bottomPicker]}>
                <Pressable onPress={pickImages}>
                    <Icon name="images-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos</Text>
                </Pressable>
                <Pressable onPress={takePhoto}>
                    <Icon name="camera-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Camera</Text>
                </Pressable>
            </View>
        }
        <View style={[addProductStyles.addProductSubmitView,{}]}>
                <CustomButton text="Publier Le Produit" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={submitProduct} />
        </View>
    </KeyboardAvoidingView>
    )
}
export default AddProduct