import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Top from '../common/Top';
import Filters from '../common/Filters';
import RadioProductsList from './RadioProductsList';
//custom styles
import { basketStyles } from '../../styles/basketStyles';
//custom app datas
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';
import { productStyles } from '../../styles/productStyles';


import { basketsProducts } from '../../utils/sampleDatas';

const Basket = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                                <ProductsList datas={datas} horizontal={false} styles={preferencesStyles} />
                        
*/}

    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search

    return(
        <View style={[basketStyles.container,]}>
                    <View style={[{flex:1,}]}>
                        <RadioProductsList datas={basketsProducts} styles={{}} />
                    </View>
        </View>
    )
}

export default  Basket