import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';

import BadgeIcon from './BadgeIcon';
import badgeIconStyles from '../../styles/badgeIconStyles';

import { appColors,customText, screenWidth} from '../../styles/commonStyles';
import { sinceDate } from '../../utils/commonAppFonctions';

const SellerBrand = (props) => {
    const { pub, onlineDate, certified, pp, username} = props
        const profile = pp || require('../../assets/images/product.png')
    return(
            <View style={[sellerBrandStyles.sellerBrand]}>
                <View style={[sellerBrandStyles.sellerBrandImageContainer]}>
                    <Image source={profile}   style={[sellerBrandStyles.sellerBrandImage]}/>
                </View>
                                
                <View style={[sellerBrandStyles.sellerBrandName]}>
                    <View style={[{flexDirection:"column",justifyContent:"space-between"}]}>
                        <Text numberOfLines={2} style={[customText.text, {fontWeight:"bold",}]}>@{username}</Text>
                        { pub &&
                            <View style={[{flexDirection:"row",justifyContent:"center",alignItems:"center",alignSelf:"flex-end",left:20,top:-3}]}>
                                <Icon name="ellipse" type='ionicon' size={10} color={appColors.green}  styles={{}} />
                                    <View style={{alignItems:"flex-end"}}>
                                        <Text numberOfLines={2}  style={[customText.text, {color:appColors.secondaryColor5,fontSize:11,left:5,}]}>En ligne il y'a {sinceDate(onlineDate)[0] + " " + sinceDate(onlineDate)[1]}</Text>
                                    </View>
                            </View>
                        }
                    </View>
                    <View style={[{flexDirection:"row",justifyContent:"flex-start",alignItems:"center",/*backgroundColor:"red",*/}]}>
                        <Text style={[customText.text, {color:appColors.secondaryColor1,}]}>{certified?"Vendeur certifié":"Membre"}</Text>
                            <BadgeIcon name="checkmark-circle" size={18} color={appColors.secondaryColor1} badgeCount={0} styles={badgeIconStyles} />
                    </View>
                </View>
            </View>
    )
}

const sellerBrandStyles = StyleSheet.create({
    sellerBrand :
    {
        flexDirection : "row",
        width : screenWidth,//"70%",
        left : 10,
        //paddingHorizontal : 50,
    },
    sellerBrandImageContainer :
    {
        width : 50,
        height : 50,
        borderRadius : 25,
    },
    sellerBrandImage :
    {
        width : 50,
        height : 50,
        borderRadius : 25,
        borderWidth : 2,
        borderColor : appColors.secondaryColor1,
    },
    sellerBrandName :
    {
        height : 50,
        flexDirection : "column",
        justifyContent : "space-evenly",
        paddingLeft : 7,
    },
})

export default  SellerBrand