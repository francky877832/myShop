import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { CheckBox } from 'react-native-elements';


import { appColors, appFont } from '../../styles/commonStyles';
import { filtersStyles } from '../../styles/filtersStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';
import FilterItem from './FilterItem';

const Filters = (props) => {

    const {selectedCategories, updateCategories, isOldFocused, setIsOldFocused, isNewFocused, setIsNewFocused} = props


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

    const filters = [{name:"Categories"},{name:"Price"},{name:"Etat"}, {name:"Etat"}, {name:"Etat"}, {name:"Etat"}]


    const [modalPriceVisible, setModalPriceVisible] = useState(false);
    const [modalConditionVisible, setModalConditionVisible] = useState(false);
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)

    return (
        <View style={[filtersStyles.container]}>
                <View style={[filtersStyles.topContainer]}>
                    <Pressable style={[filtersStyles.trier]} onPress={()=>{setModalCategoryVisible(!modalCategoryVisible)}}>
                        <Text style={[customText.text, filtersStyles.pressableFilter]}>Trier</Text>
                        </Pressable>
                    <View style={[filtersStyles.filtres]}>
                        <FlatList data={filters} keyExtractor={(item)=>Math.random().toString()} renderItem={({item}) => {return (
                            <Pressable style={[filtersStyles.pressableFilter]} onPress={()=>{setModalCategoryVisible(!modalCategoryVisible)}} >
                                <Text style={[customText.text]}>{item.name}</Text>
                            </Pressable>
                            )}}
                            ItemSeparatorComponent={(item) => {return <View style={{width:20,}}></View>}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{flex:1,flexDirection:"row", padding:10}}
                        />
                    </View>
                </View>

            <ScrollView style={[{flex:1}]}>
                { modalPriceVisible &&
                <View style={[filtersStyles.priceModal]} >
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
                                    onChangeText={(text) => {console.log(text)}}
                                />
                            </View>

                        <Text>-</Text>

                        <View style = {[filtersStyles.maxPrice]}>
                            <TextInput placeholder="Prix max."
                                placeholderTextColor={appColors.mainColor}
                                style = {[filtersStyles.input, isMaxPriceFocused && filtersStyles.inputFocused]}
                                onFocus={() => setIsMaxPriceFocused(true)}
                                onBlur={() => setIsMaxPriceFocused(false)}
                                onChangeText={(text) => {console.log(text)}}
                            />
                        </View>
                    </View>
                </View>
            }
        { modalConditionVisible &&
                    <View style={filtersStyles.conditionContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={filtersStyles.label}>Condition</Text>
                        </View>
                        <ConditionChoice styles={{}} isNewFocused={isNewFocused} isOldFocused={isOldFocused} setIsNewFocused={setIsNewFocused} setIsOldFocused={setIsOldFocused} />
                    </View>
        }

        {modalCategoryVisible &&
                    <View style={filtersStyles.categoryContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={filtersStyles.label}>Categories</Text>
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
    </ScrollView>
    </View>


)}

export default Filters