import React, { useState, useEffect, useRef, useContext,  } from 'react';
import { View, Text, Pressable, Alert} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';
import { appColors, appFont } from '../../styles/commonStyles';
import { searchResultsStyles } from '../../styles/searchStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'

import Top from '../common/Top';
import ProductsListWithFilters from '../common/ProductsListWithFilters';

import { FilterContext } from '../../context/FilterContext';
import { UserContext } from '../../context/UserContext';
import { ProductItemContext } from '../../context/ProductItemContext';

import { server } from '../../remote/server';
import { serialize } from '../../utils/commonAppFonctions';

const SearchResults = (props) => {

    //const [products, setProducts] = useState([])
    
    
    const route = useRoute()
    const {searchText, display} = route.params
    const {setSelectedOrderBy, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice, 
        selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, selectedBrands,
        _handlePress, updateCategories, updateSelectedBrands, products, setProducts, getSearchedTextWithFilters, refreshComponent,resetAllFiltersWithoutFecthingDatas,
        isLoading, setIsLoading , selectedCategories , setSelectedCategories 
    } = useContext(FilterContext)
    //console.log(selectedCategories)
        //const {selectedCategory,  } = useContext(ProductItemContext)
        const {user} = useContext(UserContext)
        const navigation = useNavigation()


        const getProductsFromCategories = async () =>{
            //console.log(selectedCategories)
            const category = {
                category : selectedCategories.name,
                subCategory : JSON.stringify([selectedCategories.subCategories])

            }
        //console.log(serialize(category))
            try{
                //console.log(user)
                            const response = await fetch(`${server}/api/datas/products/categories?${serialize(category)}`, {
                                headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`,
                              },});            
                            const datas = await response.json()
                            //console.log(datas)
                            setProducts(datas)
                        }catch(error){
                            Alert.alert("Erreur", "Une erreur est survenue! "+ error,[{text:"Ok", onPress:()=>navigation.goBack()}])
                        }
        }
useEffect(()=>{
    if(!isLoading)
        //setIsLoading(true)
    console.log(searchText)
},[])
    useEffect( ()=>{
        async function getDatas()
        {
            if(!!display && display == "category")
            {
                //console.log("pkkkk")
                //getProductsFromCategories()
                if(isLoading)
                {    
                    //setIsLoading(true)
                    await getSearchedTextWithFilters({searchText:" ", orderBy:selectedOrderBy, selectedCategories:selectedCategories})
                   // setIsLoading(false)
                }
            }
            else{console.log("There")
                if(isLoading)
                {  console.log("Therec")
                    //setSelectedCategories({})
                    await getSearchedTextWithFilters({searchText:searchText, selectedModalCategories:{}, selectedBrands:{}, conditions:{}, orderBy:selectedOrderBy})
                    //setIsLoading(false)
                }
            }
        }
        getDatas()
        
    }, [ ])

/*useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            //resetAllFiltersWithoutFecthingDatas()
            navigation.dispatch(e.data.action)
        })
        return beforeRemoveListener;
}, [navigation]);*/

        return(
                <View style={preferencesStyles.container}>
                        <View style={preferencesStyles.top}>
                            <Top />
                        </View>
    <View style={[{flex:1,}]}>
        <ProductsListWithFilters name="SearchResults" isLoading={isLoading} filters={true} searchText={searchText} datas={products} horizontal={false} styles={preferencesStyles} title={`Resultats de recherche "${searchText}"`}/>
    </View>
                </View>
        )
}

export default  SearchResults;
