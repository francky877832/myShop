import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal, Dimensions } from 'react-native';

import { CheckBox } from 'react-native-elements';


import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';



const OrderBy = (props) => {
    const { updateOrderBy, item, selectedOrderBy} = props
/*
      <View style={orderByStyles.container} >
                <CheckBox title={item.name1} containerStyle={{ borderWidth:0, margin:1,padding:0, }} 
                    textStyle={[customText.text,orderByStyles.checkBoxText]} 
                    checked={selectedOrderBy[item.name1]} onPress={() => { updateOrderBy(item.name1, item.name2);  }} 
                />
                 <CheckBox title={item.name2} containerStyle={{ borderWidth:0, margin:1,padding:0, }} 
                    textStyle={[customText.text,orderByStyles.checkBoxText]} 
                    checked={selectedOrderBy[item.name2]} onPress={() => { updateOrderBy(item.name2, item.name1);  }} 
                />
            </View>
*/
    return(
        <View style={orderByStyles.container}>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={item.name}>
                <View style={orderByStyles.radioContainer}>
                <RadioButton value="first" />
                <Text>First</Text>
                </View>
                <View style={orderByStyles.radioContainer}>
                <RadioButton value="second" />
                <Text>Second</Text>
                </View>
            </RadioButton.Group>
        </View>
    )
}

const orderByStyles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
 /*   container :
    {
        flex:1, 
        paddingTop : 10,
        backgroundColor:appColors.lightWhite,
    },
    checkBox :
    {
        width : screenWidth/2.5,
        paddingLeft : 20
    },

    title :
    {
        paddingLeft : 20,
        paddingBottom : 5,
    },
    checkBoxText :
    {
        marginLeft:0,
        color:appColors.secondaryColor5,
        fontWeight:"normal",
    }*/

})

export default OrderBy