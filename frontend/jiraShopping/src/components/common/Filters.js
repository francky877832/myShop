import React, { useState, useEffect, useRef, useContext,  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { Button, CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';

import { ConditionChoice, CustomButton} from "../common/CommonSimpleComponents"
import { Icon } from 'react-native-elements';

import { appColors, appFont } from '../../styles/commonStyles';
import { filtersStyles } from '../../styles/filtersStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';
import FilterItem from './FilterItem';
import ProductsList from './ProductsList';
import { datas } from '../../utils/sampleDatas';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';
import { formatMoney } from '../../utils/commonAppFonctions';

//Context
import { FilterContext } from '../../context/FilterContext';
import { ProductItemContext } from '../../context/ProductItemContext';

const Filters = (props) => {

    const {selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, setSelectCategories, setSelectedOrderBy, refreshComponent,
        setRefreshComponent, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice, _handlePress, updateCategories, resetAllFilters, getSearchedTextWithFilters
     }  =  useContext(FilterContext)
    const { categories, brands } = useContext(ProductItemContext)
//console.log(categories)
    const { suggestion, searchText } = props
    const [showSuggestion, setShowSuggestion] = useState(suggestion)


   /* const categories = [
        {
            name : "Electonique",
            subCategories : [{id:1,name:"Telephone",}, {id:2, name:"Ordinateur"}]
    
        },

        {
            name : "Electonique",
            subCategories : [{id:3,name:"Telephone",}, {id:4, name:"Ordinateur"}]
    
        },
        {
            name : "Electonique",
            subCategories : [{id:5,name:"Telephone",}, {id:6, name:"Ordinateur"}]
    
        },
     
    ]*/
    const orderByItems = [{id:1,name:"Prix DESC"},{id:2, name:"Prix ASC"}, {id:3,name:"Nom ASC"},{id:4, name:"Nom DESC"}, {id:5,name:"Plus Recents"} ,{id:6,name:"Plus Anciens"}]

    


    const [modalPriceVisible, setModalPriceVisible] = useState(false);
    const [modalConditionVisible, setModalConditionVisible] = useState(false);
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [modalOrderByVisible, setModalOrderByVisible] = useState(false);
    const [modalFiltersVisible, setModalFiltersVisible] = useState(false);
    const [modalBrandVisible, setModalBrandVisible] = useState(false);

    const functionsCatalog = { //for element in the filters
        "price" :  [modalPriceVisible, setModalPriceVisible],
        "condition" : [modalConditionVisible, setModalConditionVisible],
        "categories" : [modalCategoryVisible, setModalCategoryVisible],
        "trier" :  [modalOrderByVisible, setModalOrderByVisible],
        "filters" : [modalFiltersVisible, setModalFiltersVisible],
        "marque" :  [modalBrandVisible, setModalBrandVisible],
    }

   

    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)

    const filters = [{name:"Categories"},{name:"Price"},{name:"Condition"}, {name:"Marque"}]

const setOtherModalToFalse = (modal)=>{
    Object.keys(functionsCatalog).map((key)=>{
        if(modal!=key)
            //console.log(key)
            functionsCatalog[key][1](false)
    })
}
    const showFilters = (filter) => {
        filter = filter.toLowerCase()
        //console.log(filter)
            switch(filter)
            {
                case "trier" : 
                    setModalOrderByVisible(true)
                    setOtherModalToFalse(filter)

                    //activeFilterRef.current = [setModalOrderByVisible, "trier"];  
                    break;
                case "filters" : 
                    setModalFiltersVisible(true)
                    setOtherModalToFalse(filter)
                    //(["categories","price","etat"].includes(from)) ? setModalFiltersVisible(false) : setModalFiltersVisible(true)
                    //setter(false)
                    //activeFilterRef.current = [setModalFiltersVisible, "filter"];
                    break;
                case "categories" :
                    //modalFiltersVisble est deja a true
                    //console.log("OK")
                    setModalCategoryVisible(!modalCategoryVisible)
                    setOtherModalToFalse(filter)

                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalCategoryVisible, "categories"];
                    break;
                case "price" : 
                    setModalPriceVisible(!modalPriceVisible);
                    setOtherModalToFalse(filter)

                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalPriceVisible, "price"]; 
                    break;
                case "condition" : 
                    setModalConditionVisible(!modalConditionVisible);
                    setOtherModalToFalse(filter)

                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalConditionVisible, "etat"]; 
                    break;
                case "marque" : 
                    setModalBrandVisible(!modalBrandVisible);
                    setOtherModalToFalse(filter)

                    break;
                default :  break;
            }
    }


    return (
        <View style={[filtersStyles.contentContainerStyle,{}]}>

                {suggestion && !showSuggestion &&
                            <Pressable onPress={()=>{setShowSuggestion(!showSuggestion)}} style={{backgroundColor:appColors.white, paddingLeft:5,position:"relative",flexDirection:"row"}}>
                                <Icon name='bulb' type='ionicon' size={18} color={appColors.green} />
                                <Text style={[customText.text, {fontWeight:"bold",color:appColors.green,textDecorationLine:"underline"}]}>Suggestions</Text>
                            </Pressable>
                         }
{ //showSuggestion ||
        <View style={[filtersStyles.container]}>
            <View style={[filtersStyles.topMostContainer,{}]}>
                <View style={[filtersStyles.topContainer]}>
                        <Pressable style={[filtersStyles.trierFiltrer,  modalOrderByVisible ? filtersStyles.trierFiltrerFocused : false, ]} onPress={()=>{showFilters("trier")}}>
                            <Icon name='swap-vertical' type='ionicon' size={18} color={appColors.secondaryColor1} />
                                <View style={{width:10}}></View>
                            <Text style={[customText.text, modalOrderByVisible ? filtersStyles.modalVisibleText : false,]}>Trier</Text>
                        </Pressable>
                        <Pressable style={[filtersStyles.trierFiltrer, {borderLeftWidth:1,borderLeftColor:appColors.secondaryColor3}, modalFiltersVisible ? filtersStyles.trierFiltrerFocused : false,]} onPress={()=>{showFilters("filters")}}>
                                <Icon name='filter' type='ionicon' size={18} color={appColors.secondaryColor1} />
                                    <View style={{width:10}}></View>
                                <Text style={[customText.text, modalFiltersVisible ? filtersStyles.modalVisibleText : false, ]}>Filtrer</Text>
                        </Pressable>    
                </View>
            {//modalFiltersVisible &&
                <View style={[filtersStyles.filtres]}>
                        <FlatList data={filters} keyExtractor={(item)=>Math.random().toString()} renderItem={({item}) => {return (
                            <Pressable style={[filtersStyles.pressableFilter, functionsCatalog[item.name.toLowerCase()][0] ? filtersStyles.pressableFilterFocused : false]} onPress={()=>{showFilters(item.name)}} >
                                <Text style={[customText.text]}>{item.name}</Text>
                            </Pressable>
                            )}}
                            ItemSeparatorComponent={(item) => {return <View style={{width:20,}}></View>}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{justifyContent:"center", alignItems:"center",}}
                        />
                </View>
            }
        </View>


                {!modalFiltersVisible && modalOrderByVisible &&
            <View style={[filtersStyles.orderByContainer]}>
                <View style={{alignSelf : "center",}}>
                    <Text style={[customText.text,filtersStyles.label]}>Trier Par...</Text>
                </View>

                    <View style={[filtersStyles.filterFlatlist, filtersStyles.radioBox]}>
                        <RadioButton.Group onValueChange={val => {getSearchedTextWithFilters(searchText,val); return val}} value={selectedOrderBy} style={[filtersStyles.radioGroup,]}>
                            {
                                orderByItems.map((item) => {
                                    return(
                                        <View style={filtersStyles.radioContainer} key={item.id}>
                                        <RadioButton value={item.name} />
                                            <Text>{item.name}</Text>
                                    </View>
                                    )
                                })
                            }
                        </RadioButton.Group>
                        <CustomButton text="Vider" color={appColors.white} backgroundColor={appColors.gray} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"100%",}}} onPress={()=>{resetAllFilters();}} />

                    </View>
                    <View style={{height:20,}}></View>
                
            </View>

        }



