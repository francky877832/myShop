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
import { UserContext } from '../../context/UserContext';
import { server } from '../../remote/server';

import {shallowEqual, useSelector, useDispatch } from 'react-redux';
import { isProductFavourite } from '../../store/favourites/favouritesSlice';
import { addToBasket, removeFromBasket, fetchUserBasket, updateSelectedProducts, setSelectedSeller, isProductBasket, updateLocalBasket } from '../../store/baskets/basketsSlice';


const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const username = "Franck"
//const user = {_id:loggedUserId, username:loggedUser}

const Product = (props) => { 
    const { item, horizontal, replace, minified } = props;
    const navigation = useNavigation()
    const {user} = useContext(UserContext)
    const modifiedProducts = useSelector(state => state.favourites.modifiedProducts);
    const modifiedProduct = modifiedProducts.filter(product => product._id?.toString() === item._id?.toString())
    const [product, setProduct] = useState(modifiedProduct.length>0?modifiedProduct[0]:{...item})

    //console.log("*********==============={...item}")
    //console.log(product)
   
//console.log(item.images[0])
    //const {favourites, addFavourite, hasLiked} = useContext(FavouritesContext)
    //const {basket, addBasket} = useContext(BasketContext)
    
    /*const renderCount = useRef(0);
    renderCount.current += 1;
    console.log(renderCount.current)*/

    useEffect(() => {
        
    }, [])
    const dispatch = useDispatch();
    const [isFavourite, setIsFavourite] = useState(useSelector((state) => isProductFavourite(state, product._id), shallowEqual));
    const [isBasketPresent, setIsBasketPresent] = useState(useSelector((state) => isProductBasket(state, product._id), shallowEqual));
//console.log(isFavourite)
    const [like, setLikeIcon ] = useState(isFavourite)
    const [numLike, setNumLike] = useState(product.likes)
    //const numLike = useRef(product.likes)
    const timeoutRef = useRef(null);
    
    //console.log(product.comments)

/*
    useEffect(() => {
        console.log(product.likes)
        if(product._id=="668a681b25a5467dd508118c")
            console.log('State updated:', favouritesState.addLike);
    }, [numLike]);
*/

    //hasLikedItem={hasLiked(item)}

    const _handleLikePressed = useCallback(() => {
        //console.log("product.likes")
        //console.log(item.likes)
        //console.log(modifiedProduct.length>0 ? modifiedProduct[0].likes:false)
        //console.log(modifiedProduct)
        setLikeIcon(prevLike => {
            const newLike = !prevLike;
            //setNumLike(prevNumLike => newLike ? prevNumLike + 1 : prevNumLike - 1);
           // numLike.current = newLike ? numLike.current + 1 : numLike.current - 1;
            //newLike ? data.likes++ : data.likes--
            return newLike;
        })
    })

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
            setIsBasketPresent(!isBasketPresent)
            const isAdding = true
            dispatch(updateLocalBasket({product, isAdding}));
            //console.log("BASKET")
            timeoutRef.current = setTimeout(() => {
                dispatch(addToBasket({product, user})); 
            }, 1000)
        }


        // Configurer un nouveau timeout
       
    }//,[timeoutRef, isBasketPresent, navigation])


    const handlePress = () => {
        /*
        console.log("favouritesState.addLike")
        console.log(favouritesState.addLike)
        */
        if (replace) {
          navigation.replace({name:"ProductDetails", params:{ productDetails: product, },  key: Date.now().toString()});
        } else {
          navigation.navigate({name:"ProductDetails", params:{ productDetails: product, },  key: Date.now().toString()});
        }
      }//,[navigation]);
      
if(minified)
{
    return (
        <View>
            <Text>OK</Text>
        </View>
   )
}
else
{
    return(
                <View style={[productStyles.container, productStyles.card, horizontal ? productStyles.containerHorizontal : false]} >
                            <View style={[productStyles.top,] } >
                                <Pressable style={[productStyles.feesBy, productStyles.card]}  onPress = { ()=>{ } } >
                                    <Ionicons name="cube-sharp" size={24} color={appColors.white} />
                                    <Text style={[customText.text, {color:appColors.white, fontSize:12, top:3,}]}>{product.feesBy=="seller" ? "Gratuit"  : "Reduction"} </Text>
                                </Pressable>

                                <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={like} user={user}  synchro={false} item={product} isCard={false} styles={{color:appColors.white}}/>

                            </View>
                        
                    <Pressable style={ productStyles.pressable } onPress = {handlePress} >
                        <Image source={{uri: product.images[0]}}  style={[productStyles.image, horizontal ? productStyles.imageHorizontal : false]} />
                        <View style={ productStyles.text }>
                            <View style={{ flexDirection:"column", justifyContent:"flex-start", }}>
                                <Text numberOfLines={1} style={[customText.text, productStyles.shopName]}> @{product.seller.username} | </Text>
                                <Text numberOfLines={2} style={[customText.text, productStyles.productName]}>{product.name}</Text>
                            </View>

                            <View style={{ }} >
                                {product.numLikes ? <Text>{product.updateLikes} Likes</Text> : <Text style={{alignSelf:"center"}}>---</Text>}
                                {product.price == product.newPrice  ? <Text style={[customText.text, productStyles.price,{fontSize:12}]}>{product.price} XAF</Text>
                                    :
                                    <View style={{ flexDirection:"row", justifyContent:"flex-start" }} >
                                        <Text style={[customText.text, productStyles.price, {textDecorationLine:"line-through", color:"red",fontSize:12}]}>{product.realPrice} </Text>
                                        <Text style={[customText.text, productStyles.price, {textDecorationLine:"none", color:"green", marginLeft:5,fontSize:12}]}>{product.realPrice} XAF</Text>
                                    </View>
                                }
                            </View>

                        
                            <View style={[productStyles.bottom, productStyles.card, isBasketPresent?productStyles.isBasketPresent:false] } >
                                <Pressable onPress = { ()=>{handleBasketPressed(product) } }>
                                    <Text numberOfLines={1} style={[customText.text, productStyles.category, isBasketPresent?productStyles.isBasketPresentText:false]}>{isBasketPresent? "Aller Au Panier":"Ajouter Au Panier"}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Pressable>
                </View>
        )
}
}

export default React.memo(Product)
