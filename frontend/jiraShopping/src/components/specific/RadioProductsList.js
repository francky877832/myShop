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

const RadioProductsList = (props) => {
    const { item, datas  } = props;


    const RadioProduct = (props) => {
        const {item} = props
        let passed_sellers = []
        let passed_product = []
        const profile = item.pp || require('../../assets/images/product5.png')
        const inBasket = 3
        return (
            <View styles={[radioProductStyles.container,{}]}>       
                <RadioButton.Group onValueChange={val => {}} value={{}} style={[radioProductStyles.radioGroup,radioProductStyles.radioGroup1,]}>
                    {
                        item.products.map((product1) => {
                               
                            return(
                            <View style={[radioProductsListtStyles.seller,{}]}>
                                { passed_sellers.includes(product1.seller) ? false :
                                    <View style={[radioProductStyles.radioContainer, radioProductStyles.radioContainer1]} >
                                        <RadioButton value={product1.id} />
                                        <SellerBrand pub={false} certified={true} />
                                    </View>
                                }
                            
                        {item.products.map((product2) => {
                             passed_sellers.push(product1.seller) 
                            if(product1.seller == product2.seller && !passed_product.includes(product2.id_))
                            { 
                                passed_product.push(product2.id_)
                                return(
                                    <View style={[radioProductStyles.radioProducts,{}]}>
                                            <View style={[radioProductStyles.radioContainer, radioProductStyles.radioContainer2]} >
                                                    <CheckBox title=
                                                    {
                                                        <View style={[radioProductStyles.productInfos,{}]}>
                                                        <View style={[radioProductStyles.imageContainer,{}]}>
                                                            <Image source={profile} style={[radioProductStyles.productImage,{}]} />
                                                        </View>
                                                        <View style={[{left : 10,}]}>
                                                            <Text style={[customText.text, ]}>{product2.seller}</Text>
                                                            <Text style={[customText.text, {color:appColors.secondaryColor3} ]}>{product2.seller} . Category</Text> 
                                                            <Text style={[customText.text, {top:10,fontWeight:"bold"}]}>{product2.realPrice} XAF{/* prix de la proposition ou real Price*/}</Text>
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
                                            <View style={radioProductStyles.inBasket}>
                                                <Text style={[customText.text, {fontSize:10,}]}>{inBasket? `Dans le panier de ${inBasket} personnes!`:flase}</Text>
                                            </View>
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
                        keyExtractor={ (item) => { return item.id_.toString(); } }
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