{/*modalFiltersVisible && */ (modalConditionVisible || modalCategoryVisible || modalPriceVisible || modalBrandVisible) && 
<View style={[filtersStyles.modal,{}]}>
            <View style={{width:"100%",}}>
                { /*modalFiltersVisible &&*/ modalPriceVisible &&
                <View style={[filtersStyles.priceContainer]} >
                    <View style={{height:10,}}></View>
                        
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Price</Text>
                        </View>

                        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                            <Text style={filtersStyles.label}>Prix Min.</Text>
                            <Text style={filtersStyles.label}>Prix Max.</Text>
                        </View>

                        <View style={filtersStyles.price}>
                            <View style = {[filtersStyles.minPrice]}>
                                <TextInput placeholder="Prix min."
                                    placeholderTextColor={appColors.mainColor}
                                    inputMode='numeric'
                                    style = {[filtersStyles.input, isMinPriceFocused && filtersStyles.inputFocused]}
                                    onFocus={() => setIsMinPriceFocused(true)}
                                    onBlur={() => setIsMinPriceFocused(false)}
                                    value={minPrice}
                                    onChangeText={(price) => setMinPrice(formatMoney(price))}
                                />
                            </View>

                        <Text>-</Text>

                        <View style = {[filtersStyles.maxPrice]}>
                            <TextInput placeholder="Prix max."
                                placeholderTextColor={appColors.mainColor}
                                inputMode='numeric'
                                style = {[filtersStyles.input, isMaxPriceFocused && filtersStyles.inputFocused]}
                                onFocus={() => setIsMaxPriceFocused(true)}
                                onBlur={() => setIsMaxPriceFocused(false)}
                                value={maxPrice}
                                onChangeText={(price) => setMaxPrice(formatMoney(price))}
                            />
                        </View>
                    </View>
                    <View style={{height:20,}}></View>
                </View>
            }
        { /*modalFiltersVisible &&*/ modalConditionVisible &&
                    <View style={filtersStyles.conditionContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text,filtersStyles.label]}>Condition</Text>
                        </View>
                        <ConditionChoice styles={{}} isNewFocused={isNewFocused} isOldFocused={isOldFocused} setIsNewFocused={setIsNewFocused} setIsOldFocused={setIsOldFocused} />
                    </View>
        }


        {
            /*modalFiltersVisible &&*/ modalCategoryVisible &&
                    <View style={[filtersStyles.categoryContainer, filtersStyles.cardItem]}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Categories</Text>
                        </View>

                        <View style={[filtersStyles.filterFlatlist, filtersStyles.cardItem,]}>
                            <FlatList
                                data={[...categories,]}
                                nestedScrollEnabled={true}
                                renderItem={ ({item}) => { return <FilterItem tag="category" item={item} /> } }
                                keyExtractor={ (item) => { return Math.random().toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={filtersStyles.categorySeparator}></View> }}
                                horizontal={false}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ maxHeight:500 }}
                            />
                        </View>
                    </View>
        }

