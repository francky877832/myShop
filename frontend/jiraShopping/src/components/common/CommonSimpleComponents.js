import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions, Pressable } from 'react-native';

import BadgeIcon from './BadgeIcon';
import { Ionicons } from '@expo/vector-icons';
import { productStyles } from '../../styles/productStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { appFont, appColors, appFontSize } from '../../styles/commonStyles';
import { CheckBox } from 'react-native-elements';

import { Icon } from 'react-native-elements';

exports.LikeButton = (props) => {
    const { hasLiked, isCard} = props
    const [like, setLikeIcon ] = useState(hasLiked)
    return(
            <Pressable style={[commonSimpleComponentsStyles.likeButton.likeIcon, isCard ? productStyles.card : false]} onPress = { ()=>{ console.log("likes"); setLikeIcon(like ? false : true)} }>
                    {like ? <BadgeIcon name="heart-outline" size={24} color="#fff" badgeCount={0} styles={{}}/> : <BadgeIcon name="heart-sharp" size={24} color={appColors.secondaryColor1} badgeCount={0} styles={{}}/>}
            </Pressable>
    )
}


exports.PrevButton = (props) => {

    return(
        <Pressable onPress={() => {console.log("Go")}}>
            <Icon name='arrow-back' type='ionicon' color="#fff" />
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
    const { setIsNewFocused, setIsOldFocused,  isNewFocused, isOldFocused } = props
    
    return(
        <View style={commonSimpleComponentsStyles.conditionChoice.checkBox}>
            <CheckBox title='Neuf' checked={isNewFocused} onPress={() => { setIsNewFocused(!isNewFocused);  }} />
            <CheckBox title='Utilisé' checked={isOldFocused} onPress={() => { setIsOldFocused(!isOldFocused); }} />
        </View>    
        )
}


exports.CustomButton = (props) => {
    const { text, color, backgroundColor, onPress } = props
    
    return(
       <Pressable style={{backgroundColor:(backgroundColor || appColors.blue)}} onPress={onPress}>
            <Text style={{color:(color || appColors.white),}} >{text}</Text>
       </Pressable> 
        )
}




