import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, Animated, StyleSheet, Pressable, ScrollView, FlatList, Image, Alert, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';


import { Input } from 'react-native-elements';



import { appColors, customText, screenHeight } from '../../../styles/commonStyles';
import { addProductStyles } from '../../../styles/addProductStyles';
import { sCategoriesStyles } from '../../../styles/paths/search/sCategoriesStyles';
import { CustomButton, CustomActivityIndicator } from "../../common/CommonSimpleComponents"

import { Icon, CheckBox, } from 'react-native-elements';

import { FilterContext } from '../../../context/FilterContext';
import { ProductItemContext } from '../../../context/ProductItemContext';
import { capitalizeFirstLetter } from '../../../utils/commonAppFonctions';
import { screenWidth } from '../../../styles/commonStyles';

const SSubCategories = (props) => {
    const route = useRoute()
    const navigation = useNavigation()
    const { category, subCategories } = route.params
    const { selectedCategories, updateCategories, setSelectedCategories, resetAllFilters, updateModalCategories, 
        selectedModalCategoriesFromContext
    } = useContext(FilterContext)
    //const [selectedCategories, setSelectedCategories] = useState({"Vetements": true, "name": "Vetements"})
    const [all, setAll] = useState(false)
    useEffect(()=>{
        resetAllFilters()
    }, [])
    

        


const getCategory = async (cat, subCat) => {
    updateModalCategories(cat+"/"+subCat);
}
const getAllSubCategories = () => {
    setAll(prev=>!prev)

    navigation.reset({
        index: 0, // Réinitialiser la pile à la première route
        routes: [{ name: 'FiltersSearch' }], // Nom de la page spécifique
    })
}


const toggleCheckBox = () => {

}

    return(
        <View style={[sCategoriesStyles.container]}>
                        <Pressable style={[sCategoriesStyles.checkBoxPressable, {height:60} ]} onPress={()=>{ getAllSubCategories() }}>
                            <CheckBox title='Tous Les Categories' containerStyle={[sCategoriesStyles.checkBoxContainer,]} textStyle={[customText.text, sCategoriesStyles.checkBoxText, {color:appColors.secondaryColor1}]} 
                                checked={all}
                                    onPress={() => { getAllSubCategories() }} 
                            />
                        </Pressable>

                    <View style={[{paddingLeft:0}]}>
                        <FlatList
                                data={subCategories}
                                nestedScrollEnabled={true}
                                renderItem={ ({item}) => { return (
                                        <Pressable style={[sCategoriesStyles.checkBoxPressable, ]} onPress={()=>{getCategory(category, item.name)}}>
                                            <CheckBox title={capitalizeFirstLetter(item.name)} containerStyle={[sCategoriesStyles.checkBoxContainer,]} textStyle={[customText.text, sCategoriesStyles.checkBoxText]} 
                                                checked={ selectedModalCategoriesFromContext[category+"/"+item.name] }
                                                onPress={() => {getCategory(category, item.name) }} 
                                            />
                                        </Pressable>
                                        )
                                    }}
                                keyExtractor={ (item) => { return item._id.toString(); } }
                                horizontal={false}
                                numColumns={ 1 }
                                ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={[sCategoriesStyles.flatlist,]}
                                scrollEventThrottle={16}
                            />   
                    </View>         
        </View>
    )
}

export default SSubCategories

