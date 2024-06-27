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
import Filters from '../common/Filters';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { screenHeight } from '../../styles/commentsStyles';

const Search = (props) => {
    
    const [selectedCategories, setSelectCategories] = useState({})
    const [selectedOrderBy, setSelectedOrderBy] = useState("")

    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    

    const searchBarRef = useRef(null)
    const scrollViewRef = useRef(null)
    //const datas = []
    
    const _handlePress = (id) => {
        setSelectCategories((prevSlectedCategories)=>{
            console.log(prevSlectedCategories)
            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    }

    const updateCategories = (id) => {
        setSelectCategories((prevSlectedCategories)=>{
            console.log(prevSlectedCategories)

            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    }
/*
    const updateOrderBy = (id1, id2) => {
        setSelectedOrderBy((prev)=>{
            console.log(prev)
            next1 = !prev[id1]
            next2 = prev[id2]
            if(next1 == next2 == true)
                next2 = false
            
            return ({
                ...prev,
                [id1] : next1,
                [id2] : next2,
            })
        })
    }
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
        <SafeAreaView style={[searchStyles.container,{height:screenHeight}]}>
            <View style={searchStyles.searchBar}>
               <SearchBar ref={searchBarRef}  placeholder="Rechercher un produit" placeholderTextColor={appColors.mainColor} styles={searchStyles} isPrev={true}  />
            </View>

            <ScrollView contentContainerStyle={{flex:1,}}>
                
            <View style={searchStyles.filter}>

                <Filters prices={[minPrice, setMinPrice, maxPrice, setMaxPrice ]} orderBy={[selectedOrderBy, setSelectedOrderBy]} category={[selectedCategories, _handlePress]} isNewFocused={isNewFocused} isOldFocused={isOldFocused} setIsNewFocused={setIsNewFocused} setIsOldFocused={setIsOldFocused} />


                    <View style={[searchStyles.submit,]}>
                        <Pressable style={[searchStyles.pressableSubmit, productStyles.card]}>
                            <Text style={[searchStyles.label, searchStyles.textSubmit]}>Rechercher</Text>
                        </Pressable>
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