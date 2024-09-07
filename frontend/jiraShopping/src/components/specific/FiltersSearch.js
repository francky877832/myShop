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
import { ProductItemContext } from '../../context/ProductItemContext';
import { capitalizeFirstLetter } from '../../utils/commonAppFonctions';

const FiltersSearch = (props) => {

        const route = useRoute()
        const navigation = useNavigation()
        //const { notDisplayFilters } = route.params
        const notDisplayFilters = {'categorie':false}
        const {setSelectedBrand,  selectedColor, setSelectedColor, categories, brands, isLoading} = useContext(ProductItemContext)
        const {selectedCategories, selectedModalCategoriesFromContext, selectedBrandFromContext, setSelectedBrandFromContext,
                selectedConditionsFromContext, setSelectedConditionsFromContext,
                minPriceFromContext, maxPriceFromContext, selectedColorFromContext
         } = useContext(FilterContext)
        const filters = [{name:"Categories", page:'category'},{name:"Prix", page:'price'},{name:"Conditions", page:'condition'}, {name:"Couleurs", page:'color'}, {name:"Marques", page:'brand'}]

        const showFilters = (page) => {
                //console.log('ok')
                navigation.navigate('ChooseSearchFilters', {datas:{page:page, goBackTo:'ChooseSearchFilters'}})
        }
        const FiltersSearchItem = (props) => {
                const { item } = props
                let selectedFilters = ''

                function splitSelectedFilters(text){
                        if(text.length > 20)
                        {
                                return text.substring(0,20)+'...'
                        }
                        return text
                }

                switch(item.name.toLowerCase())
                {
                        case 'categories':
                                selectedFilters = Object.keys(selectedModalCategoriesFromContext).filter((key)=>{ return selectedModalCategoriesFromContext[key]===true}).join(', ')
                        break;
                        case 'marques':
                                selectedFilters = Object.keys(selectedBrandFromContext).filter((key)=>{ return selectedBrandFromContext[key]===true}).join(', ')
                        break;
                        case 'conditions':
                                selectedFilters = Object.keys(selectedConditionsFromContext).filter((key)=>{ return selectedConditionsFromContext[key]===true}).join(', ')
                        break;
                        case 'prix':
                                selectedFilters = minPriceFromContext && maxPriceFromContext ? minPriceFromContext +  ' - ' + maxPriceFromContext + ' XAF' : null
                        break;
                        case 'couleurs':
                                selectedFilters = Object.keys(selectedColorFromContext).filter((key)=>{ return selectedColorFromContext[key]===true}).map(el => capitalizeFirstLetter(el)).join(', ')
                        break;
                        default : break;
                }
                return (
                        <Pressable style={[filtersSearchStyles.pressableFilter, 
                                notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersSearchStyles.pressableFilterDisabled:null
                                ]} 
                                onPress={()=>{showFilters(item.page)}} disabled={notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?true:false} 
                        >
                                <View style={[{}]}>
                                        <Text style={[customText.text, filtersSearchStyles.itemText, notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersSearchStyles.pressableFilterTextDisabled:null]}>{notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?selectedCategories.name:item.name}</Text>
                                </View>
                                
                                <View style={[{justifyContent:'center'}]}>
                                        <View style={[{alignItems:'flex-end'}]}>
                                                <Icon name="chevron-right" type="font-awesome" size={16}  color={appColors.secondaryColor1} />
                                        </View>
                                        { selectedFilters &&
                                                <Text style={[customText.text, filtersSearchStyles.selectedFilters, notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersSearchStyles.pressableFilterTextDisabled:null]}>{splitSelectedFilters(selectedFilters)}</Text>
                                        }
                                </View>
                        </Pressable>
                )
        }
        return(
                <View style={[filtersSearchStyles.container]}>
                        <View style={[filtersSearchStyles.filtres]}>
                                <FlatList data={filters} keyExtractor={(item)=>{ return item.name.toString();}} renderItem={({item}) => {
                                        return (
                                                <FiltersSearchItem item={item} />
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
