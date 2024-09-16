import React, { useState, useMemo, useEffect, createContext, useContext, useCallback, useRef} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, Pressable, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { LikeButton, } from "./CommonSimpleComponents"
import BadgeIcon from './BadgeIcon';

import { productStyles } from '../../styles/productStyles';
import { appColors, customText } from '../../styles/commonStyles';
//import { Image } from 'expo-image';

import { capitalizeFirstLetter, formatMoney } from '../../utils/commonAppFonctions'
//CONTEXTE
import { FavouritesContext } from '../../context/FavouritesContext';
import { BasketContext } from '../../context/BasketContext';
import { UserContext } from '../../context/UserContext';
import { server } from '../../remote/server';

import {shallowEqual, useSelector, useDispatch } from 'react-redux';
import { isProductFavourite } from '../../store/favourites/favouritesSlice';
import { addToBasket, removeFromBasket, fetchUserBasket, updateSelectedProducts, setSelectedSeller, isProductBasket, updateLocalBasket } from '../../store/baskets/basketsSlice';
import { Icon } from 'react-native-elements';
import { ProductContext } from '../../context/ProductContext';
import { addModifiedProduct } from '../../store/favourites/favouritesSlice';

import { productsImagesPath } from '../../remote/server';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const username = "Franck"
//const user = {_id:loggedUserId, username:loggedUser}

