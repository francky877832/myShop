import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

import BadgeIcon from './BadgeIcon';
import { Ionicons } from '@expo/vector-icons';
import { productStyles } from '../../styles/productStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { appFont, appColors, appFontSize } from '../../styles/commonStyles';
//import { CheckBox } from 'react-native-elements';
import { CheckBox } from '@rneui/themed';

import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

//contexte
import { FavouritesContext } from '../../context/FavouritesContext';
exports.LikeButton = (props) => {
    const {favourites, addFavourite, addFavouriteContext, removeFavourite, hasLiked, liked, setLikedIcon, disableLikeButton} = useContext(FavouritesContext)
    const {item, hasLikedItem, _handleLikePressed, synchro, isCard, styles} = props
    const style = styles || {}

    const [like, setLikeIcon ] = useState(hasLikedItem)
    const timeoutRef = useRef(null);

    const handleLikePressed = (item) => {
        synchro ? _handleLikePressed(item) : setLikeIcon(!like)

        //addFavouriteContext(item)
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Configurer un nouveau timeout
        timeoutRef.current = setTimeout(() => {
            like ?  addFavourite(item,false) : addFavourite(item,true)
        }, 1000);

    }
    useEffect(()=>{
        item.liked = hasLiked(item)
        setLikeIcon(item.liked);
        //setLikedIcon(hasLiked(item));
    }, [favourites])
    //console.log(hasLikedItem)

    return(
            <Pressable style={[commonSimpleComponentsStyles.likeButton.likeIcon, isCard ? productStyles.card : false]} onPress = { ()=>{ handleLikePressed(item)  } }>
                    {!hasLikedItem  ? <BadgeIcon name="heart-outline" size={24} color={style.color} badgeCount={0} styles={{}}/> : <BadgeIcon name="heart-sharp" size={24} color={appColors.secondaryColor1} badgeCount={0} styles={{}}/>}
            </Pressable>
    )
}


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
    const { text, color, backgroundColor, onPress, styles } = props
    
    const styles_ = StyleSheet.create({
        bg:{backgroundColor:(backgroundColor || appColors.blue)},
        color:{color:(color || appColors.white),}
    })
    return(
       <Pressable style={[{justifyContent:"center",alignItems:"center"},styles.pressable, styles_.bg]} onPress={onPress}>
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




