import { API_BACKEND } from '@env';

import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RadioButton, } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';


import { appColors, customText } from '../../styles/commonStyles';
import { CustomButton, PriceDetails} from "../common/CommonSimpleComponents"
import { screenWidth, screenHeight } from '../../styles/commonStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { Icon } from 'react-native-elements';
import Categories from '../common/Categories';
import { formatMoney, capitalizeFirstLetter} from '../../utils/commonAppFonctions';
import { categoriesStyles } from '../../styles/categoriesStyles';

import { ProductItemContext } from '../../context/ProductItemContext';
import { FilterContext

 } from '../../context/FilterContext';
import { server } from '../../remote/server';


import { requestPermissions, pickImages, takePhoto, resizeImages } from '../../utils/utilsFunctions';


const loggedUser = "66731fcb569b492d3ef429ba"
const AddProduct = (props) => {
    const [showPriceDetails, setShowPriceDetails] = useState(true)

    const IMG_MAX_HEIGHT = screenHeight/2
    const IMG_MAX_WIDTH = screenWidth
    const navigation = useNavigation();
    const [allowBack, setAllowBack] = useState(false);
    const {selectedBrand,selectedColor, setSelectedColor} = useContext(ProductItemContext)
    const { selectedCategories } = useContext(FilterContext)


    const [valueName, setValueName] = useState("")
    const [valueDesc, setValueDesc] = useState("")
    const [valuePrice, setValuePrice] = useState("")
    const [valueGaranti, setValueGaranti] = useState("")
    const [valueStock, setValueStock] = useState("")
    const [valueEtat, setValueEtat] = useState("")
    const [valueFeesBy, setValueFeesBy] = useState("")
    const [kargoPrice, setKargoPrice] = useState("")

//IsFocused pour ls inputText
    const [isNameFocused, setIsNameFocused] = useState(false)
    const [isDescFocused, setIsDescFocused] = useState(false)
    const [isPriceFocused, setIsPriceFocused] = useState(false)
    const [isGarantiFocused, setIsGarantiFocused] = useState(false)
    const [isStockFocused, setIsStockFocused] = useState(false)
    const [isKargoPrice, setIsKargoPrice] = useState(false)
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
                    //navigation.goBack();
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

const pickUpImages = async () =>{
    const img = await pickImages(MAX_IMAGES, MIN_IMAGES, images)
//console.log(img)
    setImages((prevImages)=>{
            return [
                ...prevImages,
                ...img,
            ]
        }
    )
    setCameraOrGalery(false)  
}

       
//
const takeUpPhoto = async () => {
    const img = await takePhoto(MAX_IMAGES, MIN_IMAGES, images)
    setImages((prevImages) => [...prevImages, img]);
    setCameraOrGalery(false)
}



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

//console.log(images)
const submitProduct = async () => {
    try {
        //console.log(images)
        const images_ = await resizeImages(images,IMG_MAX_HEIGHT,IMG_MAX_WIDTH)
        console.log(images_)
        
        let formData = new FormData()
        const datas = {
            name : valueName,
            description : valueDesc,
            price : valuePrice.replace('.',''),
            newPrice : valuePrice.replace('.',''),
            minPrice : valuePrice.replace('.',''),
            maxPrice : valuePrice.replace('.',''),
            condition : valueEtat,
            seller : loggedUser,
            category : `${selectedCategories.name}/${selectedCategories.subCategories}`,
            brand : selectedBrand,
            color : selectedColor,
            feesBy : valueFeesBy,
            garanti : valueGaranti,
            stock : valueStock, 
        }
        //Gestion des images
        images.forEach((image, index) => {
            formData.append('images', {
            uri: image.uri,
            name: image.fileName,
            type: image.mimeType,
            extension:image.fileName.split('.')[1],
            width : image.width,
            height : image.height,
            });
        });

    
        Object.keys(datas).forEach(key => {
            formData.append(key, datas[key]);
        });


            const response = await fetch(`${API_BACKEND}/api/datas/products/add`,{
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            const responseJson = await response.json();
            console.log(responseJson);
      } catch (error) {
        console.error(error);
      }
};
//Jai pas encore testé

   return (

<View style={{flex:1}}>
<KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
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
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"category", goBackTo:"AddProduct"}})}}>
                                <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Categorie</Text>
                                <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                          
                                {
                                    selectedCategories.name &&
                                    <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>{selectedCategories.name} | {selectedCategories.subCategories}</Text>
                                }
                        </Pressable>
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"brand"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Marque</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                                {
                                    selectedBrand &&
                                    <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>{selectedBrand}</Text>
                                }
                        </Pressable>
                        
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"color"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Couleur</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                                {
                                    selectedColor &&
                                    <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>{capitalizeFirstLetter(selectedColor)}</Text>
                                }
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



                <View style={[addProductStyles.containers]}>
                    <View style={[addProductStyles.contents, {flexDirection:'column'}]}>
                            <Input placeholder="Estimation des frais de transport. EX : 2500" value={valuePrice} onChangeText={(price)=>{setKargoPrice(formatMoney(price))}}
                                inputMode='numeric'
                                multiline={false}
                                placeholderTextColor={appColors.secondaryColor3}
                                inputStyle = {[searchBarStyles.inputText, ]}
                                onFocus={() => setIsKargoPrice(true)}
                                onBlur={() => setIsKargoPrice(false)}
                                underlineColorAndroid='transparent'
                                containerStyle={ [searchBarStyles.containerBox,]}
                                inputContainerStyle = {[searchBarStyles.inputContainer, isKargoPrice && searchBarStyles.inputContainerFocused,  addProductStyles.inputContainer]}
                            />

                    <View style={{}}>
                    <Text style={[customText.text]}>Ce detail n'est onligatoire. Mais s'il est renseigné, nous aidera dans une estimation plus nette de vos gains </Text>
                </View>

    </View>
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
</KeyboardAwareScrollView>
        
        {cameraOrGalery &&
            <View style={[addProductStyles.bottomPicker]}>
                <Pressable onPress={pickUpImages}>
                    <Icon name="images-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos</Text>
                </Pressable>
                <Pressable onPress={takeUpPhoto}>
                    <Icon name="camera-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Camera</Text>
                </Pressable>
            </View>
        }

            {showPriceDetails &&
                <View style={[]}>
                    <PriceDetails title="Calculatrice De Gains" product={{
                        newPrice:parseFloat(valuePrice.split('.').join('')),
                        feesBy:valueFeesBy,
                        }} />
                </View>
            }
        <View style={[addProductStyles.addProductSubmitView,{}]}>
                <CustomButton text="Publier Le Produit" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={submitProduct} />
        </View>
</View>
    )
}
export default AddProduct