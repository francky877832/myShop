import { API_BACKEND } from '@env';

import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, Pressable, PanResponder } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';
import BadgeIcon from '../common/BadgeIcon';
import { PrevButton, CustomButton, CustomActivityIndicator } from '../common/CommonSimpleComponents'
//custom styles
import { profilShopStyles } from '../../styles/profilShopStyles';
import SearchResults from './SearchResults';
import badgeIconStyles from '../../styles/badgeIconStyles';

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText, screenHeight, screenWidth } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';
import SellerBrand from '../common/SellerBrand';
import { server } from '../../remote/server';


const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
const ProfilShop = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={profilShopStyles} />
                        
*/}
    const navigation = useNavigation()
    const route = useRoute()
    const [follow, setIsFollow] = useState(true) //Je ne crois pas avoir besoin de Search
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading]  = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalComments, setTotalComments] = useState(1)


    const flatListRef = useRef(null);

    const maxTop = 180;
    const minTop = 65
    const halfTop = maxTop / 2;
    const initialTop = maxTop;

    
    const pan = useRef(new Animated.Value(initialTop)).current;
    const [lastValidTop, setLastValidTop] = useState(initialTop);
    const animatedTop = pan.interpolate({
        inputRange: [minTop, maxTop],
        outputRange: [minTop, maxTop],
        extrapolate: 'clamp',
    });

    //flatListRef.current.setNativeProps({ scrollEnabled: false });
    const onEndReached = () => {
            /*if (flatListRef.current) {
                flatListRef.current.setNativeProps({ scrollEnabled: false });
              }*/
      };
    const handleScroll = (event) => {
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isAtTop = contentOffset.y <= 0;
        const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height;

        if(isAtTop || isAtBottom)
        {
            if (flatListRef.current) 
            {
                flatListRef.current.setNativeProps({ scrollEnabled: false });
            }
        }
        
    };
      
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (ev, gestureState) => 
            {
                //console.log("ok")
                /*if (flatListRef.current) {
                    flatListRef.current.setNativeProps({ scrollEnabled: false });
                  }*/

                setLastValidTop(pan._value);

                Animated.event(
                [
                    null,
                    { dy: pan }
                ],
                { useNativeDriver: false }
        )},
        onPanResponderRelease: (evt, gestureState) =>{
            if (flatListRef.current) {
                flatListRef.current.setNativeProps({ scrollEnabled: false });
              }
                let finalValue;
                finalValue = lastValidTop - gestureState.dy;
                if (gestureState.dy < 0) {
                    // Si le geste va vers le haut (vers le haut de l'écran)
                    
                    if (finalValue < halfTop) {
                        finalValue = minTop; // Revenir à la hauteur initiale si moins de la moitié
                    } else {
                        finalValue = minTop; // Aller à la hauteur minimale sinon
                    }
                } else {
                    // Si le geste va vers le bas (vers le bas de l'écran)
                    finalValue = initialTop; // Revenir à la hauteur initiale
                }

          Animated.spring(pan, {
            toValue: finalValue,
            useNativeDriver: false,
            friction: 7,
            tension: 50,
          }).start();

          if (flatListRef.current) {
            flatListRef.current.setNativeProps({ scrollEnabled: true });
          }

          
        }
      })
    ).current;


    const getShopProducts = async (username, page)=> {
        try
        {
            const response = await fetch(`${API_BACKEND}/api/datas/products/get/user/${username}?page=${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                },
                });
                const responseJson = await response.json();
                return responseJson
        } catch (error) {
        console.error(error);
        return []
      }
    }

    const loadMoreShopProducts = useCallback(async () => {
        console.log("ook")
        console.log(hasMore)
        if (isLoading || !hasMore) return;
    
        setIsLoading(true);
        try {
  
          const datas = await getShopProducts(loggedUserId, page);
          const products = datas.datas
          //console.log(comments_)
          if (products.length > 0) {
            //console.log(comments_)
            console.log("pk")
            //updateProducts(newData.datas);
            //setComments((prevComments)=>[...prevComments, ...comments_])
            setProducts((prevProducts)=>[...prevProducts, ...products])
            //console.log(comments_)
            //if(page < totalPages)
            setPage((prevPage) => prevPage + 1);
            //setRefreshKey(prevKey => prevKey + 1);
            //console.log(page)
          } else {
            setHasMore(false); // Pas plus de données à charger
          }
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires :', error);
        }finally {
            setIsLoading(false);
        }
      }, [isLoading, hasMore, page])
    
    useEffect(()=>{
        const fetchData = async () => {
            //setIsLoading(true);
            await loadMoreShopProducts()
        };
      
          //if (isLoading) {
            fetchData();
          //}
           
            //console.log(products)
    
    },[])
    

    return(
                <View style={profilShopStyles.container}>
                    <Animated.View style={[profilShopStyles.topContainer, {height:animatedTop}]}>
                        <View style={[profilShopStyles.topTop]}>
                            <View style={[profilShopStyles.prevButton,{}]}>
                                <PrevButton styles={{color:appColors.black}}/>
                            </View>

                            <SellerBrand pub={true} onlineDate="2024-02-01T00:00:00Z" username={loggedUser}/>

                            <View style={[profilShopStyles.notifParameter]}>
                                <Pressable  style={[profilShopStyles.notification, ]} onPress = { ()=>{ navigation.navigate("Notifications");} }>
                                    <BadgeIcon name="create-outline" size={24} color="black" badgeCount={0} styles={badgeIconStyles} />
                                </Pressable>
                                
                                <Pressable  style={[profilShopStyles.notification, ]}onPress = { ()=>{ navigation.navigate("Notifications");} }>
                                    <BadgeIcon name="notifications-outline" size={24} color="black" badgeCount={5} styles={badgeIconStyles} />
                                </Pressable>
                            </View>
                        </View>
                
                        <View style={[profilShopStyles.follow]}>
                            <View style={[profilShopStyles.followInformations]}>
                                <View style={[profilShopStyles.followLeftElements,profilShopStyles.sold,{}]}>
                                    <Text style={[customText.text,{fontWeight:"bold"}]}>154</Text>
                                    <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Ventes</Text>
                                </View>

                                <View  style={[profilShopStyles.followLeftElements,profilShopStyles.follower,{}]}>
                                        <Text style={[customText.text,{fontWeight:"bold"}]}>15</Text>
                                        <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Followers</Text>
                                </View>

                                <View  style={[profilShopStyles.followLeftElements, profilShopStyles.following,{}]}>
                                    <Text style={[customText.text,{fontWeight:"bold"}]}>18</Text>
                                    <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Following</Text>
                                </View>

                                <View  style={[profilShopStyles.followLeftElements, profilShopStyles.favourites,{}]}>
                                    <Text style={[customText.text,{fontWeight:"bold"}]}>30</Text>
                                    <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Likes</Text>
                                </View>
                            </View>


                        </View>
                                <Pressable  style={[profilShopStyles.followButton, follow ? profilShopStyles.followFocused : false, {}]} onPress = { ()=>{ setIsFollow(!follow);} }>
                                    <BadgeIcon name={follow ? "person-remove" : "person-add"} size={24} color={follow ? appColors.secondaryColor1 : appColors.white} badgeCount={0} styles={badgeIconStyles} />
                                    <Text style={[customText.text,{ fontWeight:"bold", color : follow ? appColors.secondaryColor1 : appColors.white}]}>{follow ? "Unfollow" : "Follow"}</Text>
                                </Pressable>
                    </Animated.View>
                    

                        <View style={{flex:1, paddingBottom:route.params==undefined?40:0}} {...panResponder.panHandlers}>
                            <ProductsListWithFilters isLoading={isLoading} onScroll={handleScroll} onEndReached={loadMoreShopProducts} onEndReachedThreshold={0.5} ref={flatListRef} datas={products} horizontal={false} styles={profilShopStyles} title={`${products.length} ${products.length > 1 ? 'Produits' : 'Produit'}`} />
                        </View>

                    { route.params==undefined &&
                        <View style={[profilShopStyles.addProduct,{}]}>
                                <CustomButton color={appColors.white} backgroundColor={appColors.secondaryColor1} text="Ajouter Un Produit" onPress={()=>{navigation.navigate("AddProduct")}} styles={profilShopStyles} />
                        </View>
                    }

                </View>
    )
}

export default  ProfilShop