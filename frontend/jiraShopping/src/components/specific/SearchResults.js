import React, { useState, useEffect, useRef, useContext,  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';
import { appColors, appFont } from '../../styles/commonStyles';
import { searchResultsStyles } from '../../styles/searchStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';

import Top from '../common/Top';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

import { FilterContext } from '../../context/FilterContext';

import { server } from '../../remote/server';
const SearchResults = (props) => {

    const [products, setProducts] = useState([])
    
    const searchText = "ord"
    const { setSelectCategories, setSelectedOrderBy, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice,
        selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, selectedBrands,
        _handlePress, updateCategories, updateSelectedBrands,
        } = useContext(FilterContext)
    //console.log(selectedOrderBy) 
    const getSearchedProducts = async ()=> {

        const serialize = (obj) => {
            const str = [];
            for (const p in obj)
              if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
              }
            return str.join('&');
          };

        const filters = {
            name : searchText,
        }
        const queryString = serialize(filters)
        try
        {
            const response = await fetch(`${server}/api/datas/products/search?${queryString}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                if(!response.ok) 
                    throw new Error("Erreur lors de la recherhce de produit")
                const responseJson = await response.json();
                //console.log(responseJson)
                setProducts(responseJson)
        } catch (error) {
        console.error(error);
      }
    }
    
    useEffect(()=>{
        getSearchedProducts()
    })
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
