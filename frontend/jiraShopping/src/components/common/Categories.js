import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


import { Input } from 'react-native-elements';



import { appColors, customText } from '../../styles/commonStyles';
import { categoriesStyles } from '../../styles/categoriesStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { CustomButton } from "./CommonSimpleComponents"

import { Icon } from 'react-native-elements';

import { formatMoney } from '../../utils/commonAppFonctions';
import { ProductItemContext } from '../../context/ProductItemContext';

const Categories = (props) => {
    const { params } = props.route

    const {selectedCategories, updateSelectedCategory, setSelectedBrand, selectedColor, setSelectedColor} = useContext(ProductItemContext)
    const navigation = useNavigation()


    //Appel side effect pour recuperer les cat, marque et couleur de la BD
    const categories = [
        {
            id_ : 1,
            no : 0,
            name : "Vetements",
            icon : "ionicon/shirt-outline",
            subCategories : ["Hommes", "Femmes", "Mixte", "Autres"],
        },
        {
            id_ : 2,
            no : 1,
            name : "Electronique",
            icon : "ionicon/phone-portrait-outline",
            subCategories : ["Telephone", "Ordinateur", "Tablette", "Autres"],
        },
    ]
    const brands = [{id_:1, name:"Tecno"}, {id_:2, name:"Samsung"},]
    const colors = [{id_:1, name:"green"}, {id_:2, name:"red"}, {id_:3, name:"blue"},{id_:4, name:"green"}, {id_:6, name:"red"}, {id_:7, name:"blue"}]

//UCFIRST
    const capitalizeFirstLetter = str => str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : str;

    const Category = (props) => {
    const { item, selectedCategories, updateSelectedCategory } = props
    return(
        <View style={[categoriesStyles.categoryContainer]}>
            <Pressable style={[categoriesStyles.pressableCat]} onPress={()=>{updateSelectedCategory(item.id_)}}>
                <Icon name={item.icon.split("/")[1]} type={item.icon.split("/")[0]} color={selectedCategories[item.id_]  ? appColors.secondaryColor1 : appColors.secondaryColor4} />
                <Text style={[customText.text, {color:selectedCategories[item.id]  ? appColors.secondaryColor1 : appColors.secondaryColor4} ]}>{item.name}</Text>
            </Pressable>
            {
                selectedCategories[item.id_] &&
               
                <View style={[categoriesStyles.subCategoryContainer, {position:"absolute",top:-item.no*100,left:100,}]}>
                     {
                        item.subCategories.map((cat, index) => {
                            return (
                                    <Pressable key={index} style={[categoriesStyles.pressableSubCat]} onPress={()=>{updateSelectedCategory(item.id_, cat); navigation.goBack();}}>
                                        <Text>{cat}</Text>
                                    </Pressable>
                            )
                        })
                    }
                </View>
              
            }
       </View>
    )
}


    return(
        <View style={[categoriesStyles.container]}>

        {
            params.datas.page=="category" &&
            <View style={[categoriesStyles.brandContainer]}>
                <FlatList
                        data={categories}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return <Category item={item} selectedCategories={selectedCategories} updateSelectedCategory={updateSelectedCategory} /> } }
                        keyExtractor={ (item) => { return item.id_.toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[categoriesStyles.flatlist,]}
                    />
            </View>
        }

{
            params.datas.page=="brand" &&
            <View style={[categoriesStyles.categoriesContainer]}>
                <FlatList
                        data={brands}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return (
                            <View style={{flex:1}}>
                                <Pressable style={[categoriesStyles.pressableSubCat]} onPress={()=>{setSelectedBrand(item.name);navigation.goBack();}}>
                                    <Text style={[addProductStyles.normalText,]}>{item.name}</Text>
                                 </Pressable>
                            </View>
                            )
                        } }
                        keyExtractor={ (item) => { return item.id_.toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[categoriesStyles.flatlist,]}
                    />
            </View>
        }

{
            params.datas.page=="color" &&
            <View style={[categoriesStyles.colorContainer,{}]}>
                <FlatList
                        data={colors}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return (
                            <View style={{}}>
                                <Pressable style={[categoriesStyles.pressableColor,]} onPress={()=>{setSelectedColor(item.name);navigation.goBack();}}>
                                    <View style={[{width:50,height:50,borderRadius:25,backgroundColor:item.name,}]}></View>
                                    <Text style={[addProductStyles.normalText,]}>{capitalizeFirstLetter(item.name)}</Text>
                                 </Pressable>
                            </View>
                            )
                        } }
                        keyExtractor={ (item) => { return item.id_.toString(); } }
                        horizontal={false}
                        numColumns={ 5 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[{}]}
                    />
            </View>
        }
        </View>
    )
}

export default Categories
    