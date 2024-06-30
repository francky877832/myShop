import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Product from './Product';
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { numProduct } from '../../styles/productStyles';

//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';

const ProductsList = (props) => {
    const { datas, horizontal, styles } = props;
    const {favourites} = useContext(FavouritesContext)


    return(
            <View style={[productsListStyles.container, horizontal ? productsListStyles.containerHorizontal : false, styles.productContainer]}>
                    <FlatList
                        data={datas}
                        renderItem={ ({item}) => { return <Product item={item} styles={productsListStyles.listItem} horizontal={horizontal}/> } }
                        keyExtractor={ (item) => { return item.id_.toString(); } }
                        horizontal={horizontal}
                        numColumns={ horizontal ? 1 : numProduct }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={horizontal}
                        contentContainerStyle={[productsListStyles.flatlist, horizontal ? productsListStyles.flatlistHorizontal : false, styles.flatlist]}
                    />
            </View>
    )
}

export default  ProductsList