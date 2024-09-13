import { API_BACKEND } from '@env';

import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, FlatList, Image, Animated, PanResponder, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { GestureDetector, PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';


import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';

import CarouselImage from '../common/CarouselImages';
import { PrevButton, ShareButton, LikeButton, CustomButton, CustomActivityIndicator, PriceDetails } from "../common/CommonSimpleComponents";
import Comments from './Comments';
import { productDetailsStyles } from '../../styles/productDetailsStyles';
import { productStyles } from '../../styles/productStyles';
import { appColors, customText } from '../../styles/commonStyles';
import { formatMoney, sinceDate, truncateText } from '../../utils/commonAppFonctions';
import { datas } from '../../utils/sampleDatas';
import BadgeIcon from '../common/BadgeIcon';
import ProductsList from '../common/ProductsList';
import SellerBrand from '../common/SellerBrand';
import { screenHeight, screenWidth } from '../../styles/commentsStyles';
import { capitalizeFirstLetter, convertWordsToNumbers, containsEmail, reshapeComments,  } from '../../utils/commonAppFonctions';
import { FavouritesContext } from '../../context/FavouritesContext';
import { BasketContext } from '../../context/BasketContext';
import { CommentsContext } from '../../context/CommentsContext';

import { useSelector, useDispatch } from 'react-redux';
import { isProductFavourite } from '../../store/favourites/favouritesSlice'; 
import { ActivityIndicator } from 'react-native-paper';
import { UserContext } from '../../context/UserContext';
import { ProductContext } from '../../context/ProductContext';
import { addModifiedProduct } from '../../store/favourites/favouritesSlice';
import { defaultOffer } from '../../utils/offersDatas';

const loggedUserId = "668fdfc6077f2a5c361dd7fc"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"

const ProductDetails = (props) => {
    //console.log(props)
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch();
    const {user} = useContext(UserContext)
    //On utilise la version la plus a jour du produit!!!! 
    const [showPriceDetails, setShowPriceDetails] = useState(false)
    const modifiedProducts = useSelector(state => state.favourites.modifiedProducts);
    const modifiedProduct = modifiedProducts.filter(product => product?._id === route.params.productDetails._id)
    const [data, setData] = useState(modifiedProduct.length>0?modifiedProduct[0]:route.params.productDetails);
    const { pass } = route.params;
    //data.color = "blue";
    const numChars = 150;
    
    const [comments, setComments] = useState(data.comments)
    const [description, setDescription] = useState(truncateText(data.description, numChars));
    //const {favourites, addFavourite, removeFavourite, hasLiked} = useContext(FavouritesContext)
    //const favourites = useSelector((state) => state.favourites.favourites);
    const favourites = []
    const timeoutRef = useRef(null);

    //const {basket, addBasket, isBasketPresent} = useContext(BasketContext)


   



    const { reshapedComments, setReshapedComments, loadMoreComments, page, hasMore, isLoading, setIsLoading, filtersUpdated, searchAgain, searchAgain_, setPage, onNewComment, setOnNewComment, setHasMore } = useContext(CommentsContext)
    const { updateProductViews } = useContext(ProductContext)

        const initialNumberOfComments = 2
        const loadMoreComments_ = async () => { await loadMoreComments(data._id) ;}
        

   
useEffect(()=>{
    //console.log("product")
    //console.log(data.comments)
    //console.log(data.favourites)
    setReshapedComments(data.comments)
    

    
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
        await updateProductViews(data)
        /*const updatedProduct = {
            ...data,
            views : data.views+1
          };
        dispatch(addModifiedProduct(updatedProduct));*/
    }, 1000);

}, [])

    

    


//WHEN COMMING FOR NOTIFICATIONS
    /*const scrollViewRef = useRef(null);
    const scrollToPosition = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 200, animated: true });
        }
    };*/

    //const [likeClicked, setLikeClicked] = useState(data.liked)
    
