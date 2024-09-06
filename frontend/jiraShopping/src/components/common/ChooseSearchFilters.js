import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Pressable, ScrollView, FlatList, Image, TextInput} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import { Input } from 'react-native-elements';



import { appColors, customText, screenHeight } from '../../styles/commonStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { sCategoriesStyles } from '../../styles/paths/search/sCategoriesStyles';
import { CustomButton, CustomActivityIndicator, ConditionChoice,} from "../common/CommonSimpleComponents"

import { Icon, CheckBox, } from 'react-native-elements';

import { formatMoney } from '../../utils/commonAppFonctions';
import { ProductItemContext } from '../../context/ProductItemContext';
import { FilterContext } from '../../context/FilterContext';

import { server } from '../../remote/server';
import { colors } from '../../utils/sampleDatas';
import { capitalizeFirstLetter } from '../../utils/commonAppFonctions';
import FiltersSearch from '../specific/FiltersSearch';
import { screenWidth } from '../../styles/commonStyles';

const ChooseSearchFilters = (props) => {
    const { params } = props.route
    const {page,} = props
    const goBackTo = params?.datas?.goBackTo || props?.goBackTo
    const goBackOptions = ['AddProduct', 'FiltersSearch']
//console.log(page)
    const {setSelectedBrand, selectedColor, setSelectedColor, categories, brands, isLoading} = useContext(ProductItemContext)
    const { selectedCategories, updateCategories, setSelectedCategories, resetAllFilters,
        searchCategory,  minPrice, maxPrice, setMinPrice, setMaxPrice,
    } = useContext(FilterContext)
    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)
    //const [selectedCategories, setSelectedCategories] = useState({"Vetements": true, "name": "Vetements"})

    const navigation = useNavigation()
    const [selectedCategories_, setSelectedCategories_] = useState({"Vetements": true, "name": "Vetements"})
    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [isNewOldFocused, setIsNewOldFocused] = useState(true)
    const [conditions, setConditions] = useState({"old":true, "new":true, "new used":true})

  const handleNavigationSubCat = (category) => {
    navigation.navigate('SSubCategories', {category:category.name, subCategories:category.subCategories})
  }
    
   

const getCategory = async (type, cat, subCat) => {
    await searchCategory(selectedCategories_) //important pour orderBy(val) 
                                            //mais ici cest selectedCategories_ passe en parametre
                                            //de navigate() qui sera utilisé puisque les setters sont asynchrones
    //console.log(selectedCategories)
    
        switch(type)
        {
            case "category" :    
                updateCategories(selectedCategories_.name, "complete_category");
                break;
            case "subCategory" :
                updateCategories(cat, subCat)
                //{[id] : true, name:id, subCategories:path}
                break;
            default : break;
           
        }
        navigation.goBack()
    //navigation.navigate("CategoryResults", {category:selectedCategories_, searchText:"", display:"category"});
}

const updateConditions = useCallback((name) =>
    {
        setConditions((prevSelectedConditions)=>{
            switch(name){
                case "new":
                    setIsNewFocused(!isNewFocused)
                    return {...prevSelectedConditions, [name]:isNewFocused}
                    break
                case "old":
                    setIsOldFocused(!isOldFocused)
                    return {...prevSelectedConditions, [name]:isOldFocused}
                    break
                case "new used":
                    setIsNewOldFocused(!isNewOldFocused)
                    return {...prevSelectedConditions, [name]:isNewOldFocused}
                    break
                default : return{...prevSelectedConditions}
            }
            
        })
    })
//route.params.handleCategory()
    return(
        <View style={[sCategoriesStyles.container]}>

        {
            (page=="category" || params?.datas?.page==="category") &&
                            
                <View style={[sCategoriesStyles.categoriesContainer]}>
                    <FlatList
                            data={categories}
                            nestedScrollEnabled={true}
                            renderItem={ ({item}) => { return (
                                    <Pressable style={[sCategoriesStyles.pressableCat, ]} onPress={()=>{handleNavigationSubCat(item) }}>
                                        <Text style={[customText.text, sCategoriesStyles.itemText ]}>{item.name}</Text>
                                        <Icon name="chevron-right" type="font-awesome" size={16}  color={appColors.secondaryColor1} />
                                    </Pressable>
                                    )
                                }}
                            keyExtractor={ (item) => { return item._id.toString(); } }
                            horizontal={false}
                            numColumns={ 1 }
                            ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[sCategoriesStyles.flatlist,]}
                            scrollEventThrottle={16}
                        />
                </View>
            
                    
        }

