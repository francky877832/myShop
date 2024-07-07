import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal, Dimensions } from 'react-native';

import { CheckBox } from 'react-native-elements';


import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';
import { ProductItemContext } from '../../context/ProductItemContext';
import { FilterContext } from '../../context/FilterContext';

const FilterItem = (props) => {
    const { item, tag } = props
    
    const { updateCategories, selectedCategories, selectedBrands, updateSelectedBrands  } = useContext(FilterContext)
      
     //console.log(tag)
        if(tag=="category")
        {
        
            return(

                    <View style={[filterItemStyles.container,{}]} >
                        <View style={[filterItemStyles.title]}>
                            <Text style={[customText.text, {fontWeight:"bold",}]}>{item.name}</Text>
                        </View>
                        {
                            item.subCategories.map((it, index) =>{
                                return(
                                <View style={filterItemStyles.checkBox} key={index}>
                                    <CheckBox title={it.name} containerStyle={[filterItemStyles.contentContainer,{}]} textStyle={[customText.text,filterItemStyles.checkBoxText]} checked={selectedCategories[item.name+"/"+it.name]} onPress={() => { updateCategories(item.name+"/"+it.name);  }} />
                                </View>
                            )})
                        }
                    </View>
            )
        }
        else if(tag=="brand")
        {
            return(
                <View style={[filterItemStyles.container,{}]} >
                    <View style={[filterItemStyles.title]}>
                    <CheckBox title={item.name} containerStyle={[filterItemStyles.contentContainer,{}]} textStyle={[customText.text,filterItemStyles.checkBoxText]} checked={selectedBrands[item.name]} onPress={() => { updateSelectedBrands(item.name);  }} />
                    </View>
                </View>
            )
        }
}

const filterItemStyles =  StyleSheet.create({
    container :
    {
        flex:1, 
        backgroundColor:appColors.white,
        paddingTop : 10,
    },
    checkBox :
    {
        width : screenWidth/2.5,
        paddingLeft : 20
    },
    contentContainer :
    {
        borderWidth:0, 
        margin:1,
        padding:0, 
        backgroundColor:appColors.white,
    },

    title :
    {
        paddingLeft : 20,
        paddingBottom : 5,
    },
    checkBoxText :
    {
        marginLeft:0,
        color:appColors.secondaryColor5,
        fontWeight:"normal",
    },


})

export default FilterItem