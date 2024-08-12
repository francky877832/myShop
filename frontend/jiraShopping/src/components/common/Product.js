import React, { useState, useMemo, useEffect, createContext, useContext, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, Pressable, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { LikeButton, } from "./CommonSimpleComponents"

import { productStyles } from '../../styles/productStyles';
import { appColors, customText } from '../../styles/commonStyles';
//import { Image } from 'expo-image';

//CONTEXTE
import { FavouritesContext } from '../../context/FavouritesContext';
import { BasketContext } from '../../context/BasketContext';
import { server } from '../../remote/server';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const username = "Franck"
const Product = (props) => { 
    const { item, horizontal, replace } = props;
    const navigation = useNavigation()
    //console.log(item)
   
//console.log(item.images[0])
    const {favourites, addFavourite, hasLiked} = useContext(FavouritesContext)
    const {basket, addBasket, isBasketPresent} = useContext(BasketContext)


    useEffect(() => {
        
    }, [])
    const [like, setLikeIcon ] = useState(item.liked)
    const [numLike, setNumLike] = useState(item.likes)

    //hasLikedItem={hasLiked(item)}
    const _handleLikePressed =  useCallback((item) => {
        setLikeIcon((liked) => {
            if(liked)
            {
                setNumLike((prevNumLike) => prevNumLike-1)
                item.likes--
            }
            else
            {
                setNumLike((prevNumLike) => prevNumLike+1)
                item.likes++
            }
            return !liked
        });  
    },[like])
    return(
            <View style={[productStyles.container, productStyles.card, horizontal ? productStyles.containerHorizontal : false]} >
                        <View style={[productStyles.top,] } >
                            <Pressable style={[productStyles.feesBy, productStyles.card]}  onPress = { ()=>{ } } >
                                <Ionicons name="cube-sharp" size={24} color={appColors.white} />
                                 <Text style={[customText.text, {color:appColors.white, fontSize:12, top:3,}]}>{item.feesBy=="seller" ? "Gratuit"  : "Reduction"} </Text>
                            </Pressable>

                            <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={hasLiked(item)} synchro={false} item={item} isCard={false} styles={{color:appColors.white}}/>

                        </View>
                    
                <Pressable style={ productStyles.pressable } onPress = { ()=>{replace ? navigation.replace("ProductDetails", {productDetails:item,}) : navigation.navigate("ProductDetails", {productDetails:item,});} } >
                    <Image source={{uri: item.images[0]}}  style={[productStyles.image, horizontal ? productStyles.imageHorizontal : false]} />
                    <View style={ productStyles.text }>
                        <View style={{ flexDirection:"column", justifyContent:"flex-start", }}>
                            <Text numberOfLines={1} style={[customText.text, productStyles.shopName]}> @{item.seller} | </Text>
                            <Text numberOfLines={2} style={[customText.text, productStyles.productName]}>{item.name}</Text>
                        </View>

                        <View style={{ }} >
                            {item.numLikes ? <Text>{item.updateLikes} Likes</Text> : <Text style={{alignSelf:"center"}}>---</Text>}
                            {item.price == item.newPrice  ? <Text style={[customText.text, productStyles.price,{fontSize:12}]}>{item.price} XAF</Text>
                                :
                                <View style={{ flexDirection:"row", justifyContent:"flex-start" }} >
                                    <Text style={[customText.text, productStyles.price, {textDecorationLine:"line-through", color:"red",fontSize:12}]}>{item.realPrice} </Text>
                                    <Text style={[customText.text, productStyles.price, {textDecorationLine:"none", color:"green", marginLeft:5,fontSize:12}]}>{item.realPrice} XAF</Text>
                                </View>
                            }
                        </View>

                       
                        <View style={[productStyles.bottom, productStyles.card, isBasketPresent(item)[0]?productStyles.isBasketPresent:false] } >
                            <Pressable onPress = { ()=>{isBasketPresent(item)[0]?navigation.navigate("Basket"):addBasket(item) } }>
                                <Text numberOfLines={1} style={[customText.text, productStyles.category, isBasketPresent(item)[0]?productStyles.isBasketPresentText:false]}>{isBasketPresent(item)[0]? "Aller Au Panier":"Ajouter Au Panier"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>
    )
}

export default React.memo(Product)
