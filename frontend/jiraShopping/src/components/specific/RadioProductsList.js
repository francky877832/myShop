import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { RadioButton

 } from 'react-native-paper';
//custom component
import Product from '../common/Product';
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { radioProductsListtStyles } from '../../styles/radioProductsListStyles';
import { numProduct } from '../../styles/productStyles';
import { radioProductStyles } from '../../styles/radioProductsListStyles';
import SellerBrand from '../common/SellerBrand';

//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';

const RadioProductsList = (props) => {
    const { item, datas  } = props;



    const RadioProduct = (props) => {
        const {item} = props
        console.log(item.products)
        let passed_sellers = []
        let passed_product = []
        return (
            <View styles={[radioProductStyles.container,{}]}>       
                <RadioButton.Group onValueChange={val => {}} value={{}} style={[radioProductStyles.radioGroup,]}>
                    {
                        item.products.map((product1) => {
                               
                            return(
                            <View>
                                { passed_sellers.includes(product1.seller) ? false :
                                    <View style={radioProductStyles.radioContainer} >
                                        <RadioButton value={product1.id} />
                                        <Text>{product1.seller}--</Text> 
                                    </View>
                                }
                            
                        {item.products.map((product2) => {
                             passed_sellers.push(product1.seller) 
                            if(product1.seller == product2.seller && !passed_product.includes(product2.id_))
                            { 
                                passed_product.push(product2.id_)
                                return(
                                    <View>
                                        <RadioButton.Group onValueChange={val => {}} value={{}} style={[radioProductStyles.radioGroup,]}>
                                            <View style={radioProductStyles.radioContainer} >
                                                <RadioButton value={product2.id} />
                                                <Text>{product2.seller}</Text> 
                                            </View>
                                        </RadioButton.Group>
                                    </View>
                                )
                            }
                        })
                    }
                    </View>)
                })
                }                        
                
                
                </RadioButton.Group>
            </View>
        )
    }

    return(
            <View style={[radioProductsListtStyles.container,]}>
                    <FlatList
                        data={datas}
                        renderItem={ ({item}) => { return <RadioProduct item={item}  /> } }
                        keyExtractor={ (item) => { return item.id_.toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[]}
                    />
            </View>
    )
}

export default  RadioProductsList