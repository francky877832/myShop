import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, Animated, Pressable, ScrollView, FlatList, Image, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


import { appColors, customText } from '../../styles/commonStyles';
import { CustomButton } from "../common/CommonSimpleComponents"

import { addProductStyles } from '../../styles/addProductStyles';
import { Icon } from 'react-native-elements';


const AddProduct = (props) => {
    const [open, setOpen] = useState(false)
    const [selectedImages, setSelectedImages] = useState([]);
    const [images, setImages] = useState([]);
    const [cameraOrGalery, setCameraOrGalery] = useState(false)
    const MAX_IMAGES = 6, MIN_IMAGES = 3

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


    const resizeImage = async (imageUri) => {
        const resizedImage = await ImageManipulator.manipulateAsync(
          imageUri,
          [{ resize: { width: 100, height: 100 } }],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
        );
        return resizedImage.uri;
    };
    
    const resizeAllImages = async () => {
        const resizedImages = await Promise.all(setImages.map(async image => {
          const resizedUri = await resizeImage(image.uri);
          return { ...image, uri: resizedUri };
        }));
        setImages(resizedImages);
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



   return (
        <ScrollView contentContainerStyle={[addProductStyles.container,{}]}>
            <View style={[addProductStyles.containers]}>
                <View style={[addProductStyles.titles]}>
                    <Text style={[addProductStyles.titlesText]}>Photos</Text>
                </View>
                
                <View style={[addProductStyles.contents]}>
                    <View style={[{flexDirection:"row",}]}>
                        <View style={[addProductStyles.imageBox,]}>
                            <Pressable onPress={()=>{setCameraOrGalery(true)}}>
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


        {cameraOrGalery &&
            <View style={[addProductStyles.bottomPicker]}>
                <Pressable onPress={pickImages}>
                    <Icon name="images-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos</Text>
                </Pressable>
                <Pressable onPress={takePhoto}>
                    <Icon name="camera-outline" type="ionicon" size={24} color={appColors.secondaryColor1} />
                    <Text style={[addProductStyles.normalText,{color:appColors.secondaryColor1}]}>Photos</Text>
                </Pressable>
            </View>
        }
            
        </ScrollView>
    )
}
export default AddProduct