import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal, Dimensions } from 'react-native';

import { CheckBox } from 'react-native-elements';


import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';



const FilterItem = (props) => {
    const { updateCategories, item, selectedCategories} = props
    const [modalVisible, setModalVisible] = useState(true);
    const toggleCheckbox = (key) => {
        setCheckboxValues((prev) => ({ ...prev, [key]: !prev[key] }));
      };
      let { subCategories } = item
      
     

    return(

            <View style={filterItemStyles.container} >
                <View style={[filterItemStyles.title]}>
                    <Text style={[customText.text, {fontWeight:"bold",}]}>{item.name}</Text>
                </View>
                {
                    item.subCategories.map((item, index) =>{
                        return(
                        <View style={filterItemStyles.checkBox} key={index}>
                            <CheckBox title={item.name} containerStyle={{ borderWidth:0, margin:1,padding:0, }} textStyle={[customText.text,filterItemStyles.checkBoxText]} checked={selectedCategories[item.id]} onPress={() => { updateCategories(item.id);  }} />
                        </View>
                    )})
                }
            </View>
    )
}

const filterItemStyles =  StyleSheet.create({
    container :
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
    }

})

export default FilterItem