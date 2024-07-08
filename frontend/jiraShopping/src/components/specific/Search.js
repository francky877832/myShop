import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, Pressable, TouchableHighlight, ScrollView, Modal, Alert } from 'react-native';
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

import { server } from '../../remote/server';
import { useNavigation } from '@react-navigation/native';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"

const Search = (props) => {
    const [searchText, setSearchText] = useState("")
    const [historique, setHistorique] = useState([])
    const searchBarRef = useRef(null)
    const scrollViewRef = useRef(null)
    const navigation = useNavigation()
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

const onChangeText = (val) =>{
        setSearchText(val)
    }

const onSubmitEditing = async () =>{
        let response = null;
        const search = {
            user : loggedUserId,
            username : loggedUser,
            searchText : searchText,
        }
        //console.log(bool)
            try
            {
                response = await fetch(`${server}/api/datas/search/history/update/${loggedUserId}`, {
                    method: 'POST',
                    body: JSON.stringify(search),
                        headers: {
                        'Content-Type': 'application/json',
                },})

                if(!response.ok)
                {
                    const errorData = await response.json();
                    throw new Error("Erreur ",`${response.status}: ${errorData.message}`)
                }


              navigation.navigate("SearchResults", {searchText:searchText})
                Alert.alert("", "Historique ajoute avec success")

            }catch(error)
            {
                console.log(error)
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
   }

const fetchUserHistorique = async () =>{
    try{
//console.log("Ok")
        const response = await fetch(`${server}/api/datas/search/history/get/${loggedUserId}`);            
        const datas = await response.json()
        //console.log(datas)
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        //console.log(datasdatas[0].products)
        
        setHistorique(datas[0].filters)
        //console.log(historique)
    }catch(error){
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }
}

const removeUserHistorique = async (name) => {
    let response = null;
        const search = {
            user : loggedUserId,
            username : loggedUser,
            searchText : name,
        }
        //console.log(bool)
            try
            {
                response = await fetch(`${server}/api/datas/search/history/remove/${loggedUserId}`, {
                    method: 'PUT',
                    body: JSON.stringify(search),
                        headers: {
                        'Content-Type': 'application/json',
                },})

                if(!response.ok)
                {
                    const errorData = await response.json();
                    throw new Error("Erreur ",`${response.status}: ${errorData.message}`)
                }
              
                Alert.alert("", "Historique ajoute avec success")
            }catch(error)
            {
                console.log(error)
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
}

const removeAllUserHistorique = async (name) => {
    let response = null;
        const search = {
            user : loggedUserId,
            username : loggedUser,
            searchText : name,
        }
        //console.log(bool)
            try
            {
                response = await fetch(`${server}/api/datas/search/history/removeAll/${loggedUserId}`, {
                    method: 'PUT',
                    body: JSON.stringify(search),
                        headers: {
                        'Content-Type': 'application/json',
                },})

                if(!response.ok)
                {
                    const errorData = await response.json();
                    throw new Error("Erreur ",`${response.status}: ${errorData.message}`)
                }
              
                //Alert.alert("", "Historique vidé avec success")
            }catch(error)
            {
                console.log(error)
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
}

useEffect(()=>{
    fetchUserHistorique()
}, [historique])

    return(
<View style={[searchStyles.container,{flex:1}]}>
            <View style={[searchStyles.searchBar,{}]}>
               <SearchBar ref={searchBarRef} onChangeText={onChangeText} onSubmitEditing={onSubmitEditing} placeholder="Rechercher un produit" placeholderTextColor={appColors.mainColor} styles={searchStyles} isPrev={true}  />
            </View>

                
            <View style={[searchStyles.filter,{flex:1, paddingBottom:30,}]}>


{/*Suggestion avec un productList
                <View style={{flex:1,}}>        
                    <View style={{height:10,backgroundColor:appColors.white}}></View>
                        <View style={[searchStyles.submit,]}>
                            <Pressable style={[searchStyles.pressableSubmit, productStyles.card]}>
                                <Text style={[searchStyles.label, searchStyles.textSubmit]}>Rechercher</Text>
                            </Pressable>
                        </View>
                </View>
*/}
                

                    <View style={[searchStyles.historyContainer,{flex:1,}]}>
                        <View style={searchStyles.historyLabelContainer}>
                            <Text style={[searchStyles.label, searchStyles.historyLabel]}>Historique de recherche</Text>
                            { datas.length === 0 ? false :
                                <Pressable style={{}}  onPress={()=>{historique.length>0?removeAllUserHistorique():false}}>
                                    <Text style={[searchStyles.label, searchStyles.vider, {color:historique.length>0?appColors.secondaryColor1:appColors.gray}]}>Vider</Text>
                                </Pressable>
                            }
                        </View>


                        <View style={[searchStyles.historyFlatlist, {flex:1,}]}>
                           <FlatList
                                data={historique}
                                renderItem={ ({item}) => {  return (
                                    <Pressable style={[ searchStyles.history, ]} onPress={()=>{navigation.navigate("SearchResults", {searchText:item})}} >
                                        <Pressable style={{}} onPress={()=>{removeUserHistorique(item)}}>
                                            <Ionicons name="close" size={20} color={appColors.secondaryColor1} />
                                        </Pressable>
                                        <Text style={searchStyles.textHistory}>{item}</Text>
                                    </Pressable> 
                                )} }
                                keyExtractor={ (item) => { return Math.random().toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={searchStyles.historySeparator}></View> }}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                                ListEmptyComponent={<EmptyLit giveFocus={_handleFocusTextInput} text="Historique de recherche vide.|Effectuer une recherche." />}
                            />
    
                        </View>
                    </View>
                </View>

        </View>
    )
}

export default  Search