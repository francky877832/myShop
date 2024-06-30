import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';

//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';
import BadgeIcon from '../common/BadgeIcon';
import { PrevButton } from "../common/CommonSimpleComponents"
//custom styles
import { profilShopStyles } from '../../styles/profilShopStyles';
import SearchResults from './SearchResults';
import badgeIconStyles from '../../styles/badgeIconStyles';

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

const ProfilShop = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={profilShopStyles} />
                        
*/}

    const [follow, setIsFollow] = useState(true) //Je ne crois pas avoir besoin de Search

    return(
                <View style={profilShopStyles.container}>
                    <View style={profilShopStyles.topContainer}>
                        <View style={[profilShopStyles.topTop]}>
                            <View style={[profilShopStyles.prevButton,{}]}>
                                <PrevButton styles={{color:appColors.black}}/>
                            </View>

                            <View style={[profilShopStyles.sellerBrand]}>
                                <View style={[profilShopStyles.sellerBrandImageContainer]}>
                                    <Image source={require('../../assets/images/product.png')}   style={[profilShopStyles.sellerBrandImage]}/>
                                </View>
                                
                                <View style={[profilShopStyles.sellerBrandName]}>
                                    <Text style={[customText.text, {fontWeight:"bold",}]}>@Franck</Text>

                                    <View style={[{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",/*backgroundColor:"red",*/}]}>
                                        <Text style={[customText.text, {color:appColors.secondaryColor1,}]}>Vendeur certifié</Text>
                                        <BadgeIcon name="checkmark-circle" size={18} color={appColors.secondaryColor1} badgeCount={0} styles={badgeIconStyles} />
                                    </View>
                                </View>
                            </View>

                            <View style={[profilShopStyles.notifParameter]}>
                                <Pressable  style={[profilShopStyles.notification, ]} onPress = { ()=>{ console.log("Notifications")} }>
                                    <BadgeIcon name="settings-outline" size={24} color="black" badgeCount={0} styles={badgeIconStyles} />
                                </Pressable>
                                
                                <Pressable  style={[profilShopStyles.notification, ]}onPress = { ()=>{ console.log("Notifications")} }>
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
                    </View>

                        <View style={{flex:1,}}>
                            <ProductsListWithFilters datas={datas} horizontal={false} styles={profilShopStyles} title={`${datas.length} ${datas.length > 1 ? 'Produits' : 'Produit'}`} />
                        </View>
                </View>
    )
}

export default  ProfilShop