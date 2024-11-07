import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Pressable, ScrollView, FlatList, Image, TextInput} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Icon, CheckBox, } from 'react-native-elements';

import { appColors, customText, screenHeight } from '../../styles/commonStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { sCategoriesStyles } from '../../styles/paths/search/sCategoriesStyles';
import { filtersSearchStyles } from '../../styles/filtersSearchStyles';
import { CustomButton, CustomActivityIndicator, ConditionChoice,} from "../common/CommonSimpleComponents"

import { formatMoney } from '../../utils/commonAppFonctions';
import { ProductItemContext } from '../../context/ProductItemContext';
import { FilterContext } from '../../context/FilterContext';

import { server } from '../../remote/server';
import { colors } from '../../utils/sampleDatas';
import { capitalizeFirstLetter } from '../../utils/commonAppFonctions';
import FiltersSearch from '../specific/FiltersSearch';
import { screenWidth } from '../../styles/commonStyles';
import SColors from '../paths/search/SColors';
import SConditions from '../paths/search/SConditions';
import SPrices from '../paths/search/SPrices';
import SBrands from '../paths/search/SBrands';

const ChooseSearchFilters = (props) => {
    const { params } = props.route
    const {page,} = props
    const goBackTo = params?.datas?.goBackTo || props?.goBackTo
    const goBackOptions = ['AddProduct', 'FiltersSearch']
//console.log(page)
    const {setSelectedBrand, selectedColor, setSelectedColor, categories, brands, isLoading} = useContext(ProductItemContext)
    const { selectedCategories, updateCategories, setSelectedCategories, resetAllFilters,
        searchCategory,  minPrice, maxPrice, setMinPrice, setMaxPrice, setFiltersUpdated,
    } = useContext(FilterContext)
    
    //const [selectedCategories, setSelectedCategories] = useState({"Vetements": true, "name": "Vetements"})

    const navigation = useNavigation()
    const [selectedCategories_, setSelectedCategories_] = useState({"Vetements": true, "name": "Vetements"})
   
   

    
   

const showSubCategories = async (type, cat, subCat) => {
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


//route.params.handleCategory()


        
    if(page=="category" || params?.datas?.page==="category")
    {
        const { selectedModalCategoriesFromContext, setSelectedModalCategoriesFromContext, updateAllCategoriesSelected, allCategoriesSelected} = useContext(FilterContext)
        //const [all, setAll] = useState(!Object.keys(selectedModalCategoriesFromContext).some((el)=>selectedModalCategoriesFromContext[el]===false))
        
        
        const handleNavigationSubCat = (category) => {
            navigation.navigate('SSubCategories', {category:category.name, subCategories:category.subCategories})
        }

        const CategoriesSearchItem = (props) => {
            const { item } = props
            let selectedFilters = ''

            function splitSelectedFilters(text){
                    if(text.length > 20)
                    {
                            return text.substring(0,20)+'...'
                    }
                    return text
            }
            const choices = Object.keys(selectedModalCategoriesFromContext).filter((key)=>{ return selectedModalCategoriesFromContext[key]===true})
            const catAcc = choices.map((el)=>{ return {category:el.split('/')[0], subCategory:el.split('/')[1] } })
            //console.log(selectedModalCategoriesFromContext)
//console.log(choices)
            selectedFilters = catAcc.reduce((acc, item) => {
                  if (!acc[item.category]) {
                    acc[item.category] = []; 
                  }
              
                  acc[item.category].push(item.subCategory);
                  return acc; 
                }, {});
        
                
            return (
                    <Pressable style={[filtersSearchStyles.pressableFilter,]}  onPress={()=>{handleNavigationSubCat(item)}}  >
                            <View style={[{}]}>
                                    <Text style={[customText.text, filtersSearchStyles.itemText,]}>{item.name}</Text>
                            </View>
                            
                            <View style={[{justifyContent:'center'}]}>
                                    <View style={[{alignItems:'flex-end'}]}>
                                            <Icon name="chevron-right" type="font-awesome" size={16}  color={appColors.secondaryColor1} />
                                    </View>
                                    { selectedFilters[item.name] &&
                                            <Text style={[customText.text, filtersSearchStyles.selectedFilters,]}>{splitSelectedFilters(selectedFilters[item.name]?.join(', '))}</Text>
                                    }
                            </View>
                    </Pressable>
            )
        }

        const getAllSubCategories = () => {
            //setAll(prev=>!prev)
            updateAllCategoriesSelected(categories)
            //setFiltersUpdated(true)
        }

        return (
             <View style={[sCategoriesStyles.container]}>     
                        <Pressable style={[subCategoriesItemStyles.itemContainer,]}>
                            <CheckBox title='Tout Sélectionner' containerStyle={[subCategoriesItemStyles.contentContainer, subCategoriesItemStyles.contentContainerTop]} textStyle={[customText.text, subCategoriesItemStyles.checkBoxText, {color:appColors.secondaryColor1, fontWeight:'bold', fontSize:16}]} 
                                checked={allCategoriesSelected}
                                    onPress={() => { getAllSubCategories() }} 
                            />
                        </Pressable>        
                <View style={[sCategoriesStyles.categoriesContainer]}>
                    <FlatList
                            data={categories}
                            nestedScrollEnabled={true}
                            renderItem={ ({item}) => { return (<CategoriesSearchItem item={item} /> ) }}
                            keyExtractor={ (item) => { return item._id.toString(); } }
                            horizontal={false}
                            numColumns={ 1 }
                            ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={[sCategoriesStyles.flatlist,]}
                            scrollEventThrottle={16}
                        />
                </View>
            </View>
           )         
        }
        else if(params?.datas?.page==="brand")
        {
            return (
                <View style={[sCategoriesStyles.container]}>             
                    <SBrands brands={brands} setSelectedBrand={setSelectedBrand} />
                </View>
            )
        }
        else if(params?.datas?.page=="color")
        {
            return (
                <View style={[sCategoriesStyles.container]}>             
                    <SColors colors={colors} />
                </View>
            )
        }
        else if(params?.datas?.page=="condition")
        {
            return(
                <View style={[sCategoriesStyles.container]}>             
                    <SConditions />
                </View>
            )
        }
        else if(params.datas.page==='price')
        {
            return(
                <View style={[sCategoriesStyles.container]}>             
                    <SPrices/>
                </View>
            )
        }
            
}


const subCategoriesItemStyles =  StyleSheet.create({
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
        //margin:1,
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
export default ChooseSearchFilters
    