import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, Pressable, TouchableHighlight, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


//custom component
import SearchBar from '../common/SearchBar';
import EmptyLit from '../common/EmptyList';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
//custom styles
import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';
import { productDetailsStyles } from '../../styles/productDetailsStyles';
import { customText } from '../../styles/commonStyles';
import ProductsList from '../common/ProductsList';
import Filters from '../common/Filters';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { screenHeight } from '../../styles/commentsStyles';

const Search = (props) => {
    

    

    const searchBarRef = useRef(null)
    const scrollViewRef = useRef(null)
    //const datas = []

/*
   
*/
    const _handleFocusTextInput = () => {
        if (searchBarRef.current) {
            searchBarRef.current.focus();
        }
      };
    const _scrollToTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    };

   

    return(
<SafeAreaView style={[searchStyles.container,{}]}>
            <View style={[searchStyles.searchBar,{}]}>
               <SearchBar ref={searchBarRef}  placeholder="Rechercher un produit" placeholderTextColor={appColors.mainColor} styles={searchStyles} isPrev={true}  />
            </View>

        <ScrollView contentContainerStyle={{flex:1,backgroundColor:appColors.white,}}>
                
            <View style={searchStyles.filter}>


{/*Suggestion avec un productList*/}
            <View style={{flex:1,}}>        
                <View style={{height:10,backgroundColor:appColors.white}}></View>
                    <View style={[searchStyles.submit,]}>
                        <Pressable style={[searchStyles.pressableSubmit, productStyles.card]}>
                            <Text style={[searchStyles.label, searchStyles.textSubmit]}>Rechercher</Text>
                        </Pressable>
                    </View>
            </View>

                

                    <View style={searchStyles.historyContainer}>
                        <View style={searchStyles.historyLabelContainer}>
                            <Text style={[searchStyles.label, searchStyles.historyLabel]}>Historique de recherche</Text>
                            { datas.length === 0 ? false :
                                <Pressable style={{}} >
                                    <Text style={[searchStyles.label, searchStyles.vider]}>Vider</Text>
                                </Pressable>
                            }
                        </View>


                        <View style={searchStyles.historyFlatlist}>
                            <FlatList
                                data={datas}
                                renderItem={ ({item}) => {  return (
                                    <Pressable style={[ searchStyles.history, ]} >
                                        <Pressable style={{}} >
                                            <Ionicons name="close" size={20} color={appColors.secondaryColor1} />
                                        </Pressable>
                                        <Text style={searchStyles.textHistory}>{item.email}</Text>
                                    </Pressable> 
                                )} }
                                keyExtractor={ (item) => { return item.id_.toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={searchStyles.historySeparator}></View> }}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                                ListEmptyComponent={<EmptyLit giveFocus={_handleFocusTextInput} text="Historique de recherche vide.|Effectuer une recherche." />}
                            />
                        </View>
                    </View>
                </View>
                

            </ScrollView>
        </SafeAreaView>
    )
}

export default  Search