{
            /*modalFiltersVisible &&*/ modalBrandVisible &&
                    <View style={[filtersStyles.categoryContainer, filtersStyles.cardItem]}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Marques</Text>
                        </View>

                        <View style={[filtersStyles.filterFlatlist, filtersStyles.cardItem,]}>
                            <FlatList
                                data={brands}
                                renderItem={ ({item}) => { return <FilterItem tag="brand" item={item}  /> } }
                                keyExtractor={ (item) => { return Math.random().toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={filtersStyles.categorySeparator}></View> }}
                                horizontal={false}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{  maxHeight : 500,  }}
                            />
                        </View>
                    </View>
        }
        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5}}>
            <CustomButton text="Vider" color={appColors.white} backgroundColor={appColors.red} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{resetAllFilters();setRefreshComponent(!refreshComponent)}} />
            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{getSearchedTextWithFilters(searchText||"")}} />
        </View>
            </View>
            </View>}
        </View>
}
{showSuggestion &&
                    <View style={[filtersStyles.similarContainer,{top:2,paddingTop:5,left:0,}]}>
                         {suggestion && showSuggestion &&
                            <Pressable onPress={()=>{setShowSuggestion(!showSuggestion)}} style={{backgroundColor:appColors.lightWhite,top:5,zIndex:99,position:"relative",flexDirection:"row",alignItems:"center",}}>
                                <Icon name='close' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                <Text style={[customText.text, {fontWeight:"bold",color:appColors.secondaryColor1,textDecorationLine:"underline"}]}>Fermer</Text>
                            </Pressable>
                         }
                        <ProductsList datas={datas} horizontal={true} styles={filtersStyles} />
                    </View>
}
    </View>


)}

export default Filters