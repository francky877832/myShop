import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
//custom component

//custom styles
import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import SearchBar from '../common/SearchBar';
//custom app datas

const Search = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                            
*/}
    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)
    const [isNewFocused, setIsNewPriceFocused] = useState(true)
    const [isOldFocused, setIsOldPriceFocused] = useState(false)



    return(
        <SafeAreaView style={searchStyles.container}>
            <View style={searchStyles.searchBar}>
               <SearchBar placeholder="Rechercher un produit" />
            </View>

            <View style={searchStyles.filter}>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <Text style={searchStyles.label}>Prix Min.</Text>
                    <Text style={searchStyles.label}>Prix Max.</Text>
                </View>

                <View style={searchStyles.price}>
                    <View style = {[searchStyles.minPrice]}>
                        <TextInput placeholder="Prix min."
                            placeholderTextColor={appColors.mainColor}
                            style = {[searchStyles.input, isMinPriceFocused && searchStyles.inputFocused]}
                            onFocus={() => setIsMinPriceFocused(true)}
                            onBlur={() => setIsMinPriceFocused(false)}
                            onChangeText={(text) => {console.log(text)}}
                        />
                    </View>

                    <Text>-</Text>

                    <View style = {[searchStyles.maxPrice]}>
                        <TextInput placeholder="Prix max."
                            placeholderTextColor={appColors.mainColor}
                            style = {[searchStyles.input, isMaxPriceFocused && searchStyles.inputFocused]}
                            onFocus={() => setIsMaxPriceFocused(true)}
                            onBlur={() => setIsMaxPriceFocused(false)}
                            onChangeText={(text) => {console.log(text)}}
                        />
                    </View>
                </View>

                <View style={searchStyles.condition}>
                    <View style={{alignSelf : "center",}}>
                        <Text style={searchStyles.label}>Condition</Text>
                    </View>

                    <View style={searchStyles.checkBox}>
                        <CheckBox  title='Neuf' checked={isNewFocused} onPress={() => { setIsNewPriceFocused(!isNewFocused);  }} />
                        <CheckBox title='Utilisé' checked={isOldFocused} onPress={() => { setIsOldPriceFocused(!isOldFocused); }} />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default  Search