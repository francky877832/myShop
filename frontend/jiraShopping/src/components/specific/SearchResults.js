import React, { useState, useEffect, useRef, useContext,  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';
import { appColors, appFont } from '../../styles/commonStyles';
import { searchResultsStyles } from '../../styles/searchStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';
import { useRoute } from '@react-navigation/native';

import Top from '../common/Top';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

import { FilterContext } from '../../context/FilterContext';

import { server } from '../../remote/server';
import { serialize } from '../../utils/commonAppFonctions';

const SearchResults = (props) => {

    //const [products, setProducts] = useState([])
    
    
    const route = useRoute()
    const searchText = route.params.searchText
    const { setSelectCategories, setSelectedOrderBy, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice, 
        selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, selectedBrands,
        _handlePress, updateCategories, updateSelectedBrands, products, setProducts, getSearchedTextWithFilters, refreshComponent,
        } = useContext(FilterContext)

    
    useEffect(()=>{
        getSearchedTextWithFilters(searchText,selectedOrderBy)
    }, [refreshComponent])
        return(
                <View style={preferencesStyles.container}>
                        <View style={preferencesStyles.top}>
                            <Top />
                        </View>
    <View style={[{flex:1,}]}>
        <ProductsListWithFilters name="SearchResults" filters={true} searchText={searchText} datas={products} horizontal={false} styles={preferencesStyles} title={`Resultats de recherche "${searchText}"`}/>
    </View>
                </View>
        )
}

export default  SearchResults;