//console.log("data")
    const isFavourite = useSelector((state) => isProductFavourite(state, data._id))
    const [like, setLikeIcon ] = useState(isFavourite)
    const [numLike, setNumLike] = useState(data.likes>=0?data.likes:0)
    const [likeAdders, setLikeAdders] = useState(data.favourites)
//console.log(data.favourites)
    //hasLikedItem={hasLiked(item)}
    const _handleLikePressed = useCallback((product) => {
        //data.likes = data.likes+1
        setLikeIcon(prevLike => {
            const newLike = !prevLike;
            const tmpLike = newLike ? numLike + 1 : numLike - 1
            tmpLike >=0 ? setNumLike(tmpLike) : setNumLike(0);
            newLike ? setLikeAdders(!likeAdders.some(item=>item._id===user._id)?[user, ...likeAdders]:likeAdders) : setLikeAdders(likeAdders.filter(item=>item._id!=user._id))
            //newLike ? data.likes++ : data.likes--
            return newLike;
        });

       
    }, [like, numLike]);

   
//console.log(data)
    /*const _handleLikePressed =  useCallback((item) => {
        setLikeIcon((liked) => {
           /* if(liked)
            {
                setNumLike((prevNumLike) => prevNumLike-1)
                data.likes--
            }
            else
            {
                setNumLike((prevNumLike) => prevNumLike+1)
                data.likes++
            }
            return !liked
        });  
    },[like])*/


//console.log(data.seller)

