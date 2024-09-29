import { API_BACKEND } from '@env';

import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Modal} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { RadioButton, } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Input } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';


import { appColors, customText, formErrorStyle } from '../../styles/commonStyles';
import { CustomButton, PriceDetails, CustomModalActivityIndicator} from "../common/CommonSimpleComponents"

import { BottomToTopViewBox } from '../common/AnimatedComponents'

import { screenWidth, screenHeight } from '../../styles/commonStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { productsListStyles } from '../../styles/productsListStyles';
import { Icon } from 'react-native-elements';
import Categories from '../common/Categories';
import { formatMoney, capitalizeFirstLetter} from '../../utils/commonAppFonctions';
import { categoriesStyles } from '../../styles/categoriesStyles';

import { ProductItemContext } from '../../context/ProductItemContext';
import { FilterContext } from '../../context/FilterContext';
import { server, noImagePath, productsImagesPath } from '../../remote/server';
import { sendNotifications } from '../../utils/commonAppNetworkFunctions'


import { requestPermissions, pickImages, takePhoto, resizeImages } from '../../utils/utilsFunctions';
import { UserContext } from '../../context/UserContext';
import { asyncThunkCreator } from '@reduxjs/toolkit';

import productValidationSchema from '../forms/validations/productValidation';
import * as Yup from 'yup';

