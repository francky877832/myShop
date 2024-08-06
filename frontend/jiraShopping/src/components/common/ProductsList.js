import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';

//custom component
import Product from './Product';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'

//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { numProduct } from '../../styles/productStyles';

//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';
import { ProductContext } from '../../context/ProductContext';

import { server } from '../../remote/server';
import { appColors } from '../../styles/commonStyles';

const ProductsList = React.forwardRef((props, ref) => {
    const { datas, horizontal, styles, onEndReached, onScroll, name, isLoading, replace, hasMore, onEndReachedThreshold} = props;
    //console.log(datas[0].product)
    
    useEffect(()=>{
        console.log(onEndReachedThreshold)
    }, [])


    return(
            <View style={[productsListStyles.container, horizontal ? productsListStyles.containerHorizontal : false, styles.productContainer]}>
                    <FlatList
                        data={datas}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return <Product name={name} item={item} replace={replace} styles={productsListStyles.listItem} horizontal={horizontal}/> } }
                        keyExtractor={ (item) => { return Math.random().toString(); } }
                        horizontal={horizontal}
                        numColumns={ horizontal ? 1 : numProduct }
                        ItemSeparatorComponent={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={horizontal}
                        contentContainerStyle={[productsListStyles.flatlist, horizontal ? productsListStyles.flatlistHorizontal : false, styles.flatlist]}
                        ref={ref}
                        onEndReached={()=>{onEndReached()}}
                        onEndReachedThreshold={onEndReachedThreshold}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={appColors.secondaryColor1} /> : null}
                    />
                    {/*isLoading && 
                        <CustomActivityIndicator styles={{}} /> 
                        */
                    }
            </View>
    )
})

export default  React.memo(ProductsList)