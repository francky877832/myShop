import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, } from 'react-native';

//custom component
import ProductsList from './ProductsList';
import Filters from './Filters';
import { preferencesStyles } from '../../styles/preferencesStyles';
import { customText, appColors, appFont } from '../../styles/commonStyles';

const ProductsListWithFilters = React.forwardRef((props, ref) => {
    const { datas, horizontal, title, onEndReached, filters, name, searchText, isLoading} = props;
   
    return(
            <View style={[productsListWithFiltersStyles.container]}>
                {title &&
                    <View style={[productsListWithFiltersStyles.title,{paddingVertical:10,}]}>
                        <Text style={[productsListWithFiltersStyles.titleText,{fontSize:16}]} numberOfLines={2}>{title}</Text>
                    </View>
                }

                <View style={{flex:1,flexDirection:"column",}}>
                    {filters &&
                        <Filters suggestion={false} searchText={searchText} />
                    }
                    <ProductsList name={name} isLoading={isLoading} onEndReached={onEndReached} ref={ref} datas={datas} horizontal={false} styles={preferencesStyles} />
                </View>

            </View>
    )
})

export default  ProductsListWithFilters

const productsListWithFiltersStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        backgroundColor : appColors.white,
    },
    title : 
    {
        paddingVertical: 5,
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