import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';


import { Input } from 'react-native-elements';



import { appColors, customText, screenHeight } from '../../../styles/commonStyles';
import { addProductStyles } from '../../../styles/addProductStyles';
import { sCategoriesStyles } from '../../../styles/paths/search/sCategoriesStyles';
import { CustomButton, CustomActivityIndicator } from "../../common/CommonSimpleComponents"

import { Icon, CheckBox, } from 'react-native-elements';

import { FilterContext } from '../../../context/FilterContext';
import { ProductItemContext } from '../../../context/ProductItemContext';
import { capitalizeFirstLetter } from '../../../utils/commonAppFonctions';
import { screenWidth } from '../../../styles/commonStyles';

const SColors = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const { category, subCategories } = route.params
    const { colors } = props

    const {selectedColorFromContext, setSelectedColorFromContext } = useContext(FilterContext)
    const [selectedLocalColors, setSelectedLocalColors] = useState(selectedColorFromContext)

    useEffect(()=>{
        navigation.setOptions({ 
            title: 'Couleurs' ,
            headerStyle: {
                backgroundColor: appColors.white, // Change ici la couleur de fond du header
              },
              headerTintColor: appColors.black
        });
    })


    const updateLocalSelectedColors = useCallback((name) => {
        setSelectedLocalColors((prev)=>{
                //console.log(prevSlectedCategories)
        
                return ({
                    ...prev,
                    [name] : !prev[name], 
                })
            })

    })

    const applyAllUserChoices = () => {
        setSelectedColorFromContext(selectedLocalColors)
        navigation.goBack()
    }

    const handleUserChoice = async (name) => {
        updateLocalSelectedColors(name)
    }

    return (
        <>
        <View style={[sCategoriesStyles.colorsContainer,{}]}>
            <FlatList
                    data={colors}
                    nestedScrollEnabled={true}
                    renderItem={ ({item}) => { 
                        if(item.name!="multicolor")
                        {
                              return (
                                <View style={[sCategoriesStyles.pressableColorContainer]}>
                                   
                                    <Pressable style={[sCategoriesStyles.pressableColor,]} onPress={()=>{handleUserChoice(item.name)}}>
                                        <View style={[sCategoriesStyles.colorMulticolor, {backgroundColor:item.name, borderColor:appColors.lightWhite, borderWidth:item.name==='white'?1:0}]}>
                                            {selectedLocalColors[item.name] && 
                                                <Icon name="checkmark-circle" type='ionicon' size={32} color={appColors.lightWhite} style={sCategoriesStyles.iconCheck} />
                                            }
                                        </View>
                                        <Text style={[addProductStyles.normalText, {paddingTop:10, color:appColors.secondaryColor5}]}>{capitalizeFirstLetter(item.name)}</Text>
                                    </Pressable>
                                </View>
                              )

                        }else{
                                return(
                                    <View  style={[sCategoriesStyles.pressableColorContainer]}>
                                        <Pressable style={{}}  onPress={()=>{handleUserChoice(item.name)}}>
                                            <ImageBackground source={require('../../../assets/images/multicolor.png')} imageStyle={[sCategoriesStyles.colorMulticolor,]}  style={[sCategoriesStyles.colorMulticolor,]}>
                                                { selectedLocalColors[item.name] && 
                                                    <Icon name="checkmark-circle" type='ionicon' size={32} color={appColors.lightWhite} style={sCategoriesStyles.iconCheck} />
                                                }
                                            </ImageBackground>
                                            <Text style={[addProductStyles.normalText,]}>{capitalizeFirstLetter(item.name)}</Text>
                                        </Pressable>
                                    </View>
                                    )
                         }
                    
                    } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    horizontal={false}
                    numColumns={ 4 }
                    key={Math.random()}
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[{}]}
                />

        </View>

        <View style={[sCategoriesStyles.bottomButtonContainer]}>
                <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : sCategoriesStyles.pressable}} onPress={()=>{applyAllUserChoices()}} />
        </View>            
    </>
    )
}
export default SColors