const AddProduct = (props) => {
    const route = useRoute()
    let product = {
        name : "",
        description : "",
        price : "",
        newPrice : "",
        minPrice : "",
        maxPrice : "",
        condition : "",
        seller : "",
        category : "",
        brand : "",
        color : "",
        feesBy : "",
        garanti : "",
        stock : "", 
        images : [],
    }
    const [showPriceDetails, setShowPriceDetails] = useState(false)
    
    const IMG_MAX_HEIGHT = screenHeight/2
    const IMG_MAX_WIDTH = screenWidth
    const navigation = useNavigation();
    const [allowBack, setAllowBack] = useState(false);
    const {selectedBrand, selectedColor, setSelectedColor, setSelectedBrand} = useContext(ProductItemContext)
    const { selectedCategories, setSelectedCategories } = useContext(FilterContext)
    const {user} = useContext(UserContext)
    

        if(route.params)
        {
            product = route.params.product
        }


    const [valueName, setValueName] = useState(product.name+"")
    const [valueDesc, setValueDesc] = useState(product.description+"")
    const [valuePrice, setValuePrice] = useState(formatMoney(product.newPrice))
    const [valueGaranti, setValueGaranti] = useState(product.garanti+"")
    const [valueStock, setValueStock] = useState(product.stock+"")
    const [valueEtat, setValueEtat] = useState(product.condition+"")
    const [valueFeesBy, setValueFeesBy] = useState(product.feesBy+"")
    const [kargoPrice, setKargoPrice] = useState(product.kargoPrice?product.kargoPrice+"":0)

//IsFocused pour ls inputText
    const [isNameFocused, setIsNameFocused] = useState(false)
    const [isDescFocused, setIsDescFocused] = useState(false)
    const [isPriceFocused, setIsPriceFocused] = useState(false)
    const [isGarantiFocused, setIsGarantiFocused] = useState(false)
    const [isStockFocused, setIsStockFocused] = useState(false)
    const [isKargoPrice, setIsKargoPrice] = useState(false)
    //const [valueBrand, setValueBrand] = useState("")
    //const [valueCategory, setValueCategory] = useState("")

    const [images, setImages] = useState(product.images.map(img=>({uri:img})));
    const [cameraOrGalery, setCameraOrGalery] = useState(false)
    const MAX_IMAGES = 6, MIN_IMAGES = 3

    const [errors, setErrors] = useState({});
    const [isPostLoading, setIsPostLoading] = useState(false)
    const [hasAdded, setHasAdded] = useState(false)

//Traitement des donnees et envoie au serveur

    //GoBackPermission
    const onBackPress = useCallback((e) => {
        if (allowBack) {
            return;
        }

        if (e) {
          e.preventDefault(); // Empêcher le comportement par défaut de la navigation
        }
    if(!hasAdded)
    {
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
    }
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
    if(img)
    {
        setImages((prevImages)=>{
                return [
                    ...prevImages,
                    ...img,
                ]
            }
        )
    }
    setCameraOrGalery(false)  
}

       
//
const takeUpPhoto = async () => {
    const img = await takePhoto(MAX_IMAGES, MIN_IMAGES, images)
    setImages((prevImages) => [...prevImages, img]);
    setCameraOrGalery(false)
}



const deleteSelectedImage = (uri) => {
    //Alert.alert("Scroll Addproduct")
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
const handleCategory = () => {
    //console.log('Its ok')
}

const submitProduct = async () => { 
   // Alert.alert("ok")
   
    try {
        setIsPostLoading(true)
       setErrors({});
        //console.log(images)
        const images_ = await resizeImages(images,IMG_MAX_HEIGHT,IMG_MAX_WIDTH)
        //console.log(images_)
        
        let formData = new FormData()
        
        const datas = {
            name : valueName,
            description : valueDesc,

            price : route.params?.product ? route.params?.product.price : valuePrice.replace('.',''),
            newPrice : valuePrice.replace('.',''),
            offerPrice : valuePrice.replace('.',''),

            minPrice : valuePrice.replace('.',''),
            maxPrice : valuePrice.replace('.',''),

            condition : valueEtat,
            seller : user._id,
            category : !!selectedCategories.name ? `${selectedCategories.name}/${selectedCategories.subCategories}`: product.category,
            brand : selectedBrand?selectedBrand:product.brand,
            color : selectedColor?selectedColor:product.color,
            feesBy : valueFeesBy,
            garanti : valueGaranti,
            stock : valueStock, 
            kargoPrice : kargoPrice,
        }
        //Gestion des images
        //console.log(images)
        //console.log(errors)
        const form = { ...datas, images}
        console.log(form)
        await productValidationSchema.validate(form, { abortEarly: false });


        images.forEach(async (image, index) => {
            if(image.fileName)
            {
                formData.append('imagesToUpload', {
                    uri: image.uri,
                    name: image.fileName,
                    type: image.mimeType,
                    extension:image.fileName.split('.')[1],
                    width : image.width,
                    height : image.height,
                });
            }
        });
        //console.log(formData)

    
        Object.keys(datas).forEach(key => {
            formData.append(key, datas[key]);
        });
        
        console.log(formData._parts)

        if(!product.name)
        {
            //console.log("formData._parts")
            const response = await fetch(`${server}/api/datas/products/add`,{
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    
                },
            });

            if (!response.ok) {
                // Le serveur a répondu avec un code d'état HTTP non 2xx
                const errorData = await response.json();
                throw new Error(`Server error: ${errorData.message || 'Unknown error'}`);
            }
            const res = await response.json()

                if(user.followers.length>0)
                {
                    user.followers.forEach(async (follower)=>{
                        await sendNotifications({ user:follower._id, source:"app", model:"PRODUCTS", type:"ON_PRODUCT_CREADTED", datas:res.datas._id })
                        //await sendNotifications({ user:item.seller._id, source:"app", model:"PRODUCTS", type:"ON_NEW_LIKE", datas:item._id })
                    })
                }

                navigation.navigate('MyShop')

        }
        else
        {
            //console.log("MODIFIED")
            //console.log(product._id)
           formData.append('images',  JSON.stringify(images.map(img=>(img.uri))))
            //console.log(formData._parts)
            const response = await fetch(`${server}/api/datas/products/update/${product._id}`,{
                method: 'PUT',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            
            if (!response.ok) {
                // Le serveur a répondu avec un code d'état HTTP non 2xx
                const errorData = await response.json();
                throw new Error(`Server error: ${errorData.message || 'Unknown error'}`);
            }

             const res = await response.json()

            if(product.favourites.length>0)
            {
                product.favourites.forEach(async (likeAdder)=>{
                    await sendNotifications({ user:likeAdder._id, source:"app", model:"PRODUCTS", type:"ON_PRODUCT_UPDATED", datas:res.datas._id })
                    //await sendNotifications({ user:item.seller._id, source:"app", model:"PRODUCTS", type:"ON_NEW_LIKE", datas:item._id })
                })
            }

            navigation.navigate('MyShop')

           
        }
            
           // const responseJson = await response.json();
        //setHasAdded(true)
    
        

    } catch (error) {
        console.error("AddProduct", error);
        if (error instanceof Yup.ValidationError) {
            const formErrors = {};
            error.inner.forEach(err => {
              formErrors[err.path] = err.message;
            });
            //console.log(formErrors)
            setErrors(formErrors);
        }
    } finally {
        setIsPostLoading(false)
    }

};
//Jai pas encore testé

/*

<FlatList
    data={images.length > 0 ? images.length < MAX_IMAGES ? [...images, ...new Array(MAX_IMAGES-images.length)] : images : [1,2,3,4,5,6]}
        renderItem={({ item }) => {
        // Ensure item is defined and handle it properly
         if (!item) return null

        return (
                               
                <View style={[addProductStyles.imageBox,{marginRight:10, marginTop:10}]}>
                    { images.length > 0  && item!=undefined &&
                        <View style={{flex:1,borderWidth:1}}>
                            <Image source={{ uri: item?.uri || item }} style={{width:100,height:100,}} />
                            <Pressable onPress={()=>{deleteSelectedImage(item?.uri || item);}} style={{width:20,height:20,backgroundColor:appColors.lightBlack,position:"absolute",alignSelf:"flex-end",top:0,}}>
                                <Icon name="close" type="ionicon" size={18} color={appColors.secondaryColor1} />
                            </Pressable>
                        </View>
                    }
                </View>
            )
         }
        }


    keyExtractor={(item, index) => index.toString()} // Using index as key
    horizontal={false}
    numColumns={2}
    key={Math.random.toString()}
    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
    showsHorizontalScrollIndicator={true}
    //contentContainerStyle={{  backgroundColor:'blue'}} // Set a maximum height to allow scrolling
    style={{ flexGrow: 1,  }} 
    contentContainerStyle={{justifyContent : "center", alignItems:'center',}}

    scrollEnabled={true}
/>*/

const [isModalVisible, setModalVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

const handleImagePress = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

   return (

<View style={{flex:1}}>
                        
<KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={[addProductStyles.container,{flexGrow: 1}]}>
            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Photos</Text>
                </View>
                
                <View style={[addProductStyles.contents, {width: '100%',}]}>
                    <View style={[{flexDirection:"ro", width: '100%',  }]}>
                        <View style={[addProductStyles.imageBox,]}>
                            <Pressable onPress={()=>{setCameraOrGalery(!cameraOrGalery)}}>
                                <Icon name="camera-outline" type="ionicon" size={50} color={appColors.secondaryColor1} />
                                <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos {images.length}/{MAX_IMAGES}</Text>
                            </Pressable>
                        </View>
                            <View style={{width:5,}}></View>
<ScrollView horizontal={false} contentContainerStyle={{flexWrap:'wrap', flexDirection: 'row', marginLeft:2, marginTop:2}}>
{
        (images.length > 0 ? images.length < MAX_IMAGES ? [...images, ...new Array(MAX_IMAGES-images.length)] : images : [1,2,3,4,5,6])
        .map((item, index)=>{
            let source;
            //console.log(item)
            source = (!item)?noImagePath:item.uri
            const uri = source?.startsWith('file') ? source : `${productsImagesPath}/${source}`


            return (
                                   
                    <Pressable style={[addProductStyles.imageBox,{marginRight:10, marginBottom:10,}]}  onPress={() => handleImagePress(source)} key={index}>
                        { images.length > 0  && item!=undefined &&
                            <View style={{}}>
                                <Image source={{ uri: uri }} style={{width:98,height:98,}} />
                                <Pressable onPress={()=>{deleteSelectedImage(source);}} style={{width:20,height:20,backgroundColor:appColors.lightBlack,position:"absolute",alignSelf:"flex-end",top:0,}}>
                                    <Icon name="close" type="ionicon" size={18} color={appColors.secondaryColor1} />
                                </Pressable>
                            </View>
                        }
                    </Pressable>
                )
        }) 
 }
    <Modal visible={isModalVisible}  transparent={true} onRequestClose={() => setModalVisible(false)} >
        <View style={addProductStyles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={addProductStyles.fullImage} />
          <Pressable style={addProductStyles.closeButton} onPress={() => setModalVisible(false)} >
            <Text style={addProductStyles.closeButtonText}>Fermer</Text>
          </Pressable>
        </View>
    </Modal>
</ScrollView>

                        {errors.images && <Text style={[formErrorStyle.text]}>{errors.images}</Text>}
                </View>  
            </View>
        </View>

            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Nom Du Produit</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                    <View>
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
                        {errors.name && <Text style={[formErrorStyle.text]}>{errors.name}</Text>}
                    </View>
                </View>
            </View>

            
            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Description Du Produit</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                        <View>
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
                            {errors.description && <Text style={[formErrorStyle.text]}>{errors.description}</Text>}
                        </View>
                    </View>
            </View>

            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Etat Du Produit</Text>
                </View>
                
                <View style={[addProductStyles.contents,]}>
                    <View style={{width:10,}}></View>
                        <View>
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

                            {errors.condition && <Text style={[formErrorStyle.text]}>{errors.condition}</Text>}
                        </View>
                </View>
            </View>


            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Details</Text>
                </View>

                <View style={[addProductStyles.contents,addProductStyles.categoryContainer]}>
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"category", goBackTo:"AddProduct"}, handleCategory:handleCategory})}}>
                                <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Categorie</Text>
                                <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                          
                                {
                                    (selectedCategories.name || product.category) &&
                                    <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>{!selectedCategories.name?product.category.replace('/', ' | ') : `${selectedCategories.name} | ${selectedCategories.subCategories}`}</Text>
                                }
                        </Pressable>
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"brand"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Marque</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                                {
                                    (selectedBrand || product.brand) &&
                                    <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>{!selectedBrand?product.brand:selectedBrand}</Text>
                                }
                        </Pressable>
                        
                        <Pressable style={[addProductStyles.pressableDetails]} onPress={()=>{navigation.navigate("Categories",{datas:{page:"color"}})}}>
                            <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>Couleur</Text>
                            <Icon name="chevron-forward" type="ionicon" color={appColors.secondaryColor1} />
                                {
                                    (selectedColor || product.color) &&
                                    <Text style={[addProductStyles.normalText,{fontWeight:"bold",}]}>{!selectedColor?product.color:capitalizeFirstLetter(selectedColor)}</Text>
                                }
                        </Pressable>
                        
                        <View style={{padding:5, paddingHorizontal:10}}>
                            {errors.category && <Text style={[formErrorStyle.text]}>{errors.category}</Text>}
                            {errors.brand && <Text style={[formErrorStyle.text]}>{errors.brand}</Text>}
                            {errors.color && <Text style={[formErrorStyle.text]}>{errors.color}</Text>}
                        </View>
                </View>

            </View>
                

            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Frais De Transport Payés Par...</Text>
                </View>
                
                <View style={[addProductStyles.contents,]}>
                    <View style={{width:10,}}></View>
                        <View>
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

                            {errors.feesBy && <Text style={[formErrorStyle.text]}>{errors.feesBy}</Text>}
                        </View>
                </View>



                <View style={[addProductStyles.containers]}>
                    <View style={[addProductStyles.contents, {flexDirection:'column'}]}>
                            <Input placeholder="Estimation des frais de transport. EX : 2500" value={kargoPrice} onChangeText={(price)=>{setKargoPrice(formatMoney(price))}}
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
                            <Text style={[customText.text,{fontStyle:'italic'}]}>Ce detail n'est pas obligatoire. Mais s'il est renseigné, nous aidera dans une estimation plus nette de vos gains </Text>
                            {errors.kargoPrice && <Text style={[formErrorStyle.text]}>{errors.kargoPrice}</Text>}
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
                        

                        <Input placeholder="Quantité. Ex : 1" value={valueStock} onChangeText={(stock)=>{setValueStock(stock)}}
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

                <View style={{backgroundColor:appColors.white, paddingHorizontal:20}}>
                    {errors.garanti && <Text style={[formErrorStyle.text]}>{errors.garanti}</Text>}
                    {errors.stock && <Text style={[formErrorStyle.text]}>{errors.stock}</Text>}
                    <View style={{height:10,}}></View>
                </View>
            </View>



            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles, {flexDirection:'row',justifyContent:'space-between',paddingRight:20}]}>
                    <Text style={[addProductStyles.titlesText]}>Prix En FCFA</Text>
                    
                    <Pressable style={[]} onPress={()=>{setShowPriceDetails(!showPriceDetails)}}>
                        {
                            showPriceDetails 
                            ?
                                <Icon type='octicon' name="triangle-down" size={24} color={appColors.secondaryColor1} />
                            :
                                <Icon type='octicon' name="triangle-up" size={24} color={appColors.secondaryColor1} />
                        }
                        <Text style={[{color:appColors.secondaryColor1}]}>Details</Text>
                    </Pressable>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={{width:10,}}></View>
                    {product.price &&
                        <Input placeholder="EX : 2500" value={formatMoney(product.newPrice)} onChangeText={(price)=>{setValuePrice(formatMoney(product.newPrice))}}
                            inputMode='numeric'
                            editable={false}
                            multiline={false}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, {color:appColors.secondaryColor1,textDecorationLine:'line-through',textDecorationColor:appColors.red}]}
                            onFocus={() => {} }
                            onBlur={() => {} }
                            underlineColorAndroid='transparent'
                            containerStyle={ [searchBarStyles.containerBox,]}
                            inputContainerStyle = {[searchBarStyles.inputContainer,  addProductStyles.inputContainer]}
                        />
                    }

                        <Input placeholder={product.price?"Nouveau prix":"Prix produit"} value={formatMoney(valuePrice)} onChangeText={(price)=>{setValuePrice(formatMoney(price))}}
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
                    <View style={{backgroundColor:appColors.white, paddingHorizontal:20}}>
                        {errors.price && <Text style={[formErrorStyle.text]}>{errors.price}</Text>}
                    <View style={{height:10,}}></View>
                </View>
            </View>

            </ScrollView>
        </TouchableWithoutFeedback>
