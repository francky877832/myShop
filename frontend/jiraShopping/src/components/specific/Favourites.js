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

const Favourites = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={preferencesStyles} />
                        
*/}

    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search

    return(
        <SafeAreaView style={{flex:1,}}>
                <ScrollView style={favouritesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>

                <ProductsListWithFilters datas={datas} horizontal={false} title="Mes Favoris" />
                </ScrollView>
        </SafeAreaView>
    )
}

export default  Favourites