const Product = (props) => { 
    const { item, horizontal, replace, minified, updateProfileLike, origin} = props;
    const navigation = useNavigation()
    const {user} = useContext(UserContext)
    const modifiedProducts = useSelector(state => state.favourites.modifiedProducts);
    const modifiedProduct = modifiedProducts.filter(product => product._id?.toString() === item._id?.toString())
    const [product, setProduct] = useState(modifiedProduct.length>0?modifiedProduct[0]:{...item})

    const {productHasBeenSold} = useContext(ProductContext)

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
    const [forceUpdate, setForceUpdate] = useState(false)

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
            //newLike ? data.likes++ : data.likes--
            return newLike;
        })

            /*if(typeof updateProfileLike === 'function') 
            {
               like ? updateProfileLike(preLikes=>preLikes+1) : updateProfileLike(preLikes=>preLikes-1)
             }*/
    })

    const handleBasketPressed = (product) => {
        
        
        if(isBasketPresent)
        {
            navigation.navigate("Basket")
        }
        else
        {
            setIsBasketPresent(!isBasketPresent)
            const isAdding = true
            
            //console.log("BASKET")
            
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                dispatch(updateLocalBasket({product, isAdding}));
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
        if (replace) {//replace for ...?
          navigation.replace({name:"ProductDetails", params:{ productDetails: product, },  key: Date.now().toString()});
        } else {
          navigation.navigate({name:"ProductDetails", params:{ productDetails: product, },  key: Date.now().toString()});
        }
      }//,[navigation]);

    const handleMofyProduct = (product) => {
       navigation.navigate({
            name: 'AddProduct',
            params: {
                product:product
            },
          });   
        
    }
      
/*if(!minified)
{
    return (
        <View>
            <Text>OK</Text>
        </View>
   )
}
else
{*/

const topIcons = {
    gratuit : {name:'cube-sharp', type:'ionicon', color:appColors.green},
    reduction : {name:'gift', type:'ionicon', color:appColors.red},
    proposition : {name:'pricetag', type:'ionicon', color:appColors.blue},
}
const printTopIcon = (product) => {
    let icon = ''
    if(product.newPrice < product.price)
    {
        icon = 'reduction'
    }
    else if(product.feesBy=="seller")
    {
        icon = 'gratuit'
    }
    else
    {
        icon = 'proposition'
    }
    
    return (
        <Pressable style={[/*productStyles.card,*/ productStyles.feesBy,]}  onPress = { ()=>{ } } >
            <Icon name={topIcons[icon].name} type={topIcons[icon].type} size={18} color={appColors.white} />
            <View style={{width:2}}></View>
            <Text style={[customText.text, {color:appColors.white, fontSize:12,}]}>{capitalizeFirstLetter(icon)}</Text>
        </Pressable>
    )
}

const printBottomIcon = (product) => {
    let icon = ['proposition']
    if(product.newPrice < product.price)
    {
        icon.unshift('reduction')
    }
    if(product.feesBy=="seller")
    {
        icon.unshift('gratuit')
    }
    
    return icon.map((item, key) => {

        return (
            <Pressable style={[productStyles.bottomIconsButton,]}  onPress = { ()=>{ } } key={key}>
                <Icon name={topIcons[item].name} type={topIcons[item].type} size={18} color={topIcons[item].color} />
                <View style={{height:2}}></View>
                <Text numberOfLines={2} style={[customText.text, {color:appColors.clearBlack, fontSize:9,fontWeight:'bold'}]}>{capitalizeFirstLetter(item)}</Text>
            </Pressable>
        )
    })
}

const showConfirmationRenewProduct = (product) => {
    const sold=0, visibility=1
    Alert.alert(
        "Confirmation", // Titre de l'alerte
        "Ce produit a deja ete vendu, mais si vous en disposez encore en stock vous pouvez le reposter automatiquement.", // Message de l'alerte
        [
          {
            text: "Annuler", // Bouton d'annulation
            onPress: () => console.log("Annulation"),
            style: "cancel", // Style du bouton (optionnel)
          },
          {
            text: "Confirmer", // Bouton de confirmation
            onPress: async () =>{ 
                const updatedProduct = {
                    ...product,
                    sold : sold,
                    visibility : visibility
                };
                dispatch(addModifiedProduct(updatedProduct));
                setForceUpdate(!forceUpdate)
                await productHasBeenSold(product, sold, visibility)
            },
          },
        ],
        { cancelable: false } // Empêche la fermeture en cliquant en dehors de l'alerte
      );
}
function displayGrille(origin, product){
    return origin==="profileShop" && <View style={[productStyles.containerVisibility]}></View>
}

function displayGrilleBttom(origin, product){
   
    return (
        origin==="profileShop" &&
        <Pressable style={[productStyles.containerVisibilityInfo, {backgroundColor:product.sold==1?appColors.green:appColors.secondaryColor5}]} onPress={()=>{ product.sold==1?showConfirmationRenewProduct(product):null}}>
            <Text style={[{color:appColors.white,fontSize:12,fontWeight:'bold'}]}>
                {
                    product.sold==1 
                    ?
                        'Cliquer pour plus d\'options.'
                    :
                        "Ce produit n'est pas encore visible. Si vous pensez que c'est une erreur, consulter le service client sur WhatsApp."

                }
            </Text>
        </Pressable>
    )
} 
    return(
                <View style={[productStyles.container, productStyles.card, horizontal ? productStyles.containerHorizontal : false,]} >
                  
                       {
                        product.visibility==0 &&
                            displayGrille(origin, product)
                        }
                        {
                            (product.visibility==0 || product.sold==1) &&
                            displayGrilleBttom(origin, product)
                        }
                    
                    <View style={[productStyles.top, /*{justifyContent:(product.feesBy=="seller" || product.newPrice < product.price)?'space-between':'flex-end'}*/ ] } >
                        {
                            printTopIcon(product)
                        }
                        {
                            (!minified || user._id!=product.seller._id) &&
                                <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={like} user={user}  synchro={false} item={product} isCard={false} styles={{color:appColors.white}}/>
                        }
                    </View>
                        
                    <Pressable style={ productStyles.pressable } onPress = {handlePress} >
                        <Image source={{uri: `${productsImagesPath}/${product.images[0]}`}}  style={[productStyles.image, horizontal ? productStyles.imageHorizontal : false]} />
                        <View style={ productStyles.text }>
                            <View style={{ flexDirection:"column", justifyContent:"flex-start", height:50, }}>
                               { /*</Text><Text numberOfLines={1} style={[customText.text, productStyles.shopName]}> @{product.seller.username} | </Text>*/}
                                <Text numberOfLines={2} style={[customText.text, productStyles.productName]}>{product.name}</Text>

                            </View>

                  

                            <View style={[{flexWrap:'wrap'}]} >  
                               
                                {/*product.likes>0 ? 
                                <View style={[{flexDirection:'row'}]}>
                                    <BadgeIcon name="heart-sharp" size={20} color={appColors.red} badgeCount={0} styles={{}} />
                                        <View style={{width:5,}}></View>
                                    <Text style={[customText.text, {color:appColors.red}, {fontSize:14,fontWeight:'bold'}]}>{formatMoney(product.likes)} {product.likes>1?"likes":"like"}</Text> 
                                </View>
                                : 
                                <Text style={{alignSelf:"center"}}>---</Text>
                                */}

                                {product.price <= product.newPrice  
                                    ? 
                                        <Text style={[customText.text, productStyles.price,{fontSize:14}]}>{formatMoney(product.newPrice)} XAF</Text>
                                    :
                                        <View style={{ flexDirection:"row", justifyContent:"flex-start", flexWrap:'wrap' }} >
                                            <Text numberOfLines={2} style={[customText.text, productStyles.price, {textDecorationLine:"line-through", color:"red",fontSize:12}]}>{formatMoney(product.price)} </Text>
                                            <Text numberOfLines={2} style={[customText.text, productStyles.price, {textDecorationLine:"none", color:"green", marginLeft:5,fontSize:14}]}>{formatMoney(product.newPrice)} XAF</Text>
                                        </View>
                                }

                            </View>
             <View style={{height:10,}}></View>
                            <View style={productStyles.bottomIcons}>
                                {
                                    printBottomIcon(product)
                                }
                            </View>

                        {
                           (!minified || user._id!=product.seller._id) 
                           ?
                            <View style={[productStyles.bottom, productStyles.card, isBasketPresent?productStyles.isBasketPresent:false] } >
                                <Pressable onPress = { ()=>{handleBasketPressed(product) } }>
                                    <Text numberOfLines={1} style={[customText.text, productStyles.category, isBasketPresent?productStyles.isBasketPresentText:false]}>{isBasketPresent? "Aller Au Panier":"Ajouter Au Panier"}</Text>
                                </Pressable>
                            </View>
                            :
                            <View style={[productStyles.bottom, productStyles.card, {}] } >
                                <Pressable onPress = { ()=>{handleMofyProduct(product) } }>
                                    <Text numberOfLines={1} style={[customText.text, productStyles.category,]}>Modifier le produit</Text>
                                </Pressable>
                            </View>
                        }
                        </View>
                    </Pressable>
                </View>
        )
}

export default React.memo(Product)
