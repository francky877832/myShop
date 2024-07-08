import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, Animated, Pressable, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';
import BadgeIcon from '../common/BadgeIcon';
import { PrevButton, CustomButton } from "../common/CommonSimpleComponents"
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


const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const ProfilShop = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={profilShopStyles} />
                        
*/}
    const navigation = useNavigation()
    const [follow, setIsFollow] = useState(true) //Je ne crois pas avoir besoin de Search
    const [products, setProducts] = useState([])

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
            if (flatListRef.current) {
                flatListRef.current.setNativeProps({ scrollEnabled: false });
              }
      };
      
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (ev, gestureState) => 
            {
                //console.log("ok")
                if (flatListRef.current) {
                    flatListRef.current.setNativeProps({ scrollEnabled: false });
                  }

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


    const getProducts = async ()=> {
        try
        {
            const response = await fetch(`${server}/api/datas/products/get/user/${loggedUser}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                },
                });
                const responseJson = await response.json();
                setProducts(responseJson)
        } catch (error) {
        console.error(error);
      }
    }
    
    useEffect(()=>{
            getProducts()
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
                    

                        <View style={{flex:1, paddingBottom:40}} {...panResponder.panHandlers}>
                            <ProductsListWithFilters onEndReached={onEndReached} ref={flatListRef} datas={products} horizontal={false} styles={profilShopStyles} title={`${products.length} ${products.length > 1 ? 'Produits' : 'Produit'}`} />
                        </View>

                        <View style={[profilShopStyles.addProduct,{}]}>
                                <CustomButton color={appColors.white} backgroundColor={appColors.secondaryColor1} text="Ajouter Un Produit" onPress={()=>{navigation.navigate("AddProduct")}} styles={profilShopStyles} />
                        </View>
                </View>
    )
}

export default  ProfilShop