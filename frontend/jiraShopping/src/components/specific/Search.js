import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, TextInput, FlatList, Pressable, TouchableHighlight, ScrollView, Modal, Alert, RefreshControlComponent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


//custom component
import SearchBar from '../common/SearchBar';
import EmptyLit from '../common/EmptyList';
import { ScreenHeight } from 'react-native-elements/dist/helpers';
//custom styles
import { appColors, appFont } from '../../styles/commonStyles';
import { searchStyles } from '../../styles/searchStyles';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { screenHeight } from '../../styles/commentsStyles';

import { server } from '../../remote/server';
import { useNavigation } from '@react-navigation/native';
import { FilterContext } from '../../context/FilterContext';
const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"

const Search = (props) => {
    const [searchText, setSearchText] = useState("")
    const [historique, setHistorique] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const searchBarRef = useRef(null)
    const scrollViewRef = useRef(null)
    const navigation = useNavigation()
    const {resetAllFiltersWithoutFecthingDatas, setSelectedCategories} = useContext(FilterContext)
    
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

const onSubmitEditing = () =>{
        let response = null;
        const search = {
            user : loggedUserId,
            username : loggedUser,
            searchText : searchText,
        }
        //console.log(bool)
            try
            {
                navigation.navigate("SearchResults", {searchText:searchText})
                setTimeout(async() => {
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
                    Alert.alert("", "Historique ajoute avec success")

                        setIsLoading(true)
                    }, 0); 

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
              
                //Alert.alert("", "Historique ajoute avec success")
                //setRefreshComponent(!refreshComponent)
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
                //setRefreshComponent(!refreshComponent)
                //Alert.alert("", "Historique vidé avec success")
            }catch(error)
            {
                //console.log(error)
                //Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
}
useEffect(()=>{
    resetAllFiltersWithoutFecthingDatas()
    //console.log("Search")
}, [])
useEffect(()=>{
    console.log("fetchUserHistorique")
    const fetchData = async () => {
        
       if(isLoading)
       {
        await fetchUserHistorique()
        setIsLoading(false);
       }
    };

      fetchData()
    
}, [isLoading])

const handlePress = async (item) => {

    // Naviguer immédiatement vers le nouvel écran
    //await getSearchedTextWithFilters({searchText:item, selectedModalCategories:{}, selectedBrands:{}, conditions:{}, orderBy:selectedOrderBy})
    //setIsLoading(false)
    //resetAllFiltersWithoutFecthingDatas()
    setSelectedCategories({})
    navigation.navigate("SearchResults", {searchText:item})
    
};

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
                                    <Pressable style={[ searchStyles.history,  ]} onPress={()=>{/*resetAllFiltersWithoutFecthingDatas();*/handlePress(item)}} >
                                        <Pressable style={{}} onPress={()=>{removeUserHistorique(item);}}>
                                            <Ionicons name="close" size={20} color={appColors.secondaryColor1} />
                                        </Pressable>
                                        <Text style={searchStyles.textHistory}>{item}</Text>
                                    </Pressable> 
                                )} }
                                keyExtractor={ (item) => { return item.toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={searchStyles.historySeparator}></View> }}
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{}}
                                ListEmptyComponent={<EmptyLit giveFocus={_handleFocusTextInput} text="Historique de recherche vide.|Effectuer une recherche." />}
                            />
                    {isLoading && 
                        <CustomActivityIndicator styles={{}} /> 
                    }
                        </View>
                    </View>
                </View>

        </View>
    )
}

export default  Search