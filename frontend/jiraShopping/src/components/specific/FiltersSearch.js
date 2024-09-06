import { API_BACKEND } from '@env';

import React, { useState, useEffect, useRef, useContext, useCallback,  } from 'react';
import { View, Text, Pressable, Alert, FlatList} from 'react-native';

import { Icon } from 'react-native-elements';

import { useFocusEffect, } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';
import { appColors, appFont, customText } from '../../styles/commonStyles';
import { searchResultsStyles } from '../../styles/searchStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'

import { filtersSearchStyles } from '../../styles/filtersSearchStyles';
import { FilterContext } from '../../context/FilterContext';

const FiltersSearch = (props) => {

        const route = useRoute()
        const navigation = useNavigation()
        //const { notDisplayFilters } = route.params
        const notDisplayFilters = {'categorie':false}
        const {selectedCategories} = useContext(FilterContext)
        const filters = [{name:"Categories", page:'category'},{name:"Price", page:'price'},{name:"Condition", page:'condition'}, {name:"Couleur", page:'color'}, {name:"Marque", page:'brand'}]

        const showFilters = (page) => {
                //console.log('ok')
                navigation.navigate('ChooseSearchFilters', {datas:{page:page, goBackTo:'ChooseSearchFilters'}})
        }
        return(
                <View style={[filtersSearchStyles.container]}>
                        <View style={[filtersSearchStyles.filtres]}>
                                <FlatList data={filters} keyExtractor={(item)=>{ return item.name.toString();}} renderItem={({item}) => {
                                        return (
                                                <Pressable style={[filtersSearchStyles.pressableFilter, 
                                                        notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersSearchStyles.pressableFilterDisabled:null
                                                        ]} 
                                                        onPress={()=>{showFilters(item.page)}} disabled={notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?true:false} 
                                                >
                                                        <Text style={[customText.text, filtersSearchStyles.itemText, notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersSearchStyles.pressableFilterTextDisabled:null]}>{notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?selectedCategories.name:item.name}</Text>
                                                        <Icon name="chevron-right" type="font-awesome" size={16}  color={appColors.secondaryColor1} />
                                                </Pressable>
                                        )
                                        }}

                                        ItemSeparatorComponent={(item) => {return <View style={{width:20,}}></View>}}
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ }}
                                />
                        </View>
                </View>
        )
}

export default  FiltersSearch;
