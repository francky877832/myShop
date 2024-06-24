import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Product from './Product';
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { numProduct } from '../../styles/productStyles';




const ProductsList = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                            console.log(props)
                            
*/}

    const { datas } = props;

    return(
            <View style={productsListStyles.container}>
                <View style={productsListStyles.productList}>
                    <FlatList
                        data={datas}
                        renderItem={ (item) => { return <Product details={item} style={productsListStyles.listItem} /> } }
                        keyExtractor={ (item) => { return item.id_.toString(); } }
                        horizontal={false}
                        numColumns={ numProduct }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={productsListStyles.flatlist}
                    />
                </View>
                        <View>
                            <Text>Ok</Text>
                        </View>
                </View>
    )
}

export default  ProductsList