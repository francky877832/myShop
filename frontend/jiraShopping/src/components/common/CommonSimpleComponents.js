import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

import BadgeIcon from './BadgeIcon';
import { Ionicons } from '@expo/vector-icons';
import { productStyles } from '../../styles/productStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { appFont, appColors, appFontSize, customText } from '../../styles/commonStyles';
//import { CheckBox } from 'react-native-elements';
import { CheckBox } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { formatMoney } from '../../utils/commonAppFonctions';

//contexte
import { useSelector, useDispatch } from 'react-redux';
import { addFavourite, addFavouriteContext, setLikedIcon, updateLocalFavourites, isProductFavourite, addLocalFavourite, removeLocalFavourite} from '../../store/favourites/favouritesSlice'; 

exports.LikeButton = (props) => {
    const dispatch = useDispatch();
    const { favourites, liked } = useSelector(state => state.favourites);
    const { item, hasLikedItem, _handleLikePressed, synchro, isCard, styles, user } = props;
    const style = styles || {};

    const timeoutRef = useRef(null);
   // const isFavourite = useSelector((state) => isProductFavourite(state, item._id))
    const isFavourite = hasLikedItem
    const [like, setLikeIcon] = useState(isFavourite);
    


    const handleLikePressed = useCallback((product) => {
        _handleLikePressed(product)
        //synchro ? _handleLikePressed() : _handleLikePressed();
        //dispatch(addFavouriteContext({ item:item, bool: !like }));
        //setLikeIcon(!isFavourite);
        

        

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Configurer un nouveau timeout
        timeoutRef.current = setTimeout(() => {
            if (isFavourite) {
                //product.likes--
                dispatch(removeLocalFavourite({product, user}));
            } else {
                //product.likes++
                dispatch(addLocalFavourite({product, user}));
            }
            dispatch(addFavourite({ item:item, bool: !like, user:user }));
        }, 500);
        

    },[])

   useEffect(() => {
        // Ici, nous devons également mettre à jour l'état local 'like' en fonction du state global

       //setLikeIcon(isFavourite);
        //dispatch(setLikedIcon(isFavourite)); // Met à jour l'état global 'liked'
        //console.log("okj")
    },[]);

    return (
        <Pressable
            style={[commonSimpleComponentsStyles.likeButton.likeIcon, isCard ? productStyles.card : false]}
            onPress={() => handleLikePressed(item)}
        >
            {!hasLikedItem
                ? <BadgeIcon name="heart-outline" size={24} color={style.color} badgeCount={0} styles={{zIndex:99}} />
                : <BadgeIcon name="heart-sharp" size={24} color={appColors.secondaryColor1} badgeCount={0} styles={{}} />
            }
        </Pressable>
    );
};



exports.PrevButton = (props) => {
    const {styles} = props
    const navigation = useNavigation()
    const color = styles ? styles.color : appColors.black
    const size = styles ? styles.size : 24
    return(
        <Pressable onPress={() => {navigation.goBack()}}>
            <Icon name='arrow-back' type='ionicon' color={color} size={size} />
        </Pressable>
    )
}

exports.ShareButton = (props) => {
    
    return(
        <Pressable style={[commonSimpleComponentsStyles.shareButton,]} onPress = { ()=>{ console.log("share"); }}>
            <BadgeIcon name="share-social-sharp" size={24} color="#fff" styles={{}} />
        </Pressable>
    )
}



exports.ConditionChoice = (props) => {
    const { updateConditions, conditions } = props
    
    return(
        <View style={commonSimpleComponentsStyles.conditionChoice.checkBox}>
            <CheckBox title='Neuf' checked={conditions["new"]} onPress={() => { updateConditions("new")  }} />
            <CheckBox title='Utilisé' checked={conditions["old"]} onPress={() => { updateConditions("old"); }} />
            <CheckBox title='Peu Utilisé' checked={conditions["new used"]} onPress={() => { updateConditions("new used");  }} />
        </View>    
        )
}


