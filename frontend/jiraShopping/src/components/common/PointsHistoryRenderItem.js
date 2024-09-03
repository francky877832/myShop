import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { referralStyles } from '../../styles/referralStyles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { referralDatas } from '../../utils/referralDatas';
import { capitalizeFirstLetter } from '../../utils/commonAppFonctions';



const loggedUser = "Francky"

const   PointsHistoryRenderItem = (props) => {
    const navigation = useNavigation()
    const { user } = useContext(UserContext)
  
    const {point} = props

    

    return(
        <Pressable style={[styles.container]}>
            <View style={[styles.reason]}>
                <Text style={[customText.text, styles.reasonText]}>{capitalizeFirstLetter(point.reason)}</Text>
                <Text style={[customText.text, styles.dateText]}>{point.date}</Text>
            </View>

            <View style={[styles.points]}>
                <Text style={[customText.text, styles.pointsText]}>{point.points}</Text>
            </View>
        </Pressable>
    )
}
export default PointsHistoryRenderItem


const styles = StyleSheet.create({
    container :
    {

    },
    reason :
    {

    },
    points :
    {

    },
    pointsText :
    {

    },
    reasonText :
    {

    },
    dateText :
    {

    },

})