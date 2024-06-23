import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions } from 'react-native';

//custom component
import Top from '../common/Top';
import Product from '../common/Product';
//custom styles
import { preferencesStyles } from '../../styles/preferencesStyles';
import { numProduct } from '../../styles/productStyles';

//custom app datas
import { datas } from '../../utils/sampleDatas';


const Preferences = (propos) => {
{/*
                            numColumns={ calculateNumColumns() }
                            
*/}



    return(
        <SafeAreaView>
            <View style={preferencesStyles.container}>
                <View>
                    <Top/>
                </View>

                <View style={preferencesStyles.preferences}>
                    <FlatList
                        data = {datas}
                        renderItem={ (item) => { return <Product details={item} style={preferencesStyles.listItem} /> } }
                        keyExtractor={ (item) => { return item.id_; } }
                        horizontal={false}
                        numColumns={ numProduct }
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={preferencesStyles.flatlist}
                    />
                </View>
                        <View>
                            <Text>Ok</Text>
                        </View>
                </View>
        </SafeAreaView>
    )
}

export default  Preferences