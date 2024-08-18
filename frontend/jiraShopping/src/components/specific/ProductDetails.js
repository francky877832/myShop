import { API_BACKEND } from '@env';

import React, { useState, useRef, useContext, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, FlatList, Image, Animated, PanResponder, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';

import CarouselImage from '../common/CarouselImages';
import { PrevButton, ShareButton, LikeButton, CustomButton, CustomActivityIndicator } from "../common/CommonSimpleComponents";
import Comments from './Comments';
import { productDetailsStyles } from '../../styles/productDetailsStyles';
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

const loggedUserId = "668fdfc6077f2a5c361dd7fc"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"

const ProductDetails = (props) => {
    //console.log(props)
    const navigation = useNavigation()
    const route = useRoute()
    const {user} = useContext(UserContext)
    //On utilise la version la plus a jour du produit!!!!
    const modifiedProducts = useSelector(state => state.favourites.modifiedProducts);
    const modifiedProduct = modifiedProducts.filter(product => product?._id === route.params.productDetails._id)
    const [data, setData] = useState(modifiedProduct.length>0?modifiedProduct[0]:route.params.productDetails);
    const pass = route.params.pass;
    //data.color = "blue";
    const numChars = 150;
    
    const [comments, setComments] = useState(data.comments)
    const [description, setDescription] = useState(truncateText(data.description, numChars));
    //const {favourites, addFavourite, removeFavourite, hasLiked} = useContext(FavouritesContext)
    //const favourites = useSelector((state) => state.favourites.favourites);
    const favourites = []
    //const {basket, addBasket, isBasketPresent} = useContext(BasketContext)


   
    const minHeight = 0;
    const maxHeight = screenHeight / 2;
    const halfHeight = maxHeight / 2;
    const initialHeight = maxHeight;

    
    const pan = useRef(new Animated.Value(initialHeight)).current;
    const [lastValidHeight, setLastValidHeight] = useState(initialHeight);
    const animatedHeight = pan.interpolate({
        inputRange: [minHeight, maxHeight],
        outputRange: [minHeight, maxHeight],
        extrapolate: 'clamp',
    });

    const scrollViewRef = useRef(null);



    const { reshapedComments, setReshapedComments, loadMoreComments, page, hasMore, isLoading, setIsLoading, filtersUpdated, searchAgain, searchAgain_, setPage, onNewComment, setOnNewComment, setHasMore } = useContext(CommentsContext)
 
        const initialNumberOfComments = 2
        const loadMoreComments_ = async () => { await loadMoreComments(product._id) ;}
        

       
        //let data_ = [...comments] ; data_ = !all ? data_.slice(0, initialNumberOfComments+1) : comments
        //const comments_ = {comments : [...data_], count:2, total : 3} //format de retourn cote server Express
        //let  reshapedComments = reshapeComments(comments_.comments)
    
    

/* //Bloquer le scroll au debut onScroll={handleScroll}
    const handleScroll = (event) => {
      const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
  
      // Calcul de la position actuelle dans la ScrollView
      const scrollY = contentOffset.y;
      const screenHeight = layoutMeasurement.height;
      const contentHeight = contentSize.height;
  
      // Vérification si la fin du scroll est atteinte
      if (scrollY == 0) { //A la fin scrollY +screenHeight >= contentHeight 
        // Désactiver le scrolling en utilisant la référence à la ScrollView
        if (scrollViewRef.current) {
          scrollViewRef.current.setNativeProps({ scrollEnabled: false });
        }
      }
    };
  */

    /*
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (ev, gestureState) => 
            {
                 // Désactiver le scrolling en utilisant la référence à la ScrollView
                if (scrollViewRef.current) {
                    scrollViewRef.current.setNativeProps({ scrollEnabled: false });
                }
                //setLastValidHeight(pan._value);

                Animated.event(
                [
                    null,
                    { dy: pan }
                ],
                { useNativeDriver: false }
        )},
        onPanResponderRelease: (evt, gestureState) => {
                let finalValue;

                if (gestureState.dy < 0) {
                    // Si le geste va vers le haut (vers le haut de l'écran)
                    finalValue = lastValidHeight //+ gestureState.dy;
                    //Alert.alert("",`${gestureState.dy}Ok`)
                    if (gestureState.dy < -20) {
                        finalValue = minHeight ; // Revenir à la hauteur initiale si moins de la moitié
                    } /*else {
                        finalValue = initialHeight; // Aller à la hauteur minimale sinon
                    }*//*
                } else {
                    // Si le geste va vers le bas (vers le bas de l'écran)
                    finalValue = lastValidHeight + gestureState.dy;
                    if (gestureState.dy > 20) {
                        finalValue = initialHeight; // Revenir à la hauteur initiale si moins de la moitié
                    } /*else {
                        finalValue = minHeight; // Aller à la hauteur minimale sinon
                    }*//*
                    //finalValue = initialHeight; // Revenir à la hauteur initiale
                    
                }

          Animated.spring(pan, {
            toValue: finalValue,
            useNativeDriver: false,
            friction: 7,
            tension: 50,
          }).start();

          if (scrollViewRef.current) {
            scrollViewRef.current.setNativeProps({ scrollEnabled: true });
          }

        }
      })
    ).current;
*/

   /*
    {...panResponder.panHandlers}
   */ 


useEffect(()=>{
    setReshapedComments(data.comments)
    //console.log(data.favourites)
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
    const dispatch = useDispatch();
    const isFavourite = useSelector((state) => isProductFavourite(state, data._id))
    const [like, setLikeIcon ] = useState(isFavourite)
    const [numLike, setNumLike] = useState(data.likes)
    const [likeAdders, setLikeAdders] = useState(data.favourites)

    //hasLikedItem={hasLiked(item)}
    const _handleLikePressed = useCallback((product) => {
        //data.likes = data.likes+1
        setLikeIcon(prevLike => {
            const newLike = !prevLike;
            setNumLike(prevNumLike => newLike ? prevNumLike + 1 : prevNumLike - 1);
            newLike ? setLikeAdders([user, ...likeAdders]) : setLikeAdders(likeAdders.filter(item=>item._id!=user._id))
            //newLike ? data.likes++ : data.likes--
            return newLike;
        });

       
    }, [like, numLike]);

   
//console.log(likeAdders)
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
    return (

  <View style={productDetailsStyles.container}>
<KeyboardAwareScrollView style={{flex:1}} resetScrollToCoords={{ x: 0, y: 0 }} contentContainerStyle={{flexGrow:1}} scrollEnabled={true}>
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <ScrollView style={[productDetailsStyles.scrollView,]} ref={scrollViewRef} horizontal={false} nestedScrollEnabled={true} >

            <View contentContainerStyle={[productDetailsStyles.getBackPosition, {}]}>
                <View style={productDetailsStyles.buttonContainer}>
                    <PrevButton styles={productDetailsStyles.prevButton} />
                    <View style={productDetailsStyles.buttonContainerLeft}>
                        <ShareButton styles={productDetailsStyles.shareButton} />
                        <View style={{ width: 10 }}></View>
                        
                            <LikeButton _handleLikePressed={_handleLikePressed} hasLikedItem={like} user={user} synchro={true} item={data} styles={{ color: appColors.white }} isCard={false} />
                    </View>
                </View>

                {/*
                    <Animated.View style={[productDetailsStyles.carousselIamge, { height: animatedHeight }]}>
                        <CarouselImage images={data.images} styles={{ }} />
                    </Animated.View>
                */}
                <View style={[productDetailsStyles.carousselIamge, {height:screenHeight/2,}]}>
                    <CarouselImage images={data.images} styles={{ }} />
                </View>
                

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
                        {data.color ?
                            <View style={[{ flexDirection: "row" }]}>
                                <BadgeIcon name="ellipse-sharp" size={18} color={data.color.toLowerCase()} styles={{}} isCard={false} />
                                <Text style={[customText.text]}>{capitalizeFirstLetter(data.color)}</Text>
                            </View>
                            : false
                        }
                    </View>
                    <View style={[productDetailsStyles.description]}>
                        <Text style={[customText.text, { fontWeight: "bold" }]}>Description</Text>
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
                    <Pressable style={[productDetailsStyles.sellerBrand]} onPress={()=>{user._id!=data.seller._id ? navigation.navigate("Shop", {seller:data.seller}) :  navigation.navigate('Preferences', {screen: 'Shop',params:undefined}); }}>
                        <SellerBrand pub={true} onlineDate={data.seller.updatedAt} username={data.seller.username} navigation={navigation} route={route} closeNotif={true} />
                    </Pressable>
                <View style={{height:20}}></View>

                
                        {
                            <View style={[{borderTopWidth:1,borderColor:appColors.lightWhite}]}>
                            <Comments page={page} loadMoreComments={loadMoreComments_} searchAgain={searchAgain} all={false} pass={pass} isLoading={isLoading} setIsLoading={setIsLoading} setters={{setOnNewComment:setOnNewComment}} reshapedComments={reshapedComments} onNewComment={onNewComment} setOnNewComment={setOnNewComment} navigation={navigation} product={data} />
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
    </TouchableWithoutFeedback>
    
</KeyboardAwareScrollView>    

            <View style={[productDetailsStyles.bottom]}>
                <View style={[productDetailsStyles.button, productDetailsStyles.price]}>
                    <Text numberOfLines={2} style={[customText.text, productDetailsStyles.buttonText, { color: appColors.secondaryColor1 }]}>{formatMoney(data.price)} XAF</Text>
                </View>

                <View style={[productDetailsStyles.panier, ]}>
                       {/* 
                            <Pressable  style={[ productDetailsStyles.button,]} onPress = { ()=>{isBasketPresent(data)[0]?navigation.navigate("Basket"):addBasket(data); } }>
                                <Text numberOfLines={1} style={[customText.text, {color:appColors.secondaryColor1,fontWeight:"bold"}]}>{isBasketPresent(data)[0]? "Aller Au Panier":"Ajouter Au Panier"}</Text>
                            </Pressable>    
                        */}
                        <Pressable  style={[ productDetailsStyles.button,]} onPress = { ()=>{navigation.navigate("Offers", {product:data}) } }>
                            <Text numberOfLines={1} style={[customText.text, {color:appColors.secondaryColor1,fontWeight:"bold"}]}>{"Proposer"}</Text>
                        </Pressable>
                </View>
                <View style={[productDetailsStyles.acheter]}>
                    <CustomButton text="Acheter" styles={{ pressable: productDetailsStyles.button, text: productDetailsStyles.buttonText }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={() => { }} />
                </View>
            </View>
</View>

    );
};

export default React.memo(ProductDetails);

