import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'
import { convertISOToCustomDateFormat } from '../../utils/commonAppFonctions';
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
                <Text style={[customText.text, styles.dateText]}>{convertISOToCustomDateFormat(point.date)}</Text>
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
        width : '100%',
        paddingHorizontal : 30,
        height : 60,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderColor : appColors.secondaryColor4,
        
    },
    reason :
    {
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    points :
    {

    },
    pointsText :
    {
        fontWeight : 'bold',
        fontSize : 16,
    },
    reasonText :
    {
        fontWeight : 'bold',
        fontSize : 16,
    },
    dateText :
    {
        fontStyle : 'italic',
    },

})