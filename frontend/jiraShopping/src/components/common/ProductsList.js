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
    const { datas, horizontal, styles, onEndReached } = props;
    const {favourites} = useContext(FavouritesContext)
    const [products, setProducts] = useState([])

const getProducts = async ()=> {
    try
    {
        const response = await fetch(`${server}/api/datas/products/get`,{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
            });
            const responseJson = await response.json();
            setProducts(responseJson)
    } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
        getProducts()
        //console.log(products)

},[])


    return(
            <View style={[productsListStyles.container, horizontal ? productsListStyles.containerHorizontal : false, styles.productContainer]}>
                    <FlatList
                        data={products}
                        nestedScrollEnabled={true}
                        renderItem={ ({item}) => { return <Product item={item} styles={productsListStyles.listItem} horizontal={horizontal}/> } }
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