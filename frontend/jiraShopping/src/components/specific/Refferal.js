import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable, ActivityIndicator, Alert} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { referralStyles } from '../../styles/referralStyles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { referralDatas } from '../../utils/referralDatas';



const loggedUser = "Francky"

const   Referral = (props) => {
    const navigation = useNavigation()
    const { user } = useContext(UserContext)
  
    //console.log(user)

    useEffect(()=>{
        
    }, [])

    return(
        <View style={[referralStyles.container]}>
            <View  style={[referralStyles.topContainer]}>
                <View style={[referralStyles.points]}>
                    <Text style={[referralStyles.text, referralStyles.title]}>Total Points Gagnés</Text>
                    <Text style={[referralStyles.text, referralStyles.pointsText]}>235</Text>
                </View>

                <Pressable style={[referralStyles.button]}>
                    <Text  style={[referralStyles.buttonText]}>Convertir Mes Points</Text>
                </Pressable>

            </View>

            <View style={[referralStyles.menu]}>
                <FlatList
                    data={referralDatas}
                    renderItem={ ({item}) => { return(
                                <Pressable style={[referralStyles.referralElement, !item.available?referralStyles.unavailable:false]} onPress={()=>{navigation.navigate(`${item.component}`, {page:`${item.renderItem}`})}} disabled={!item.available}> 
                                    <Icon type={item.iconType} name={item.iconName} size={40} color={appColors.secondaryColor1} />
                                    <Text style={[referralStyles.text, referralStyles.menuText, !item.available?referralStyles.unavailable:false]} numberOfLines={2}>{item.name.replace(/ /g, '\n')}</Text>
                                </Pressable>
                                )
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
export default Referral
