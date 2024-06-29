import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';

//custom styles
import { preferencesStyles } from '../../styles/preferencesStyles';
import SearchResults from './SearchResults';

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

const Preferences = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={preferencesStyles} />
                        
*/}

    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search

    return(
        <SafeAreaView style={{flex:1,}}>
                <View style={preferencesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>

                { isSearch ?
                            <ProductsListWithFilters datas={datas} horizontal={false} styles={preferencesStyles} />
                    :
                        <View style={[{}]}>
                            <SearchResults styles={{}}/>
                        </View>
                }
                </View>
        </SafeAreaView>
    )
}

export default  Preferences