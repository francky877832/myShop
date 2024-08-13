import React, { useState, useMemo, useEffect, createContext, useContext, useCallback, useRef} from 'react';
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

import {shallowEqual, useSelector, useDispatch } from 'react-redux';
import { isProductFavourite } from '../../store/favourites/favouritesSlice';
import { addToBasket, removeFromBasket, fetchUserBasket, updateSelectedProducts, setSelectedSeller, isProductBasket, updateLocalBasket } from '../../store/baskets/basketsSlice';


const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const username = "Franck"
const user = {_id:loggedUserId, username:loggedUser}

const Product = (props) => { 
    const { item, horizontal, replace } = props;
    const navigation = useNavigation()
    //console.log(item)
   
//console.log(item.images[0])
    //const {favourites, addFavourite, hasLiked} = useContext(FavouritesContext)
    //const {basket, addBasket} = useContext(BasketContext)
    
    /*const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(renderCount.current)*/

    useEffect(() => {
        
    }, [])
    const dispatch = useDispatch();
    const isFavourite = useSelector((state) => isProductFavourite(state, item._id), shallowEqual);
    const isBasketPresent = useSelector((state) => isProductBasket(state, item._id), shallowEqual);
//console.log(isFavourite)
    const [like, setLikeIcon ] = useState(isFavourite)
    const [numLike, setNumLike] = useState(item.likes)
    const timeoutRef = useRef(null);

    //hasLikedItem={hasLiked(item)}

    const _handleLikePressed = () => {
        setLikeIcon(prevLike => {
            const newLike = !prevLike;
            setNumLike(prevNumLike => newLike ? prevNumLike + 1 : prevNumLike - 1);
            return newLike;
        });
    }


    const handleBasketPressed = (product) => {
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        if(isBasketPresent)
        {
            navigation.navigate("Basket")
        }
        else
        {
            dispatch(updateLocalBasket({product:product, isAdding:true}));
        }


        // Configurer un nouveau timeout
       timeoutRef.current = setTimeout(() => {
        //console.log(isBasketPresent)
            if(isBasketPresent)
            {
                dispatch(addToBasket({product:product, user:user})); 
            }
            
        }, 1000)
    }//,[timeoutRef, isBasketPresent, navigation])
    

    const handlePress = () => {
        if (replace) {
          navigation.replace("ProductDetails", { productDetails: item });
        } else {
          navigation.navigate("ProductDetails", { productDetails: item });
        }
      }//,[navigation]);
      
    return(
            <View style={[productStyles.container, productStyles.card, horizontal ? productStyles.containerHorizontal : false]} >
                        <View style={[productStyles.top,] } >
                            <Pressable style={[productStyles.feesBy, productStyles.card]}  onPress = { ()=>{ } } >
                                <Ionicons name="cube-sharp" size={24} color={appColors.white} />
                                 <Text style={[customText.text, {color:appColors.white, fontSize:12, top:3,}]}>{item.feesBy=="seller" ? "Gratuit"  : "Reduction"} </Text>
                            </Pressable>

                            <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={like} synchro={false} item={item} isCard={false} styles={{color:appColors.white}}/>

                        </View>
                    
                <Pressable style={ productStyles.pressable } onPress = {handlePress} >
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

                       
                        <View style={[productStyles.bottom, productStyles.card, isBasketPresent?productStyles.isBasketPresent:false] } >
                            <Pressable onPress = { ()=>{isBasketPresent?navigation.navigate("Basket"):handleBasketPressed(item) } }>
                                <Text numberOfLines={1} style={[customText.text, productStyles.category, isBasketPresent?productStyles.isBasketPresentText:false]}>{isBasketPresent? "Aller Au Panier":"Ajouter Au Panier"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            </View>
    )
}

export default React.memo(Product)
