import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { server } from '../../remote/server.js';

import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { referralDatas } from '../../utils/referralDatas';
import { referralStyles } from '../../styles/referralStyles';
import { referralDetailsStyles } from '../../styles/referralDetailsStyles.js';

import PointsHistoryRenderItem from '../common/PointsHistoryRenderItem'
import MonthlyRankingRenderItem from '../common/MonthlyRankingRenderItem';
import ReferredRenderItem from '../common/ReferredRenderItem';
import GiftHistoryRenderItem from '../common/GiftHistoryRenderItem';


const loggedUser = "Francky"

const   ReferralDetails = (props) => {
    const navigation = useNavigation()
    const { user } = useContext(UserContext)
    const route = useRoute()
    const { page } = route.params

    const [datas, setDatas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  

    const fetchUserDatas = async () =>{
        let response;
        try
        {
            switch(page.toLowerCase())
            {
                case 'pointshistory':
                    response = await fetch(`${server}/api/datas/points/user/${user._id}`);
                    break;
                case 'monthlyrankingrenderitem': //console.log('ok')
                    response = await fetch(`${server}/api/datas/points/leaderboard`);
                    break;
                default : 
                    response = await fetch(`${server}/api/datas/gift/user/${user._id}`);
                    break;
            }
            
            
            const datas = await response.json()
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            

            switch(page.toLowerCase())
            {
                case 'pointshistory':
                    setDatas(datas)
                    break;
                case 'monthlyrankingrenderitem': //console.log('ok')
                    setDatas(datas)
                    break;
                case 'GiftHistoryRenderItem'.toLocaleLowerCase(): //console.log('ok')
                    setDatas(datas)
                    break;
                default : 
                    response = await fetch(`${server}/api/datas/points/leaderboard`);
                    break;
            }
        }catch(error){
            console.log(error)
            return []
        }
    }

useEffect(()=>{
    const fectchData = async () => {
        await fetchUserDatas()
    }

    if(isLoading)
    {   
        fectchData()
        setIsLoading(false)
    }
}, [isLoading])

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


            </View>

            <View style={[referralStyles.menu]}>
                <FlatList
                    data={datas}
                    renderItem={ ({item}) => { 
                        return <GiftHistoryRenderItem reward={{}} />    
                    } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    key={Math.random}
                    numColumns={1}
                    ItemSeparatorComponent={ (item) => { return <View style={{height:20,}}></View> }}
                    contentContainerStyle={{}}
                />
            </View>      
        </View>
    )
}
export default ReferralDetails
