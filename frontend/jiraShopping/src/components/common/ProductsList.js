import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Product from './Product';
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { numProduct } from '../../styles/productStyles';

//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';

import { server } from '../../remote/server';

const ProductsList = React.forwardRef((props, ref) => {
    const { datas, horizontal, styles, onEndReached, name } = props;
    const {favourites} = useContext(FavouritesContext)
    //console.log(datas[0].product)
    useEffect(()=>{

    }, [])


    return(
            <View style={[productsListStyles.container, horizontal ? productsListStyles.containerHorizontal : false, styles.productContainer]}>
                    <FlatList
                        data={datas}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return <Product name={name} item={item} styles={productsListStyles.listItem} horizontal={horizontal}/> } }
                        keyExtractor={ (item) => { return item._id.toString(); } }
                        horizontal={horizontal}
                        numColumns={ horizontal ? 1 : numProduct }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={horizontal}
                        contentContainerStyle={[productsListStyles.flatlist, horizontal ? productsListStyles.flatlistHorizontal : false, styles.flatlist]}
                        ref={ref}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.75}
                    />
            </View>
    )
})

export default  ProductsList