</KeyboardAwareScrollView>
        
        {cameraOrGalery &&
            //<LeftToRightViewBox style={[addProductStyles.bottomPicker]}>
            <BottomToTopViewBox show={cameraOrGalery} duration={500}  from={100} to={0} styles={addProductStyles.bottomPicker}>
                <Pressable onPress={pickUpImages}>
                    <Icon name="images-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos</Text>
                </Pressable>
                <Pressable onPress={takeUpPhoto}>
                    <Icon name="camera-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Camera</Text>
                </Pressable>
            </BottomToTopViewBox>
        }

            {showPriceDetails &&
                <View style={[]}>
                    <PriceDetails title="Calculatrice De Gains" closePriceDetails={setShowPriceDetails} products={
                        [{
                            newPrice:parseInt(valuePrice.split('.').join('')),
                            feesBy:valueFeesBy,
                            kargoPrice:parseInt(kargoPrice.split('.').join('')),
                        }]
                    } />
                </View>
            }
        <View style={[addProductStyles.addProductSubmitView,{}]}>
                <CustomButton text="Publier Le Produit" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={addProductStyles} onPress={()=>{submitProduct()}} />
        </View>


        <CustomModalActivityIndicator onRequestClose={setIsPostLoading} isLoading={isPostLoading} size="large" color={appColors.secondaryColor1} message="Chargements des données..." />

</View>
    )
}
export default AddProduct