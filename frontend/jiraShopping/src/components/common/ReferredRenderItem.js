import React, { useState, useEffect, createContext, useContext, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Input, Icon } from 'react-native-elements';


import { appColors, customText, appFont } from '../../styles/commonStyles';
import {CustomButton} from '../common/CommonSimpleComponents'

import { referralStyles } from '../../styles/referralStyles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

import { referralDatas } from '../../utils/referralDatas';



const loggedUser = "Francky"

const   ReferredRenderItem = (props) => {
    const navigation = useNavigation()
    const {member, index, user} = props
    //const 
    //console.log(user)

    

    return(
        <Pressable style={[styles.container]}>
            <View style={[styles.imageAndName]}>
                <View style={[styles.imageContainer]}>
                    <Image source={{uri: member.image}} style={styles.image} />
                </View>

                    <View style={{width:10}}></View>
                <View style={[styles.user]}>
                    <Text style={[customText.text, styles.usernameText,]}>{member.username}</Text>
                </View>
            </View>

        </Pressable>
    )
}
export default ReferredRenderItem

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

