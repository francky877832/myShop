import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, Dimensions, } from 'react-native';

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
    const {favourites, addFavourite, removeFavourite, hasLiked} = useContext(FavouritesContext)
    const {item, hasLikedItem, isCard, styles} = props
    const style = styles || {}

    const [like, setLikeIcon ] = useState(hasLikedItem)
    const _handleLikePressed = (item) => {
       like ?  addFavourite(item,false) : addFavourite(item,true)
        setLikeIcon(!like);
    }
    useEffect(()=>{
        setLikeIcon(hasLiked(item));
    }, [favourites])

    return(
            <Pressable style={[commonSimpleComponentsStyles.likeButton.likeIcon, isCard ? productStyles.card : false]} onPress = { ()=>{ _handleLikePressed(item)  } }>
                    {!like ? <BadgeIcon name="heart-outline" size={24} color={style.color} badgeCount={0} styles={{}}/> : <BadgeIcon name="heart-sharp" size={24} color={appColors.secondaryColor1} badgeCount={0} styles={{}}/>}
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




