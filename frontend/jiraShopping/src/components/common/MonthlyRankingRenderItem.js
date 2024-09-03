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
    const { ranking } = props
  
    //console.log(ranking)

    

    return(
        <Pressable style={[styles.container]}>
            <View>
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

    },
    imageContainer :
    {

    },
    image :
    {

    },
    user :
    {
        
    },
    usernameText :
    {

    },
})
