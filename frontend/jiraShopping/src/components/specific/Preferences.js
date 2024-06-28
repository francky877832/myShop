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

const Preferences = (props) => {
{/*
                            numColumns={ calculateNumColumns() }
                            
*/}

    const [isSearch, setIsSearch] = useState(true)

    return(
        <SafeAreaView style={{flex:1,}}>
                <View style={preferencesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>

                { !isSearch ?
                        <View style={preferencesStyles.list}>
                            <ProductsList datas={datas} horizontal={false} styles={{}} />
                        </View>
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