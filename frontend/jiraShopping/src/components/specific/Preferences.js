import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Alert} from 'react-native';

//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';

//custom styles
import { preferencesStyles } from '../../styles/preferencesStyles';
import SearchResults from './SearchResults';
import { screenHeight, screenWidth } from '../../styles/commonStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

import { FavouritesContext } from '../../context/FavouritesContext';
import { FilterContext } from '../../context/FilterContext';
import { server } from '../../remote/server';
import { Button } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';

const Preferences = (props) => {
    const [isSearch, setIsSearch] = useState(false) 
    const [products, setProducts] = useState([])
    const {favourites, liked, setLikedIcon } = useContext(FavouritesContext)
    const {getSearchedTextWithFilters, refreshComponent, setRefreshComponent} = useContext(FilterContext)
    const {user} = useContext(UserContext)
const getProducts = async ()=> {
    try
    {
        const response = await fetch(`${server}/api/datas/products/get`,{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                 'Authorization': `Bearer ${user.token}`, //Vue protege
            },});
            const responseJson = await response.json();
            setProducts(responseJson)
    } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
    getProducts()
}, [refreshComponent])
    return(
            <View style={preferencesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>
<View style={[{flex:1,}]}>
                { isSearch ?
                        <ProductsListWithFilters name="Preference" filters={true} datas={products} horizontal={false} styles={preferencesStyles} title="Resultats de recherche" />
                    :
                    <View style={{flex:1}}>
                        <ProductsListWithFilters name="Preference" filters={false} datas={products} horizontal={false} styles={preferencesStyles} title="Produits tendances..." />
                    </View>
                }

    </View>
            </View>
    )
}

export default  Preferences