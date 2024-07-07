import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { RadioButton, } from 'react-native-paper';
//custom component
import Product from '../common/Product';
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { radioProductsListtStyles } from '../../styles/radioProductsListStyles';
import { numProduct } from '../../styles/productStyles';
import { radioProductStyles } from '../../styles/radioProductsListStyles';
import SellerBrand from '../common/SellerBrand';
import { appColors, customText } from '../../styles/commonStyles';
//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';
import { Icon } from 'react-native-elements';
import { CustomButton } from '../common/CommonSimpleComponents'
import { CheckBox } from 'react-native-elements';

import { formatMoney } from '../../utils/commonAppFonctions';
const RadioProductsList = (props) => {
    const { item, datas  } = props;
    console.log("GGG")
console.log(datas)

    const RadioProduct = (props) => {
        const {item} = props
        let passed_sellers = []
        let passed_product = []
        console.log(item)
        //const profile = item.productDetails.images[0] || require('../../assets/images/product5.png')
        const inBasket = 3
        return (
            <View styles={[radioProductStyles.container,{}]}>       
                <RadioButton.Group onValueChange={val => {}} value={{}} style={[radioProductStyles.radioGroup,radioProductStyles.radioGroup1,]}>
                    {
                        item.productDetails.map((product1, key) => {
                               
                            return(
                            <View style={[radioProductsListtStyles.seller,{}]} key={key}>
                                { passed_sellers.includes(product1.seller) ? false :
                                    <View style={[radioProductStyles.radioContainer, radioProductStyles.radioContainer1]} >
                                        <RadioButton value={product1.id} />
                                        <SellerBrand pub={false} certified={true} username={product1.seller} /> 
                                        <Text>{/*A MODIFIER*/}</Text>
                                    </View>
                                }
                            
                        {item.productDetails.map((product2, key) => {
                             passed_sellers.push(product1.seller) 
                            if(product1.seller == product2.seller && !passed_product.includes(product2._id))
                            { 
                                passed_product.push(product2._id)
                                return(
                                    <View style={[radioProductStyles.radioProducts,{}]} key={key}>
                                            <View style={[radioProductStyles.radioContainer, radioProductStyles.radioContainer2]} >
                                                    <CheckBox title=
                                                    {
                                                        <View style={[radioProductStyles.productInfos,{}]}>
                                                        <View style={[radioProductStyles.imageContainer,{}]}>
                                                            <Image source={{uri: product2.images[0]}} style={[radioProductStyles.productImage,{}]} />
                                                        </View>
                                                        <View style={[{left : 10,}]}>
                                                            <Text style={[customText.text, ]}>{product2.seller}</Text>
                                                            <Text style={[customText.text, {color:appColors.secondaryColor3} ]}>{product2.category.replace(/\//g, ' | ')}</Text> 
                                                            <Text style={[customText.text, {top:10,fontWeight:"bold"}]}>{formatMoney(product2.price)} XAF{/* prix de la proposition ou real Price*/}</Text>
                                                            <Pressable onPress={()=>{}}>
                                                                <Icon name="trash-outline" color={appColors.black} size={18} type="ionicon" style={[{alignSelf:"flex-end"}]} />
                                                            </Pressable>
                                                        </View>
                                                    </View> 
                                                } 
                                                containerStyle={[radioProductStyles.checkBoxContainer,{}]} 
                                                textStyle={[customText.text,radioProductStyles.checkBoxText]} 
                                                checked={false} 
                                                onPress={() => {  }} 
                                            
                                                />

                                                    
                                                   
                                                </View> 
                                            {product2.inBasket>0 &&
                                                <View style={radioProductStyles.inBasket}>
                                                    <Text style={[customText.text, {fontSize:10,}]}>{`Dans le panier de ${product2.inBasket} personnes!`}</Text>
                                                </View>
                                            }
                                            <View style={{height:10,}}></View>
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

                <View style={radioProductsListtStyles.top}>
                    <FlatList
                        data={datas}
                        renderItem={ ({item}) => { return <RadioProduct item={item}  /> } }
                        keyExtractor={ (item) => { return item._id.toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[radioProductsListtStyles.flatListContainer]}
                    />
                </View>

                    <View style={radioProductsListtStyles.bottom}>
                        <View style={radioProductsListtStyles.bottomPrice}>
                            <Text style={[radioProductsListtStyles.price, {color:appColors.secondaryColor3}]}>Total : </Text>
                            <Text style={[radioProductsListtStyles.price, {fontWeight:"bold",}]}>2000 XAF</Text>
                        </View>
                        <View style={radioProductsListtStyles.buttonView}>
                            <CustomButton text="Payer" color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={()=>{}} styles={radioProductsListtStyles} />
                        </View>
                    </View>
            </View>
    )
}

export default  RadioProductsList