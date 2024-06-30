import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import ProductsList from './ProductsList';
import Filters from './Filters';
import { preferencesStyles } from '../../styles/preferencesStyles';
import { customText, appColors, appFont } from '../../styles/commonStyles';

const ProductsListWithFilters = (props) => {
    const { datas, horizontal, title } = props;
   
    return(
            <View style={[productsListWithFiltersStyles.container]}>
                <View style={[productsListWithFiltersStyles.title]}>
                    <Text style={[productsListWithFiltersStyles.titleText]}>{title}</Text>
                </View>

                <View style={{flex:1,flexDirection:"column",}}>
                    <Filters suggestion={false} />
                    <View style={{height:10}}></View>
                    <ProductsList datas={datas} horizontal={false} styles={preferencesStyles} />
                </View>

            </View>
    )
}

export default  ProductsListWithFilters

const productsListWithFiltersStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        backgroundColor : appColors.white,
    },
    title : 
    {
        paddingVertical: 20,
        paddingLeft : 10,
        borderBottomWidth : 1,
        borderBottomColor : appColors.lightWhite,
    },
    titleText :
    {
        ...customText.text,
        fontSize : 20,
        color : appColors.clearBlack,
        fontWeight : "bold",  
    },
})