exports.CustomButton = (props) => {
    const { text, color, backgroundColor, onPress, styles, disabled } = props
    
    const styles_ = StyleSheet.create({
        bg:{backgroundColor:(backgroundColor || appColors.blue)},
        color:{color:(color || appColors.white),}
    })
    return(
       <Pressable style={[{justifyContent:"center",alignItems:"center"},styles.pressable, styles_.bg]} onPress={onPress} disabled={disabled}>
            <Text style={[styles.text, styles_.color]}>{text}</Text>
       </Pressable> 
        )
}

exports.CustomActivityIndicator = (props) => {

    return (
        <View style={[commonSimpleComponentsStyles.activityIndicator.container,{}]}>
                <ActivityIndicator style={[commonSimpleComponentsStyles.activityIndicator.activityIndicator,{}]} size="large" color={appColors.secondaryColor1} />
        </View>
    )
}


exports.TemporaryNotification = (props) => {
    const {message} = props
    return (
        <View style={[commonSimpleComponentsStyles.temporaryNotification.container,{}]}>
            <Text style={[customText, commonSimpleComponentsStyles.temporaryNotification.message]}>{message}</Text>
        </View>
    )
}


exports.PriceDetails = (props) => {
    const {product, title, closePriceDetails} = props
    return (
        <View style={[commonSimpleComponentsStyles.priceDetails.container]}>
            <View style={[{flexDirection:'row', justifyContent:'space-between', paddingRight:10}]}>
                <Text style={[customText.text, commonSimpleComponentsStyles.priceDetails.title]}>{title.toUpperCase()}</Text>
                <Pressable style={[{}]} onPress={()=>{closePriceDetails(false)}}>
                    <Icon type='ionicon' name="close-circle" size={24} color={appColors.secondaryColor1} />   
                </Pressable>            
            </View>

            <View style={{height:10}}></View>

            <View  style={[commonSimpleComponentsStyles.priceDetails.priceLine]}>
                <Text style={[customText.text, commonSimpleComponentsStyles.priceDetails.semiTitle]}>Prix Réel</Text>
                <Text style={[customText.text,commonSimpleComponentsStyles.priceDetails.price]}>{formatMoney(product.newPrice)} XAF</Text>
            </View>

            <View  style={[commonSimpleComponentsStyles.priceDetails.priceLine]}>
                <View>
                    <Text  style={[customText.text, commonSimpleComponentsStyles.priceDetails.semiTitle]}>Frais De Transport</Text>
                    <Text style={[customText.text, commonSimpleComponentsStyles.priceDetails.semiTitle, {fontStyle:'italic', fontSize:11}]}>Payé par {product.feesBy==='seller'?'vous':'acheteur'}</Text>
                </View>
                <Text style={[customText.text, commonSimpleComponentsStyles.priceDetails.price]}>{!!product.kargoPrice?formatMoney(product.kargoPrice):'Non Inclus'} </Text>
            </View>

            <View  style={[commonSimpleComponentsStyles.priceDetails.priceLine]}>
                <Text  style={[customText.text, commonSimpleComponentsStyles.priceDetails.semiTitle]}>Commission(-10%)</Text>
                <Text style={[customText.text, commonSimpleComponentsStyles.priceDetails.price]}>-{formatMoney(product.newPrice*10/100)}  XAF</Text>
            </View>

            <View  style={[commonSimpleComponentsStyles.priceDetails.priceLine, commonSimpleComponentsStyles.priceDetails.totalPriceLine]}>
                <Text  style={[customText.text, commonSimpleComponentsStyles.priceDetails.semiTitle, commonSimpleComponentsStyles.priceDetails.totalPriceText]}>Total - Vos Gain</Text>
                <Text style={[customText.text, commonSimpleComponentsStyles.priceDetails.price]}>{formatMoney(product.newPrice-product.newPrice*10/100)}  XAF</Text>
            </View>

        </View>
    )
} 







