import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';


import { Input } from 'react-native-elements';



import { appColors, customText, screenHeight } from '../../../styles/commonStyles';
import { addProductStyles } from '../../../styles/addProductStyles';
import { sCategoriesStyles } from '../../../styles/paths/search/sCategoriesStyles';
import { CustomButton, CustomActivityIndicator } from "../../common/CommonSimpleComponents"
import FilterItem from '../../common/FilterItem';

import { Icon, CheckBox, } from 'react-native-elements';

import { FilterContext } from '../../../context/FilterContext';
import { ProductItemContext } from '../../../context/ProductItemContext';
import { capitalizeFirstLetter } from '../../../utils/commonAppFonctions';
import { screenWidth } from '../../../styles/commonStyles';


const SBrands = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const { category, subCategories } = route.params
    const { brands} = props


    const { setSelectedBrandFromContext, selectedBrandFromContext } = useContext(FilterContext)

    const [selectedLocalBrand, setSelectedLocalBrand] = useState({})

    const updateSelectedLocalBrands = useCallback((name) => {
        setSelectedLocalBrand((prevSlectedBrands)=>{
                //console.log(prevSlectedCategories)
        
                return ({
                    ...prevSlectedBrands,
                    [name] : !prevSlectedBrands[name], 
                })
            })

    })

    const applyAllUserChoices = () => {
        setSelectedBrandFromContext(prev => selectedLocalBrand )
        navigation.goBack()
    }

    const handleUserChoice = async (name) => {
        updateSelectedLocalBrands(name)
    }

    useEffect(()=>{
        navigation.setOptions({ title: 'Marques' });
    })

    const BrandItem = (props) => {
        const {item, selectedLocalBrand, updateSelectedLocalBrands} = props
           
        return(
                <Pressable style={[brandItemStyles.itemContainer]}>
                    <CheckBox title={item.name} containerStyle={[brandItemStyles.contentContainer,{}]} textStyle={[customText.text,brandItemStyles.checkBoxText]} 
                    checked={ Object.keys(selectedLocalBrand).length>0 ?  selectedLocalBrand[item.name] :  selectedBrandFromContext[item.name] }
                    onPress={() => { handleUserChoice(item.name);  }} />
                </Pressable>
        )
    }

    return (
        <View style={[brandItemStyles.container, brandItemStyles.cardItem,]}>
            <FlatList
                data={brands}
                renderItem={ ({item}) => { return <BrandItem tag="brand" item={item} updateSelectedLocalBrands={updateSelectedLocalBrands} selectedLocalBrand={selectedLocalBrand} /> } }
                keyExtractor={ (item) => { return item._id.toString(); } }
                ItemSeparatorComponent ={ (item) => { return <View style={brandItemStyles.categorySeparator}></View> }}
                horizontal={false}
                numColumns={1}
                showsHorizontalScrollIndicator={false}
                //contentContainerStyle={{  maxHeight : 500,  }}
            />

            <View style={[sCategoriesStyles.bottomButtonContainer]}>
                <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : sCategoriesStyles.pressable}} onPress={()=>{applyAllUserChoices()}} />
            </View>
        </View>
    )
}
export default SBrands

const brandItemStyles =  StyleSheet.create({
    container :
    {
        flex:1, 
        backgroundColor:appColors.lightWhite,
        top : 2,
        paddingBottom : 95,
    },
    checkBox :
    {
        width : screenWidth/2.5,
        paddingLeft : 20
    },
    itemContainer :
    {
        borderWidth : 1,
        borderColor : appColors.lightWhite,
        paddingVertical : 20,
        paddingHorizontal : 10,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center',
        width : '100%',
        backgroundColor : appColors.white,
        //height : 100,
    },  
    contentContainer :
    {
        borderWidth:0, 
        margin:1,
        padding:0, 
        backgroundColor:appColors.white,
    },

   
    checkBoxText :
    {
        marginLeft: 20,
        color:appColors.secondaryColor5,
        fontWeight:"normal",
    },


})
