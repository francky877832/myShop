import React, { useState,  } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, Pressable } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


//custom component
import SearchBar from '../common/SearchBar';

//custom styles
import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';


//custom app datas
import { datas } from '../../utils/sampleDatas';

const Search = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                            
*/}
    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)
    const [isNewFocused, setIsNewPriceFocused] = useState(true)
    const [isOldFocused, setIsOldPriceFocused] = useState(true)


    return(
        <SafeAreaView style={searchStyles.container}>
            <View style={searchStyles.searchBar}>
               <SearchBar placeholder="Rechercher un produit" styles={searchStyles}  />
            </View>

            <View style={searchStyles.filter}>
                <View style={searchStyles.priceContainer}>

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

                <View style={searchStyles.conditionContainer}>
                    <View style={{alignSelf : "center",}}>
                        <Text style={searchStyles.label}>Condition</Text>
                    </View>

                    <View style={searchStyles.checkBox}>
                        <CheckBox  title='Neuf' checked={isNewFocused} onPress={() => { setIsNewPriceFocused(!isNewFocused);  }} />
                        <CheckBox title='Utilisé' checked={isOldFocused} onPress={() => { setIsOldPriceFocused(!isOldFocused); }} />
                    </View>
                </View>

                <View style={searchStyles.categoryContainer}>
                    <View style={{alignSelf : "center",}}>
                        <Text style={searchStyles.label}>Categories</Text>
                    </View>

                    <View style={searchStyles.flatlist}>
                        <FlatList
                            data={datas}
                            renderItem={ ({item}) => { console.log(item.item); return (
                                <Pressable style={[productStyles.card, searchStyles.category, ]} >
                                    <Text style={searchStyles.textCategory}>{item.email}</Text>
                                </Pressable> 
                            )} }
                            keyExtractor={ (item) => { return item.id_.toString(); } }
                            ItemSeparatorComponent ={ (item) => { return <View style={searchStyles.categorySeparator}></View> }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        />
                    </View>
                </View>



                <View style={searchStyles.historyContainer}>
                    <View style={searchStyles.historyLabelContainer}>
                        <Text style={searchStyles.label}>Historique de recherche</Text>
                        <Text style={searchStyles.label}>Vider</Text>
                    </View>

                    <View style={searchStyles.historyFlatlist}>
                        <FlatList
                            data={datas}
                            renderItem={ ({item}) => { console.log(item.item); return (
                                <Pressable style={[ searchStyles.history, ]} >
                                    <Ionicons name="close" size={15} color="red" />
                                    <Text style={searchStyles.textHistory}>{item.email}</Text>
                                </Pressable> 
                            )} }
                            keyExtractor={ (item) => { return item.id_.toString(); } }
                            ItemSeparatorComponent ={ (item) => { return <View style={searchStyles.historySeparator}></View> }}
                            horizontal={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{}}
                        />
                    </View>
                </View>

                
            </View>

            </View>
        </SafeAreaView>
    )
}

export default  Search