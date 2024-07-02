import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { LikeButton, } from "./CommonSimpleComponents"

import { productStyles } from '../../styles/productStyles';
import { appColors, customText } from '../../styles/commonStyles';


//CONTEXTE
import { FavouritesContext } from '../../context/FavouritesContext';

const username = "Franck"
const Product = (props) => { 
    const { item, horizontal, navigation } = props;
    //console.log(item)
   

    const {favourites, addFavourite} = useContext(FavouritesContext)
    useEffect(() => {
    //prendre en compte le contexte Favourites lors de l'affichage
        const setProductFavourite = () =>{
            for(let i in favourites)
            {
                console.log(favourites[i].id_)
                if(favourites[i].id_ == item.id_) //A modifier par _id de  mongo
                    item.liked = favourites[i].liked //parce que favourites contien les elements likes et delikes et non item.liked=true--obselete
            }
        }; setProductFavourite();
    })
    const [like, setLikeIcon ] = useState(item.liked)

    return(
            <View style={[productStyles.container, productStyles.card, horizontal ? productStyles.containerHorizontal : false]} >
                <Pressable style={ productStyles.pressable } onPress = { ()=>{ navigation.navigate("ProductDetails")} } >
                    <Image source={require('../../assets/images/product5.png')}  style={[productStyles.image, horizontal ? productStyles.imageHorizontal : false]} />
                    <View style={ productStyles.text } >
                        <View style={{ flexDirection:"column", justifyContent:"flex-start", }} >
                            <Text numberOfLines={1} style={[customText.text, productStyles.shopName]}> @{item.username} | </Text>
                            <Text numberOfLines={2} style={[customText.text, productStyles.productName]}>Iphone 6 Telephone neuf</Text>
                        </View>

                        <View style={{ }} >
                            {item.numLikes ? <Text>{item.updateLikes} Likes</Text> : <Text style={{alignSelf:"center"}}>---</Text>}
                            {item.price == item.newPrice  ? <Text style={[customText.text, productStyles.price,{fontSize:12}]}>{item.realPrice} XAF</Text>
                                :
                                <View style={{ flexDirection:"row", justifyContent:"flex-start" }} >
                                    <Text style={[customText.text, productStyles.price, {textDecorationLine:"line-through", color:"red",fontSize:12}]}>{item.realPrice} </Text>
                                    <Text style={[customText.text, productStyles.price, {textDecorationLine:"none", color:"green", marginLeft:5,fontSize:12}]}>{item.realPrice} XAF</Text>
                                </View>
                            }
                        </View>

                        <View style={[productStyles.top,] } >
                            <Pressable style={[productStyles.feesBy, productStyles.card]}  onPress = { ()=>{ console.log("transport")} } >
                                <Ionicons name="cube-sharp" size={24} color="#fff" />
                                 <Text style={[customText.text, {color:appColors.white, fontSize:12, top:3,}]}>{item.feesBy ? "Gratuit"  : "Reduction"} </Text>
                            </Pressable>

                            <LikeButton hasLiked={item.liked} item={item} isCard={false} styles={{color:appColors.white}}/>

                        </View>
                    
                        <View style={[productStyles.bottom, productStyles.card] } >
                            <Pressable onPress = { ()=>{ console.log("transport")} } >
                                <Text numberOfLines={1} style={[customText.text, productStyles.category]}>Ajouter Au Panier</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>
    )
}

export default Product
