import React, { useState, useEffect, useRef,  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';

import { ConditionChoice } from "../common/CommonSimpleComponents"


import { appColors, appFont } from '../../styles/commonStyles';
import { filtersStyles } from '../../styles/filtersStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';
import FilterItem from './FilterItem';

const Filters = (props) => {

    const {prices, orderBy, category, isOldFocused, setIsOldFocused, isNewFocused, setIsNewFocused} = props
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
    const [modalOrderByVisible, setModalOrderByVisible] = useState(true);

   

    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)

    const filters = [{name:"Categories"},{name:"Price"},{name:"Etat"}, {name:"Etat"}, {name:"Etat"}, {name:"Etat"}]
    const activeFilterRef = useRef([setModalOrderByVisible, "trier"])

    const showFilters = (filter) => {
        const setter = activeFilterRef.current[0]
        const from = activeFilterRef.current[1]

        if(from != filter.toLowerCase())
        {
            switch(filter.toLowerCase())
            {
                case "categories" : setModalCategoryVisible(true); 
                    setter(false)
                    activeFilterRef.current = [setModalCategoryVisible, "categories"];
                    break;
                case "trier" : setModalOrderByVisible(true); 
                    setter(false)
                    activeFilterRef.current = [setModalOrderByVisible, "trier"];  
                break;
                case "price" : setModalPriceVisible(true);
                    setter(false)
                    activeFilterRef.current = [setModalPriceVisible, "price"]; 
                    break;
                case "etat" : setModalConditionVisible(true);  
                    setter(false)
                    activeFilterRef.current = [setModalConditionVisible, "etat"]; 
                    break;
                default :  break;
            }
        } else { setter(true); console.log("else");}
    }


    return (
        <View style={[filtersStyles.container]}>
                <View style={[filtersStyles.topContainer]}>
                    <Pressable style={[filtersStyles.trier, ]} onPress={()=>{showFilters("trier")}}>
                        <Text style={[customText.text, filtersStyles.pressableFilter, activeFilterRef.current[1]=="trier" ? filtersStyles.pressableFilterFocused : false ]}>Trier</Text>
                    </Pressable>
                    <View style={[filtersStyles.filtres]}>
                        <FlatList data={filters} keyExtractor={(item)=>Math.random().toString()} renderItem={({item}) => {return (
                            <Pressable style={[filtersStyles.pressableFilter, activeFilterRef.current[1]==item.name.toLowerCase() ? filtersStyles.pressableFilterFocused : false]} onPress={()=>{showFilters(item.name)}} >
                                <Text style={[customText.text]}>{item.name}</Text>
                            </Pressable>
                            )}}
                            ItemSeparatorComponent={(item) => {return <View style={{width:20,}}></View>}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={true}
                            contentContainerStyle={{flex:1,flexDirection:"row", padding:10}}
                        />
                    </View>
                </View>

            <View style={{width:"100%",}}>
                { modalPriceVisible &&
                <View style={[filtersStyles.priceContainer]} >
                    <View style={{height:10,}}></View>
                        
                        <View style={{alignSelf : "center",}}>
                            <Text style={filtersStyles.label}>Price</Text>
                        </View>

                        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                            <Text style={filtersStyles.label}>Prix Min.</Text>
                            <Text style={filtersStyles.label}>Prix Max.</Text>
                        </View>

                        <View style={filtersStyles.price}>
                            <View style = {[filtersStyles.minPrice]}>
                                <TextInput placeholder="Prix min."
                                    placeholderTextColor={appColors.mainColor}
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
        { modalConditionVisible &&
                    <View style={filtersStyles.conditionContainer}>
                        <View style={{alignSelf : "center",backgroundColor:appColors.white}}>
                            <Text style={[customText.text,filtersStyles.label]}>Condition</Text>
                        </View>
                        <ConditionChoice styles={{}} isNewFocused={isNewFocused} isOldFocused={isOldFocused} setIsNewFocused={setIsNewFocused} setIsOldFocused={setIsOldFocused} />
                    </View>
        }

        { modalOrderByVisible &&
            <View style={[filtersStyles.orderByContainer]}>
                <View style={{alignSelf : "center",backgroundColor:appColors.white}}>
                    <Text style={[customText.text,filtersStyles.label]}>Trier Par...</Text>
                </View>

                    <View style={[filtersStyles.flatlist, filtersStyles.radioBox]}>
                        <RadioButton.Group onValueChange={val => setSelectedOrderBy(val)} value={selectedOrderBy}>
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

        {modalCategoryVisible &&
                    <View style={filtersStyles.categoryContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Categories</Text>
                        </View>


                        <View style={filtersStyles.flatlist}>
                            <FlatList
                                data={categories}
                                renderItem={ ({item}) => { return <FilterItem selectedCategories={selectedCategories} item={item} updateCategories={updateCategories} /> } }
                                keyExtractor={ (item) => { return Math.random().toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={filtersStyles.categorySeparator}></View> }}
                                horizontal={false}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ backgroundColor:appColors.lightWhite, maxHeight : 500,  }}
                            />
                        </View>
                    </View>
        }
    </View>
    </View>


)}

export default Filters