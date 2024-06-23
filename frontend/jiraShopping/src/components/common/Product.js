import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { productStyles } from '../../styles/productStyles';

const Product = (props) => {
    const { item } = props.details;
    console.log(item)
    const [like, setLikeIcon ] = useState(item.liked)
    return(

        <SafeAreaView>
            <View style={[productStyles.container, productStyles.card]} >
                <Pressable style={ productStyles.pressable } onPress = { ()=>{ console.log("product")} } >
                    <Image source={require('../../assets/images/product5.png')}  style={productStyles.image} />
                    <View style={ productStyles.text } >
                        <View style={{ flexDirection:"column", justifyContent:"flex-start", }} >
                            <Text numberOfLines={1} style={productStyles.shopName}> @{item.username} | </Text>
                            <Text numberOfLines={2} style={productStyles.productName}>Iphone 6 Telephone neuf</Text>
                        </View>

                        <View style={{ }} >
                            {item.numLikes ? <Text>{item.updateLikes} Likes</Text> : <Text style={{alignSelf:"center"}}>---</Text>}
                            {item.price == item.newPrice  ? <Text style={productStyles.price}>{item.realPrice} XAF</Text>
                                :
                                <View style={{ flexDirection:"row", justifyContent:"flex-start" }} >
                                    <Text style={[productStyles.price, {textDecorationLine:"line-through", color:"red",}]}>{item.realPrice} </Text>
                                    <Text style={[productStyles.price, {textDecorationLine:"none", color:"green", marginLeft:5,}]}>{item.realPrice} XAF</Text>
                                </View>
                            }
                        </View>

                        <View style={[productStyles.top,] } >
                            <Pressable style={[productStyles.feesBy, productStyles.card]}  onPress = { ()=>{ console.log("transport")} } >
                                <Ionicons name="cube-sharp" size={24} color="#fff" />
                                 <Text style={{color:"#fff", fontSize:12, top:3,}}>{item.feesBy ? "Gratuit"  : "Reduction"} </Text>
                            </Pressable>

                            <Pressable style={[productStyles.likeIcon, productStyles.card]} onPress = { ()=>{ console.log("likes"); setLikeIcon(like ? false : true)} }>
                                {like ? <Ionicons name="heart-outline" size={24} color="#fff" /> : <Ionicons name="heart-sharp" size={24} color="#fff" />}
                            </Pressable>
                        </View>
                    
                        <View style={[productStyles.bottom, productStyles.card] } >
                            <Pressable onPress = { ()=>{ console.log("transport")} } >
                                <Text numberOfLines={1} style={productStyles.category}>Ajouter Au Panier</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default Product
