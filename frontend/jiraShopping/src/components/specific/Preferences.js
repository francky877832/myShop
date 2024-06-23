import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Top from '../common/Top';
import ProductList from '../common/ProductsList';

//custom styles
import { preferencesStyles } from '../../styles/preferencesStyles';
//import { numProduct } from '../../styles/productStyles';


//custom app datas
import { datas } from '../../utils/sampleDatas';

const Preferences = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                            
*/}



    return(
        <SafeAreaView>
            <View style={preferencesStyles.container}>
                <View style={preferencesStyles.top}>
                    <Top />
                </View>

                <View style={preferencesStyles.list}>
                    <ProductList datas={datas} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default  Preferences