import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';

//custom styles
import { favouritesStyles } from '../../styles/favouritesStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';
import { productStyles } from '../../styles/productStyles';

const Favourites = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={preferencesStyles} />
                        
*/}

    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search

    return(
        <View style={[favouritesStyles.container,]}>
                    <View style={[favouritesStyles.top]}>
                        <Top />
                    </View>
                    <View style={[{flex:1,paddingBottom:40,}]}>
                        <ProductsListWithFilters datas={datas} horizontal={false} title="Mes Favoris" />
                    </View>
        </View>
    )
}

export default  Favourites