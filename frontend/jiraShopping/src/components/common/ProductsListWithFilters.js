import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

//custom component
import ProductsList from './ProductsList';
import Filters from './Filters';
import { preferencesStyles } from '../../styles/preferencesStyles';
import { customText, appColors, appFont } from '../../styles/commonStyles';

import { FilterContext } from '../../context/FilterContext';

const ProductsListWithFilters = React.forwardRef((props, ref) => {
    const { datas, horizontal, title, onEndReached, onEndReachedThreshold, onScroll, filters, notDisplayFilters, name, searchText, isLoading, 
        getDatas, display, onExit, setOnExit, minified
    } = props;
    //const {selectedCategories} = useContext(FilterContext)

    return(
            <View style={[productsListWithFiltersStyles.container]}>
                {/*
                title && !!searchText && display!="category" &&
                    <View style={[productsListWithFiltersStyles.title,{paddingVertical:10,}]}>
                        <Text style={[productsListWithFiltersStyles.titleText,{fontSize:16}]} numberOfLines={2}>{title}</Text>
                    </View>
                    */
                }
                
                            {/*
                                display=="category" && Object.keys(selectedCategories).length>0
                                ?
                                    <View style={[productsListWithFiltersStyles.title,{paddingVertical:10,}]}>
                                        <Text style={[productsListWithFiltersStyles.titleText,{fontSize:16}]} >
                                                {!selectedCategories.subCategories ? selectedCategories.name:selectedCategories.name+"/"+selectedCategories.subCategories}
                                        </Text>
                                    </View>
                                :
                                    title &&
                                        <View style={[productsListWithFiltersStyles.title,{paddingVertical:10,}]}>
                                            <Text style={[productsListWithFiltersStyles.titleText,{fontSize:16}]} numberOfLines={2}>{title}</Text>
                                        </View>
                            */
                            }
                               

                <View style={{flex:1,flexDirection:"column",}}>
                    {filters &&
                        <Filters  onExit={onExit} setOnExit={setOnExit} getDatas={getDatas} notDisplayFilters={notDisplayFilters || {}} suggestion={false} searchText={searchText} display={display}/>
                    }
                        <ProductsList minified={minified} name={name} onScroll={onScroll || function(){}} isLoading={isLoading} onEndReached={onEndReached||function(){}} onEndReachedThreshold={onEndReachedThreshold} ref={ref} datas={datas} horizontal={false} styles={preferencesStyles} />
                </View>

            </View>
    )
})

export default  React.memo(ProductsListWithFilters)

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