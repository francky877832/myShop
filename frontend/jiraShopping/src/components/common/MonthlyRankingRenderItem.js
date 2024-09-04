import React, { useState, useContext,} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { referralStyles } from '../../styles/referralStyles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { referralDatas } from '../../utils/referralDatas';



const loggedUser = "Francky"

const   MonthlyRankingRenderItem = (props) => {
    const navigation = useNavigation()
    const { ranking, index, user } = props
  
    //console.log(ranking)

    //console.log(ranking?.user._id)
    //console.log(user._id)

    return(
        <Pressable style={[styles.container, index<5?styles.firstRank:null, ranking.user._id==user._id ? styles.me:null ]}>
            <View style={[styles.imageAndName]}>
                <View style={[styles.imageContainer]}>
                    <Image source={{uri: ranking?.user.image}} style={styles.image} />
                </View>

                    <View style={{width:10}}></View>
                <View style={[styles.user]}>
                    <Text style={[customText.text, styles.usernameText, ranking.user._id==user._id ? styles.me:null]}>{ranking?.user.username}</Text>
                </View>
            </View>

            <View style={[styles.points]}>
                <Text style={[customText.text, styles.pointsText, ranking.user._id==user._id ? styles.me:null]}>{ranking.points}</Text>
            </View>
        </Pressable>
    )
}
export default MonthlyRankingRenderItem

const styles = StyleSheet.create({
    container :
    {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : 20,
        paddingVertical : 10,
        backgroundColor : appColors.white,
        borderBottomWidth : 2,
        borderColor : appColors.white,

    },
    firstRank :
    {
        backgroundColor : appColors.lightOrange,
    },
    me :
    {
        backgroundColor : appColors.secondaryColor1,
        color : appColors.white,
    },
    imageAndName :
    {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    imageContainer :
    {
        width : 50,
        height : 50,
        borderRadius : 25,
    },
    image :
    {
        width : 50,
        height : 50,
        borderRadius : 25,
    },
    user :
    {
        
    },
    usernameText :
    {  
        fontSize : 16,
    },
    pointsText :
    {
        fontSize : 16,
    }
})
