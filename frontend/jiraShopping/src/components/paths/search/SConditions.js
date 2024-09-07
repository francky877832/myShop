import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';


import { Input } from 'react-native-elements';



import { appColors, customText, screenHeight } from '../../../styles/commonStyles';
import { addProductStyles } from '../../../styles/addProductStyles';
import { sCategoriesStyles } from '../../../styles/paths/search/sCategoriesStyles';
import { CustomButton, CustomActivityIndicator, ConditionChoice,} from "../../common/CommonSimpleComponents"

import { Icon, CheckBox, } from 'react-native-elements';

import { FilterContext } from '../../../context/FilterContext';
import { ProductItemContext } from '../../../context/ProductItemContext';
import { capitalizeFirstLetter } from '../../../utils/commonAppFonctions';
import { screenWidth } from '../../../styles/commonStyles';

const SConditions = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const { category, subCategories } = route.params
    const [isNewFocused, setIsNewFocused] = useState(false)
    const [isOldFocused, setIsOldFocused] = useState(false)
    const [isNewOldFocused, setIsNewOldFocused] = useState(false)
    const [conditions, setConditions] = useState({"old":false, "new":false, "new used":false})
    const {selectedConditionsFromContext, setSelectedConditionsFromContext} = useContext(FilterContext)

    const updateConditions = useCallback((name) =>
        {
            setConditions((prevSelectedConditions)=>{
                switch(name){
                    case "new":
                        setIsNewFocused(!isNewFocused)
                        return {...prevSelectedConditions, [name]:isNewFocused}
                        break
                    case "old":
                        setIsOldFocused(!isOldFocused)
                        return {...prevSelectedConditions, [name]:isOldFocused}
                        break
                    case "new used":
                        setIsNewOldFocused(!isNewOldFocused)
                        return {...prevSelectedConditions, [name]:isNewOldFocused}
                        break
                    default : return{...prevSelectedConditions}
                }
                
            })
        })

    
    useEffect(()=>{
        navigation.setOptions({ title: 'Etat Du Produit' });
    })

    const applyAllUserChoices = () => {
        setSelectedConditionsFromContext(conditions)
        navigation.goBack()
    }

    const handleUserChoice = async (name) => {
        updateConditions(name)
    }

    return (
        <View style={conditionItemStyles.container}>
            <ConditionChoice styles={conditionItemStyles} updateConditions={handleUserChoice} conditions={conditions} />
        
            <View style={[sCategoriesStyles.bottomButtonContainer]}>
                <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : sCategoriesStyles.pressable}} onPress={()=>{applyAllUserChoices()}} />
            </View>
        </View>
    )
}
export default SConditions

const conditionItemStyles =  StyleSheet.create({
    container :
    {
        paddingTop : 20,
        flex : 1,
    },

    checkBox :
    {
        width : screenWidth/2.5,
        paddingLeft : 20
    },
    itemContainer :
    {
        borderWidth : 1,
        borderColor : appColors.lightWhite,
        paddingVertical : 20,
        paddingHorizontal : 10,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center',
        width : '100%',
        backgroundColor : appColors.white,
        //height : 100,
    },  
    contentContainer :
    {
        borderWidth:0, 
        margin:1,
        padding:0, 
        backgroundColor:appColors.white,
    },

   
    checkBoxText :
    {
        marginLeft: 20,
        color:appColors.secondaryColor5,
        fontWeight:"normal",
    },


})
