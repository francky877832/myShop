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
    const { user } = useContext(UserContext)
    const { ranking, index } = props
  
    //console.log(ranking)

    

    return(
        <Pressable style={[styles.container, index<5?styles.firstRank:false]}>
            <View style={[styles.imageAndName]}>
                <View style={[styles.imageContainer]}>
                    <Image source={{uri: ranking?.user.image}} style={styles.image} />
                </View>

                <View style={[styles.user]}>
                    <Text style={[customText.text, styles.usernameText]}>{ranking?.user.username}</Text>
                </View>
            </View>

            <View style={[styles.points]}>
                <Text style={[customText.text, styles.pointsText]}>{ranking.points}</Text>
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
        borderBottomWidth : 1,
        borderColor : appColors.secondaryColor4,

    },
    firstRank :
    {
        backgroundColor : appColors.lightOrange,
    },
    imageAndName :
    {
        flexDirection : 'row',
        justifyContent : 'center',
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

    },
})