{
            params?.datas?.page=="brand" &&
            <View style={[sCategoriesStyles.categoriesContainer]}>
                <FlatList
                        data={brands}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return(
                                <View style={{flex:1}}>
                                    <Pressable style={[sCategoriesStyles.pressableCat]} onPress={()=>{setSelectedBrand(item.name);navigation.goBack();}}>
                                        <Text style={[customText.text, sCategoriesStyles.itemText]}>{item.name}</Text>
                                    </Pressable>
                                </View>
                                )
                           
                        } }
                        keyExtractor={ (item) => { return item._id.toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[sCategoriesStyles.flatlist,]}
                    />
            </View>
        }

{
            params?.datas?.page=="color" &&
        <>
            <View style={[sCategoriesStyles.categoriesContainer,{}]}>
                <FlatList
                        data={colors}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { 
                            if(item.name!="multicolor")
                            {
                                  return (
                                    <View style={{}}>
                                        <Pressable style={[sCategoriesStyles.pressableColor,]} onPress={()=>{setSelectedColor(item.name);navigation.goBack();}}>
                                            <View style={[{width:50,height:50,borderRadius:25,backgroundColor:item.name,}]}></View>
                                            <Text style={[addProductStyles.normalText,]}>{capitalizeFirstLetter(item.name)}</Text>
                                        </Pressable>
                                    </View>
                                  )

                            }else{
                                    return(
                                        <View style={{flex:1}}>
                                            <Pressable style={{}}  onPress={()=>{setSelectedColor(item.name);navigation.goBack();}}>
                                                <Image source={require('../../assets/images/multicolor.png')} style={[{width:50,height:50,borderRadius:25,backgroundColor:item.name,}]} />
                                                <Text style={[addProductStyles.normalText,]}>{capitalizeFirstLetter(item.name)}</Text>
                                            </Pressable>
                                        </View>
                                        )
                             }
                        
                        } }
                        keyExtractor={ (item) => { return item._id.toString(); } }
                        horizontal={false}
                        numColumns={ 5 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[{}]}
                    />

            </View>

            <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:10}}>
                <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setConditions({})}} />
                <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{validateFilters()}} />
            </View>            
        </>
        }


{
     params?.datas?.page=="condition" &&
            <View style={sCategoriesStyles.conditionContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, sCategoriesStyles.label]}>Condition</Text>
                        </View>
                        <ConditionChoice styles={{}} updateConditions={updateConditions} conditions={conditions} />
                    
                        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:0}}>
                            <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setConditions({})}} />
                            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{validateFilters()}} />
                        </View>
            </View>
}

{
    params.datas.page==='price' &&
    <View style={[sCategoriesStyles.priceContainer]} >
    <View style={{height:10,}}></View>
        
       

        <View style={[sCategoriesStyles.price,{}]}>
            <View style = {[sCategoriesStyles.pricesContainer]}>
                <TextInput placeholder="Prix minimal en XAF"
                    placeholderTextColor={appColors.secondaryColor5}
                    inputMode='numeric'
                    style = {[sCategoriesStyles.priceInput, isMinPriceFocused && sCategoriesStyles.priceInputFocused]}
                    onFocus={() => setIsMinPriceFocused(true)}
                    onBlur={() => setIsMinPriceFocused(false)}
                    value={minPrice}
                    onChangeText={(price) => setMinPrice(formatMoney(price, 'XAF'))}
                    
                />
            </View>

            

        <View style = {[sCategoriesStyles.pricesContainer, {borderTopWidth:1,borderColor:appColors.lightWhite}]}>
            <TextInput placeholder="Prix maximal en XAF"
                placeholderTextColor={appColors.secondaryColor5}
                inputMode='numeric'
                style = {[sCategoriesStyles.priceInput, isMaxPriceFocused && sCategoriesStyles.priceInputFocused]}
                onFocus={() => setIsMaxPriceFocused(true)}
                onBlur={() => setIsMaxPriceFocused(false)}
                value={maxPrice}
                onChangeText={(price) => setMaxPrice(formatMoney(price, 'XAF'))}
            />
        </View>
    </View>

    <View style={{height:20,}}></View>
        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:0}}>
            <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setMaxPrice("");setMinPrice("");}} />
            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{validateFilters()}} />
        </View>
</View>

}

            {isLoading && 
                <CustomActivityIndicator styles={{}} /> 
            }
        </View>
    )
}


const styles = StyleSheet.create({
    scrollIndicator: 
    {
        zIndex : 100,
        alignItems: 'center',
        paddingVertical: 20,
        //borderTopWidth: 1,
        //borderTopColor: appColors.black,
        position : "absolute",
        top : -20,
        //bottom : 0,
        left : 70,
        right : 0,
        //backgroundColor:"red",
      },
})
export default ChooseSearchFilters
    