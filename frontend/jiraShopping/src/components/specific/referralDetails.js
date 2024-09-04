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
            //ReferredRenderItem
            switch(page.toLowerCase())
            {
                case 'PointsHistoryRenderItem'.toLowerCase():
                    response = await fetch(`${server}/api/datas/points/user/${user._id}`);
                    break;
                case 'MonthlyRankingRenderItem'.toLowerCase(): //console.log('ok')
                    response = await fetch(`${server}/api/datas/points/leaderboard`);
                    break;
                case 'GiftHistoryRenderItem'.toLowerCase():
                    response = await fetch(`${server}/api/datas/gift/user/${user._id}`);
                    break;
                case 'ReferredRenderItem'.toLowerCase():
                    response = await fetch(`${server}/api/auth/users/referred/${user._id}`);
                    break;
                default :  break;
            }
            
            
            const datas = await response.json()
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }

            //console.log(datas)

            switch(page.toLowerCase())
            {
                case 'PointsHistoryRenderItem'.toLowerCase():
                    setDatas(datas)
                    break;
                case 'MonthlyRankingRenderItem'.toLowerCase(): //console.log('ok')
                    setDatas(datas)
                    break;
                case 'GiftHistoryRenderItem'.toLocaleLowerCase(): //console.log('ok')
                    setDatas(datas)
                    break;
                    case 'ReferredRenderItem'.toLocaleLowerCase(): //console.log('ok')
                    setDatas(datas)
                    break;
                default : 
                    setDatas([])
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

//PointsHistoryRenderItem
//MonthlyRankingRenderItem
const headerTitle = (count) => {
    switch(page.toLowerCase())
            {
                case 'PointsHistoryRenderItem'.toLowerCase():
                    return 'Historique De Vos Points'
                    break;
                case 'MonthlyRankingRenderItem'.toLowerCase(): //console.log('ok')
                    return 'Classement Mensuel'
                    break;
                case 'GiftHistoryRenderItem'.toLocaleLowerCase(): //console.log('ok')
                    return 'Historique De Vos Recompanses'
                    break;
                    case 'ReferredRenderItem'.toLocaleLowerCase(): //console.log('ok')
                    return `Membres Parrainnés (${count})`
                    break;
                default : 
                    break;
            }
}
const sample = [...datas, ...datas, ...datas, ...datas, ...datas, ...datas, ...datas, ...datas, ...datas, ...datas]
    return(
        <View style={[referralDetailsStyles.container]}>
            <View  style={[referralStyles.topContainer]}>
                <View style={[referralStyles.points]}>
                    <Text style={[referralStyles.text, referralStyles.title]}>Total Points Gagnés</Text>
                    <Text style={[referralStyles.text, referralStyles.pointsText]}>235</Text>
                </View>

                <Pressable style={[referralStyles.button]}>
                    <Text  style={[referralStyles.buttonText]}>Convertir Mes Points</Text>
                </Pressable>
            </View>

            <View style={[referralDetailsStyles.menu]}>
                <View style={[referralDetailsStyles.renderTitleBox]}>
                    <Text style={[referralDetailsStyles.text, referralDetailsStyles.renderTitle]}>{headerTitle(datas.length)}</Text>
                </View>

                <FlatList
                    data={sample}
                    renderItem={ ({item, index}) => { 
                        return <ReferredRenderItem member={item} index={index} user={user} />    
                    } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    key={Math.random}
                    numColumns={1}
                    ItemSeparatorComponent={ (item) => { return <View style={{height:0,}}></View> }}
                    ListHeaderComponent={()=>{}}
                    contentContainerStyle={[referralDetailsStyles.flatlist]}
                    style={[]}
                />
            </View>      
        </View>
    )
}
export default ReferralDetails
