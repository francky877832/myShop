import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { referralStyles } from '../../styles/referralStyles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { referralDatas } from '../../utils/referralDatas';

import PointsHistoryRenderItem from '../common/PointsHistoryRenderItem'
import MonthlyRankingRenderItem from '../common/MonthlyRankingRenderItem';
import ReferredRenderItem from '../common/ReferredRenderItem';
import GiftHistoryRenderItem from '../common/GiftHistoryRenderItem';


const loggedUser = "Francky"

const   ReferralDetails = (props) => {
    const navigation = useNavigation()
    const { user } = useContext(UserContext)
  
    console.log(user)



    return(
        <View style={[referralStyles.container]}>
            <View  style={[referralStyles.topContainer]}>
                <View style={[referralStyles.points]}>
                    <Text style={[referralStyles.text]}>Total Points Gagnés</Text>
                    <Text style={[referralStyles.text]}>235</Text>
                </View>

                <Pressable style={[referralStyles.button]}>
                    <Text  style={[referralStyles.buttonText]}>Convertir Mes Points</Text>
                </Pressable>

                <PointsHistoryRenderItem />

            </View>

            <View style={[referralStyles.menu]}>
                <FlatList
                    data={referralDatas}
                    renderItem={ ({item}) => { 
                        return <PointsHistoryRenderItem />
                        
                    } }
                    keyExtractor={ (item) => { return item.name.toString(); } }
                    key={Math.random}
                    numColumns={2}
                    ItemSeparatorComponent={ (item) => { return <View style={{height:20,}}></View> }}
                    contentContainerStyle={{}}
                />
            </View>      
        </View>
    )
}
export default ReferralDetails