const handleSellerBrandPressed = (product) => {
    if(user._id!=product.seller._id)
    {
        navigation.navigate("Shop", {seller:product.seller}) 
    }
    else
    {
        navigation.navigate('Preferences', {screen: 'MyShop',params:undefined})
    }
}


 const MIN_HEIGHT = 0;
    const MAX_HEIGHT = screenHeight / 2;
    const HALF_HEIGHT = MAX_HEIGHT / 2;
    const INITIAL_HEIGHT = MAX_HEIGHT;


    let height = useRef(null)
    const offset = useRef(new Animated.Value(0)).current;
    //HEADER
    const insets = useSafeAreaInsets();

     height.current = offset.interpolate({
      inputRange: [0, MAX_HEIGHT + insets.top],
      outputRange: [MAX_HEIGHT + insets.top, insets.top + 44],
      //inputRange: [0, MAX_HEIGHT],
      //outputRange: [MAX_HEIGHT, 0],
      extrapolate: 'clamp'
    });

    const scrollViewRef = useRef(null);


    const handlePaymentButtonCliked = () => {
        navigation.navigate('VerifyDeliveryInfos', {products:[data,]})
    }

    return (

  <View style={productDetailsStyles.container}>
    {
        <>
            <View style={productDetailsStyles.buttonContainer}>
                <PrevButton styles={productDetailsStyles.prevButton} />
                <View style={productDetailsStyles.buttonContainerLeft}>
                    <ShareButton styles={productDetailsStyles.shareButton} />
                    <View style={{ width: 10 }}></View>
                            
                    <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={like} user={user} synchro={true} item={data} styles={{ color: appColors.white }} isCard={false} />
                </View>
            </View>
            
            <Animated.View style={[productDetailsStyles.carousselIamge, {height:height.current,},]}>
                <CarouselImage images={data.images} product={data} styles={{ }} />
            </Animated.View>
            
        </>
    }


        <ScrollView onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
           scrollEventThrottle={16} style={[productDetailsStyles.scrollView, {zIndex:9999}]} ref={scrollViewRef} horizontal={false} nestedScrollEnabled={true} >

            <View contentContainerStyle={[productDetailsStyles.getBackPosition, {}]}>
                
                   
               
                {
                    /*
                    <View style={[productDetailsStyles.carousselIamge, {height:screenHeight/2,}]}>
                        <CarouselImage images={data.images} product={data} styles={{ }} />
                    </View>
                    */
                }
                

<View style={[productDetailsStyles.underCaroussel,{borderTopWidth:1,borderColor:appColors.lightWhite}]}>
                <View style={[productDetailsStyles.infosBox]}  >
                    <View style={productDetailsStyles.since}>
                        <View style={{ flexDirection: "row" }}>
                            <BadgeIcon name="time-sharp" size={18} color={appColors.secondaryColor4} styles={{}} isCard={false} />
                            <View style={{ width: 5 }}></View>
                            <Text style={[customText.text, { color: appColors.secondaryColor4 }]}>Mis à jour il y'a {sinceDate(data.updatedAt).join(" ")}</Text>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center",}}>

                                <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={like} user={user}  synchro={true} item={data} styles={{ color: appColors.black }} isCard={false} />

                            <Text style={[customText.text]}>{numLike}</Text>
                        </View>
                    </View>

                    <View style={[productDetailsStyles.name]}>
                        <Text numberOfLines={2} style={[customText.text, { fontWeight: "bold" }]}>@{capitalizeFirstLetter(data.seller.username)}</Text>
                        <View style={{ flexDirection: "row", top: 0 }}>
                            <Text style={[customText.text,{fontWeight:"bold",fontSize:15,color:appColors.gray}]}>{data.category.replace(/\//g, ' | ')}</Text>
                        </View>
                    </View>

                    <View style={[productDetailsStyles.details]}>
                        <View style={[{ flexDirection: "row" }]}>
                            <BadgeIcon name="checkmark-circle-sharp" size={18} color="black" styles={{}} isCard={false} />
                            <Text style={[customText.text, { paddingLeft: 5 }]}>{capitalizeFirstLetter(data.brand)}</Text>
                        </View>
                        <View style={[{ flexDirection: "row" }]}>
                            <View style={{ transform: [{ rotate: "-90deg" }] }}>
                                <BadgeIcon name="pricetag-outline" size={18} color="black" styles={{}} isCard={false} />
                            </View>
                            <Text style={[customText.text, { paddingLeft: 5 }]}>{capitalizeFirstLetter(data.condition)}</Text>
                        </View>
                        {data.color == 'multicolor'
                            ?
                                <View style={[{ flexDirection: "column", justifyContent:'center', alignItems:'center' }]}>
                                    <Image source={require('../../assets/images/multicolor.png')} style={[{width:16,height:16,borderRadius:8}]} />
                                        <View style={{width:5}} ></View>
                                    <Text style={[customText.text]}>{capitalizeFirstLetter(data.color).substring(0,10)}</Text>
                                </View>
                            :
                                <View style={[{ flexDirection: "column", justifyContent:'center', alignItems:'center' }]}>
                                    <View style={[productDetailsStyles.color, {backgroundColor:data.color.toLowerCase(), borderWidth:1, borderColor:data.color.toLowerCase()==='white'?appColors.black:data.color.toLowerCase()}]}></View>
                                    <View style={{width:5}} ></View>
                                    <Text style={[customText.text]}>{capitalizeFirstLetter(data.color).substring(0,10)}</Text>
                                </View>
        
                        }
                    </View>
                    <View style={[productDetailsStyles.description]}>
                        <View style={[{flexDirection:'row', justifyContent:'space-between'}]}>
                            <Text style={[customText.text, { fontWeight: "bold" }]}>Description</Text>
                            <Text style={[customText.text, { fontWeight: "bold", color:appColors.gray }]}>{data.garanti>0?`${data.garanti} Mois . Garanti`:false} </Text>
                        </View>

                        <View style={[productDetailsStyles.descriptionBox]}>
                            <Text style={[customText.text]}>{description[0]}</Text>
                            {description[1] == 0 && !description[2] ? true :
                                description[1] == 1 ?
                                    <Pressable onPress={() => { setDescription(truncateText(data.description, data.description.length, true)) }}>
                                        <Text style={[customText.text, { color: appColors.secondaryColor1 }]}>...Plus</Text>
                                    </Pressable>
                                    :
                                    <Pressable onPress={() => { setDescription(truncateText(data.description, numChars, true)) }}>
                                        <Text style={[customText.text, { color: appColors.secondaryColor1 }]}>...Moins</Text>
                                    </Pressable>
                            }
                        </View>
                    </View>
                   
                </View>
    
             

                <View style={[productDetailsStyles.commentsContainer]}>
                    <Pressable style={[productDetailsStyles.sellerBrand]} onPress={()=>{handleSellerBrandPressed(data) }}>
                        <SellerBrand pub={true} onlineDate={data.seller.updatedAt} username={data.seller.username} navigation={navigation} route={route} closeNotif={true} />
                    </Pressable>
                <View style={{height:20}}></View>

                
                        {
                            <View style={[{borderTopWidth:1,borderColor:appColors.lightWhite}]}>
                            <Comments user={user} page={page} loadMoreComments={loadMoreComments_} searchAgain={searchAgain} all={false} pass={pass} isLoading={isLoading} setIsLoading={setIsLoading} setters={{setOnNewComment:setOnNewComment}} reshapedComments={reshapedComments} onNewComment={onNewComment} setOnNewComment={setOnNewComment} navigation={navigation} product={data} />
                            {isLoading &&
                                <ActivityIndicator color={appColors.secondaryColor1} size="small" styles={{}} /> 
                            }
                        </View>
                        
                        }

                       

                </View>

               {
                

                    isLoading 
                    ?
                                <ActivityIndicator color={appColors.secondaryColor1} size="small" styles={{}} /> 
                                :
                <View style={[productDetailsStyles.similarContainer]}>
                        <View style={{height:20}}></View>
                    <Pressable style={[productDetailsStyles.likeAdders]} onPress={()=>{likeAdders.length>0?navigation.navigate({name:"Followers", params:{seller:data.seller, favourites:likeAdders, who:'favourites'}, key:Date.now().toString()}):false}}>
                        <View style={[productDetailsStyles.likeTitle]}>
                            <Text style={[customText.text, productDetailsStyles.someText]}>
                                ...ont aimé
                            </Text>
                        </View>

                        <View style={{height:10}}></View>

                        <View style={[productDetailsStyles.likeContent, {flexDirection:likeAdders?.length<=0?'column':'row'}]}>
                            <FlatList
                                data={[...likeAdders].slice(0,5)}
                                renderItem={ ({item}) => { return (
                                    <View style={[productDetailsStyles.likeItem]}>
                                        <Image source={{uri: item.image}} style={[productDetailsStyles.likeAddersImages]} />
                                        <Text style={[customText.text, ]}>{item.username.substring(0,4)}...</Text>
                                    </View>
                                )} }
                                keyExtractor={ (item) => { return item._id.toString();} }
                                horizontal={true}
                                ItemSeparatorComponent ={ (item) => { return <View style={{width:0,}}></View> }}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={() => (
                                    <View style={[{alignItems:'center', justifyContent:'center',}]}>
                                        <Icon name="heart-dislike-outline" type="ionicon" color={appColors.secondaryColor1} size={50} />
                                        <Text style={[customText.text,  productDetailsStyles.someText, {color:appColors.gray,fontSize:16,fontWeight:'normal'}]}>Pas de likes actuellement</Text>
                                    </View>
                                )}
                                contentContainerStyle={[{justifyContent:'center', alignItems:'center'}]}
                            />
                             { likeAdders?.length>0 &&
                                <Pressable>
                                    <Text style={[customText.text, productDetailsStyles.someText, {color:appColors.gray,fontSize:16,fontWeight:'normal'}]}>
                                        {likeAdders?.length} like{likeAdders?.length>1?"s":false} {">>"}
                                    </Text>
                                </Pressable>
                            }
                        </View>
                    </Pressable>

            <View style={{height:20}}></View>
                    <View>
                        <Text style={[customText.text, productDetailsStyles.someText ]}>Produits Similaires</Text>
                    </View>
                    
                    <View>
                        <ProductsList datas={favourites} horizontal={true} replace={true} styles={{}} />
                    </View>
        
                </View>
        }
                
</View>
        </View>


        
        </ScrollView>


    
        {showPriceDetails &&
            <View style={[productDetailsStyles]}>
                <PriceDetails products={[data,]} closePriceDetails={setShowPriceDetails} title="Informations Sur La Vente"/>
            </View>
        }

            <View style={[productDetailsStyles.bottom]}>
                <Pressable style={[productDetailsStyles.button, productDetailsStyles.price]} onPress={()=>{setShowPriceDetails(!showPriceDetails)}}>
                    {
                        showPriceDetails 
                            ?
                                <Icon type='octicon' name="triangle-down" size={24} color={appColors.secondaryColor1} />
                            :
                                <Icon type='octicon' name="triangle-up" size={24} color={appColors.secondaryColor1} />
                    }                    
                    
                    
                    {data.price <= data.newPrice  
                                    ? 
                                        <Text numberOfLines={2} style={[customText.text, productStyles.price, productDetailsStyles.buttonText,]}>{formatMoney(data.price)} XAF</Text>
                                    :
                                        <View style={{ flexDirection:"column", justifyContent:"flex-start", flexWrap:'wrap' }} >
                                            <Text numberOfLines={2} style={[customText.text, productStyles.price, productDetailsStyles.buttonText,  {textDecorationLine:"line-through", color:"red",fontSize:12}]}>{formatMoney(data.price)} </Text>
                                            <Text numberOfLines={2} style={[customText.text, productStyles.price, productDetailsStyles.buttonText,  {textDecorationLine:"none", color:"green", marginLeft:5,fontSize:14}]}>{formatMoney(data.newPrice)} XAF</Text>
                                        </View>
                                }
                </Pressable>

                <View style={[productDetailsStyles.panier, ]}>
                       {/* 
                            <Pressable  style={[ productDetailsStyles.button,]} onPress = { ()=>{isBasketPresent(data)[0]?navigation.navigate("Basket"):addBasket(data); } }>
                                <Text numberOfLines={1} style={[customText.text, {color:appColors.secondaryColor1,fontWeight:"bold"}]}>{isBasketPresent(data)[0]? "Aller Au Panier":"Ajouter Au Panier"}</Text>
                            </Pressable>    
                        */}
                    {
                    (user._id!=data.seller._id) 
                           ?
                        <Pressable  style={[ productDetailsStyles.button,]} onPress = { ()=>{navigation.navigate("Offers", {product:data, inputFocused:true, notificationsOffers:Object.keys(data.offers).length>0 ? data.offers.offers : defaultOffer}) } }>
                            <Text numberOfLines={1} style={[customText.text, {color:appColors.secondaryColor1,fontWeight:"bold"}]}>{"Proposer"}</Text>
                        </Pressable>
                        :
                        <Pressable  style={[ productDetailsStyles.button,]} onPress = { ()=>{navigation.navigate("Notifications", {key:1}) } }>
                            <Text numberOfLines={1} style={[customText.text, {color:appColors.secondaryColor1,fontWeight:"bold"}]}>{"Propositons"}</Text>
                        </Pressable>
                    }
                </View>
                <View style={[productDetailsStyles.acheter]}>
                    {
                       (user._id==data.seller._id || data.sold===1)
                        ?
                        <CustomButton text="Acheter" disable={true} styles={{ pressable: productDetailsStyles.button, text: productDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor3} onPress={() => { }} />
                        :
                        <CustomButton text="Acheter" disable={false} styles={{ pressable: productDetailsStyles.button, text: productDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={() => { handlePaymentButtonCliked()}} />
                    }
                </View>
            </View>
</View>

    );
};

export default React.memo(ProductDetails);

