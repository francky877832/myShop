import React, { useState, forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


import { topStyles } from '../../styles/topStyles';
import { appColors, appFont } from '../../styles/commonStyles';

const EmptyLit = forwardRef((props, ref) => {
    const {text, giveFocus,} = props
    let message = text.split("|");
    return(
        <View style={[emptyListStyles.container, ]} >
            <FontAwesome5 name="sad-cry" size={50} color={appColors.secondaryColor1} style={[emptyListStyles.icon, ]} />
            <Text style={[emptyListStyles.text,emptyListStyles.text1 ]} >{message[0]}</Text>
            <Pressable style={[emptyListStyles.pressable, ]} onPress={()=>{giveFocus();}}>
                <Text style={[emptyListStyles.text, emptyListStyles.text2,]} >{message[1]}</Text>
            </Pressable>
        </View>
    )})

const emptyListStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 50,
        marginRight : 20,
    },
    icon :
    {

    },
    pressable :
    {
        width : "100%",
        backgroundColor : appColors.secondaryColor1,
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 20,
        marginTop : 20,

    },
    text :
    {
        fontFamily : appFont.secondaryFontFamily3,
    },
    text1:
    {
        marginTop : 10,
    },
    text2 :
    {
        color : appColors.white,
    },
})
export default EmptyLit