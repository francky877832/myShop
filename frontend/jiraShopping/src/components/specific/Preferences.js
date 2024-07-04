import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing} from 'react-native';

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

const Preferences = (props) => {
    const [isSearch, setIsSearch] = useState(false) 


    return(
            <View style={preferencesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>
<View style={[{flex:1,}]}>
                { isSearch ?
                        <ProductsListWithFilters filters={true} datas={datas} horizontal={false} styles={preferencesStyles} title="Resultats de recherche" />
                    :
                    <View style={{flex:1}}>
                        <ProductsListWithFilters filters={true} datas={datas} horizontal={false} styles={preferencesStyles} title="Produits tendances..." />
                    </View>
                }

    </View>
            </View>
    )
}

export default  Preferences