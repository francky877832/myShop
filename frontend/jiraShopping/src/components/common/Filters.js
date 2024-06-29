import React, { useState, useEffect, useRef,  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';

import { ConditionChoice } from "../common/CommonSimpleComponents"
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

const Filters = (props) => {

    const {prices, orderBy, category, isOldFocused, setIsOldFocused, isNewFocused, setIsNewFocused, suggestion} = props
    const [showSuggestion, setShowSuggestion] = useState(suggestion)

    const minPrice = prices[0]; const setMinPrice = prices[1]
    const maxPrice = prices[2]; const setMaxPrice = prices[3]

    const selectedCategories = category[0]; const updateCategories = category[1]
    const selectedOrderBy = orderBy[0]; const setSelectedOrderBy = orderBy[1]

    const categories = [
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
     
    ]
    const orderByItems = [{id:1,name:"Prix DESC"},{id:2, name:"Prix ASC"}, {id:3,name:"Plus Recents"},{id:4, name:"Plus Anciens"}, {id:5,name:"Plus Recents"} ,{id:6,name:"Plus Anciens"}]

    


    const [modalPriceVisible, setModalPriceVisible] = useState(false);
    const [modalConditionVisible, setModalConditionVisible] = useState(false);
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [modalOrderByVisible, setModalOrderByVisible] = useState(false);
    const [modalFiltersVisible, setModalFiltersVisible] = useState(true);
    const functionsCatalog = { //for element in the filters
        "price" :  [modalPriceVisible, setModalPriceVisible],
        "condition" : [modalConditionVisible, setModalConditionVisible],
        "categories" : [modalCategoryVisible, setModalCategoryVisible],
        "trier" :  [modalOrderByVisible, setModalOrderByVisible],
        "filters" : [modalFiltersVisible, setModalFiltersVisible],
    }

   

    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)

    const filters = [{name:"Categories"},{name:"Price"},{name:"Condition"}, {name:"Condition"}, {name:"Condition"}, {name:"Condition"}]

    const showFilters = (filter) => {
            switch(filter.toLowerCase())
            {
                case "trier" : 
                    setModalOrderByVisible(true)
                    setModalFiltersVisible(false)
                    //activeFilterRef.current = [setModalOrderByVisible, "trier"];  
                    break;
                case "filter" : 
                    setModalFiltersVisible(true)
                    setModalCategoryVisible(true)
                    setModalOrderByVisible(false)
                    setModalConditionVisible(false)
                    setModalPriceVisible(false)
                    //(["categories","price","etat"].includes(from)) ? setModalFiltersVisible(false) : setModalFiltersVisible(true)
                    //setter(false)
                    //activeFilterRef.current = [setModalFiltersVisible, "filter"];
                    break;
                case "categories" :
                    //modalFiltersVisble est deja a true
                    setModalCategoryVisible(!modalCategoryVisible)
                    setModalConditionVisible(false)
                    setModalPriceVisible(false)
                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalCategoryVisible, "categories"];
                    break;
                case "price" : 
                    setModalPriceVisible(!modalPriceVisible);
                    setModalCategoryVisible(false)
                    setModalConditionVisible(false)
                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalPriceVisible, "price"]; 
                    break;
                case "condition" : 
                    setModalConditionVisible(!modalConditionVisible);
                    setModalCategoryVisible(false)
                    setModalPriceVisible(false)
                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalConditionVisible, "etat"]; 
                    break;
                default :  break;
            }
    }


    return (
        <View>
                {suggestion && !showSuggestion &&
                            <Pressable onPress={()=>{setShowSuggestion(!showSuggestion)}} style={{backgroundColor:appColors.white
                            , paddingLeft:5,position:"relative",flexDirection:"row"}}>
                                <Icon name='bulb' type='ionicon' size={18} color={appColors.green} />
                                <Text style={[customText.text, {fontWeight:"bold",color:appColors.green,textDecorationLine:"underline"}]}>Suggestions</Text>
                            </Pressable>
                         }
{ //showSuggestion ||
        <View style={[filtersStyles.container]}>
                <View style={[filtersStyles.topContainer]}>
                        <Pressable style={[filtersStyles.trierFiltrer,  modalOrderByVisible ? filtersStyles.trierFiltrerFocused : false, ]} onPress={()=>{showFilters("trier")}}>
                            <Icon name='swap-vertical' type='ionicon' size={18} color={appColors.secondaryColor1} />
                                <View style={{width:10}}></View>
                            <Text style={[customText.text, modalOrderByVisible ? filtersStyles.modalVisibleText : false,]}>Trier</Text>
                        </Pressable>
                        <Pressable style={[filtersStyles.trierFiltrer, {borderLeftWidth:1,borderLeftColor:appColors.secondaryColor3}, modalFiltersVisible ? filtersStyles.trierFiltrerFocused : false,]} onPress={()=>{showFilters("filter")}}>
                                <Icon name='filter' type='ionicon' size={18} color={appColors.secondaryColor1} />
                                    <View style={{width:10}}></View>
                                <Text style={[customText.text, modalFiltersVisible ? filtersStyles.modalVisibleText : false, ]}>Filtrer</Text>
                        </Pressable>    
                </View>
{modalFiltersVisible &&
                    <View style={[filtersStyles.filtres]}>
                        <FlatList data={filters} keyExtractor={(item)=>Math.random().toString()} renderItem={({item}) => {return (
                            <Pressable style={[filtersStyles.pressableFilter, functionsCatalog[item.name.toLowerCase()][0] ? filtersStyles.pressableFilterFocused : false]} onPress={()=>{showFilters(item.name)}} >
                                <Text style={[customText.text]}>{item.name}</Text>
                            </Pressable>
                            )}}
                            ItemSeparatorComponent={(item) => {return <View style={{width:20,}}></View>}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{flex:1,flexDirection:"row",paddingVertical:10,}}
                        />
                    </View>
}
<View style={[filtersStyles.modal,{}]}>
            <View style={{width:"100%",}}>
                { modalFiltersVisible && modalPriceVisible &&
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
                                    onChangeText={(price) => setMinPrice(price)}
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
                                onChangeText={(price) => setMaxPrice(price)}
                            />
                        </View>
                    </View>
                    <View style={{height:20,}}></View>
                </View>
            }
        { modalFiltersVisible && modalConditionVisible &&
                    <View style={filtersStyles.conditionContainer}>
                        <View style={{alignSelf : "center",backgroundColor:appColors.white}}>
                            <Text style={[customText.text,filtersStyles.label]}>Condition</Text>
                        </View>
                        <ConditionChoice styles={{}} isNewFocused={isNewFocused} isOldFocused={isOldFocused} setIsNewFocused={setIsNewFocused} setIsOldFocused={setIsOldFocused} />
                    </View>
        }

        {!modalFiltersVisible && modalOrderByVisible &&
            <View style={[filtersStyles.orderByContainer]}>
                <View style={{alignSelf : "center",backgroundColor:appColors.white}}>
                    <Text style={[customText.text,filtersStyles.label]}>Trier Par...</Text>
                </View>

                    <View style={[filtersStyles.filterFlatlist, filtersStyles.radioBox]}>
                        <RadioButton.Group onValueChange={val => setSelectedOrderBy(val)} value={selectedOrderBy} style={[filtersStyles.radioGroup,]}>
                            {
                                orderByItems.map((item) => {
                                    return(
                                        <View style={filtersStyles.radioContainer} key={item.id}>
                                        <RadioButton value={item.id} />
                                            <Text>{item.name}</Text>
                                    </View>
                                    )
                                })
                            }
                        </RadioButton.Group>
                    </View>
                    <View style={{height:20,}}></View>
                
            </View>

        }

        {modalFiltersVisible && modalCategoryVisible &&
                    <View style={filtersStyles.categoryContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Categories</Text>
                        </View>


                        <View style={filtersStyles.filterFlatlist}>
                            <FlatList
                                data={categories}
                                renderItem={ ({item}) => { return <FilterItem selectedCategories={selectedCategories} item={item} updateCategories={updateCategories} /> } }
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
            </View>
        </View>
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