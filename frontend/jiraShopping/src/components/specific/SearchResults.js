import React, { useState, useEffect, useRef,  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';
import { appColors, appFont } from '../../styles/commonStyles';
import { searchResultsStyles } from '../../styles/searchStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';

import Top from '../common/Top';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

import { server } from '../../remote/server';
const SearchResults = (props) => {

    const [products, setProducts] = useState([])
    const searchText = "telephone"
    
    const getProducts = async ()=> {
        try
        {
            const response = await fetch(`${server}/api/datas/products/get`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                },
                });
                const responseJson = await response.json();
                setProducts(responseJson)
        } catch (error) {
        console.error(error);
      }
    }
    
    useEffect(()=>{
            getProducts()
    }, [])
        return(
                <View style={preferencesStyles.container}>
                        <View style={preferencesStyles.top}>
                            <Top />
                        </View>
    <View style={[{flex:1,}]}>
        <ProductsListWithFilters name="SearchResults" filters={true} datas={products} horizontal={false} styles={preferencesStyles} title={`Resultats de recherche "${searchText}"`}/>
    </View>
                </View>
        )
}

export default  SearchResults;
