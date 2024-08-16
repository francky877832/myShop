import { API_BACKEND } from '@env';

import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, Pressable, PanResponder } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
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
import { UserContext } from '../../context/UserContext';


const loggedUserId = "668fdfc6077f2a5c361dd7fc"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"

const ProfilShop = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={profilShopStyles} />
                        
*/}
    const navigation = useNavigation()
    const route = useRoute()
    
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading]  = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalComments, setTotalComments] = useState(1)

    const {user, setUser} = useContext(UserContext)
    const {seller,} = route.params!=undefined ? route.params : {seller:user}
    const [follow, setIsFollow] = useState(!user.followings.some((el)=> el._id == seller._id))
    const flatListRef = useRef(null);
    const timeoutRef = useRef(null);

    //verifier si le seller est dans la liste de following de users

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
            const response = await fetch(`${server}/api/datas/products/get/user/${username}?page=${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête'+(await response.text()));
                }
                const datas = await response.json();
                //console.log(datas)
                return datas
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
  
          const datas = await getShopProducts(seller._id, page);
          const products = datas.products
          if (products.length > 0) {
            console.log("pk")
            setProducts((prevProducts)=>[...prevProducts, ...products])
            setPage((prevPage) => prevPage + 1);
          } else {
            setHasMore(false);
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
/*
console.log("reload")
console.log(reload)
    if(reload=='reload')
    {
        console.log("reload")
        setIsLoading(false)
        setHasMore(true)
        setProducts([]) 
        reload=""
    } */   

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    
        // Configurer un nouveau timeout
        timeoutRef.current = setTimeout(async () => {
            fetchData(); 
        }, 0);

       //console.log(seller.followings)
    
    }, [])

const setFollowers = async (follower, following) => {
    if (follow) {
        // Remove following
        const newFollowings = user.followings.filter((el) => el._id !== seller._id);
    
        // Remove follower
        const newFollowers = seller.followers.filter((el) => el._id !== user._id);
    
        // Update seller's followers
        seller.followers = newFollowers;
    
        // Update the user state with new followings
        setUser({ ...user, followings: newFollowings });
    } else {
        // Add follower to seller's followers
        const newFollowers = [user, ...seller.followers];
        seller.followers = newFollowers;
    
        // Add following to user's followings
        const newFollowings = [seller, ...user.followings];
        setUser({ ...user, followings: newFollowings });
    }

    setIsFollow(!follow)
    
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    // Configurer un nouveau timeout
    timeoutRef.current = setTimeout(async () => {
        try
        {
            const response = await fetch(`${server}/api/auth/users/setFollowers/${following._id}`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({follower:follower._id})
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête'+(await response.text()));
                }
                const datas = await response.json();
                console.log(datas)
        } catch (error) {
        console.error(error);
        return []
      } 
    }, 1000);
    
}


    return(
                <View style={profilShopStyles.container}>
                    <Animated.View style={[profilShopStyles.topContainer, {height:animatedTop}]}>
                        <View style={[profilShopStyles.topTop]}>
                            <View style={[profilShopStyles.prevButton,{}]}>
                                <PrevButton styles={{color:appColors.black}}/>
                            </View>

                            <SellerBrand pub={true} onlineDate="2024-02-01T00:00:00Z" username={seller.username} navigation={navigation} route={route} />

                            
                        </View>
                
                        <View style={[profilShopStyles.follow]}>
                            <View style={[profilShopStyles.followInformations]}>
                                <View style={[profilShopStyles.followLeftElements,profilShopStyles.sold,{}]}>
                                    <Text style={[customText.text,{fontWeight:"bold"}]}>{route.params==undefined ? user.ventes : seller.ventes}</Text>
                                    <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Ventes</Text>
                                </View>

                                <Pressable  style={[profilShopStyles.followLeftElements,profilShopStyles.follower,{}]}
                                    onPress={()=>{seller.followers.length>0 ?navigation.navigate('Followers', {seller:seller, who:'followers'}):false}}
                                >
                                        <Text style={[customText.text,{fontWeight:"bold"}]}>{route.params==undefined ? user.followers.length : seller.followers.length}</Text>
                                        <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Followers</Text>
                                </Pressable>

                                <Pressable  style={[profilShopStyles.followLeftElements, profilShopStyles.following,{}]}
                                    onPress={()=>{seller.followings.length>0 ?navigation.navigate('Followers', {seller:seller, who:'followings'}):false}}
                                >
                                    <Text style={[customText.text,{fontWeight:"bold"}]}>{route.params==undefined ? user.followings.length : seller.followings.length}</Text>
                                    <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Following</Text>
                                </Pressable>

                                <View  style={[profilShopStyles.followLeftElements, profilShopStyles.favourites,{}]}>
                                    <Text style={[customText.text,{fontWeight:"bold"}]}>{route.params==undefined ? user.favourite : seller.favourite}</Text>
                                    <Text style={[customText.text,{color:appColors.secondaryColor5}]}>Likes</Text>
                                </View>
                            </View>


                        </View>
                        { route.params!=undefined ?

                                <Pressable  style={[profilShopStyles.followButton, follow ? profilShopStyles.followFocused : false, {}]} onPress = { ()=>{ setFollowers(user, seller); } }>
                                    <BadgeIcon name={follow ? "person-remove" : "person-add"} size={24} color={follow ? appColors.secondaryColor1 : appColors.white} badgeCount={0} styles={badgeIconStyles} />
                                    <Text style={[customText.text,{ fontWeight:"bold", color : follow ? appColors.secondaryColor1 : appColors.white}]}>{follow ? "Unfollow" : "Follow"}</Text>
                                </Pressable>
                            :
                                <Pressable  style={[profilShopStyles.followButton, ]} onPress = { ()=>{ navigation.navigate('Account', {screen: 'AccountSettings',params: {},});} }>
                                    <BadgeIcon name="create-outline" size={24} color={appColors.white} badgeCount={0} styles={badgeIconStyles} />
                                    <Text style={[customText.text,{ fontWeight:"bold", color : appColors.white}]}>Modifier Mon Profil</Text>
                                </Pressable>
                        }
                    </Animated.View>
                    

                        <View style={{flex:1, paddingBottom:route.params==undefined?40:0}} {...panResponder.panHandlers}>
                            <ProductsListWithFilters isLoading={isLoading} onScroll={handleScroll} onEndReached={loadMoreShopProducts} onEndReachedThreshold={0.3} ref={flatListRef} datas={products} horizontal={false} styles={profilShopStyles} title={`${products.length} ${products.length > 1 ? 'Produits' : 'Produit'}`} />
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