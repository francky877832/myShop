import { API_BACKEND } from '@env';

import React, { useState, useEffect, useRef, useContext, useCallback,  } from 'react';
import { View, Text, Pressable, Alert} from 'react-native';

import { useFocusEffect, } from '@react-navigation/native';
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
   
    //{selectedBrands:selectedBrands, isNewFocused:isNewFocused,isOldFocused:isOldFocused, isNewOldFocusedconditions:isNewOldFocusedconditions,conditions:conditions, selectedModalCategories:selectedModalCategories}
    //{setSelectedBrands:setSelectedBrands, setIsNewFocused:setIsNewFocused,setIsOldFocused:setIsOldFocused, setIsNewOldFocusedconditions:setIsNewOldFocusedconditions,conditions:conditions, selectedModalCategories:selectedModalCategories}

    const route = useRoute()
    const {searchText, display} = route.params
    const {
        selectedOrderBy,
       searchedProducts, setSearchedProducts, getSearchedTextWithFilters, refreshComponent,resetAllFiltersWithoutFecthingDatas,
        isLoading, setIsLoading , selectedCategories , setSelectedCategories, loadMoreDataWithFilters, selectedModalCategoriesFromContext, 
        selectedBrandFromContext, selectedConditionsFromContext
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
                setSearchedProducts(datas)
            }catch(error){
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,[{text:"Ok", onPress:()=>navigation.goBack()}])
            }
        }

        async function getDatas({searchText, selectedModalCategories, selectedBrands, conditions, orderBy, resetPage, search})
        {
            //console.log("GETDATAS")
            //console.log({searchText, selectedModalCategories, selectedBrands, conditions, orderBy, resetPage})
            //if(!isLoading)
            //    setIsLoading(true)

            await loadMoreDataWithFilters({searchText:searchText, selectedModalCategories:selectedModalCategories, selectedBrands:selectedBrands, conditions:conditions, resetPage:resetPage, search:search})
           // setIsLoading(false)    
        }

        async function loadMoreData_(){
            await loadMoreDataWithFilters({searchText:searchText, selectedModalCategories:selectedModalCategoriesFromContext, selectedBrands:selectedBrandFromContext, conditions:selectedConditionsFromContext, orderBy:selectedOrderBy, resetPage:false, search:true})
        }
  /*  
useFocusEffect(
    useCallback(()=>{
        console.log(searchText)
        if(!isLoading)
            setIsLoading(true)
        getDatas({searchText:searchText, selectedModalCategories:{}, selectedBrands: {}, conditions:{}, orderBy:selectedOrderBy})

    }, [searchText])
)
*/
useEffect(()=>{
    console.log("selectedCategories");
    //if(!isLoading)
    //    setIsLoading(true)
    //searchAgainWithoutUpdate()
    getDatas({searchText:searchText, selectedModalCategories:{}, selectedBrands: {}, conditions:{}, orderBy:selectedOrderBy, resetPage:true, search:true})

    }, [searchText])



const title = `Resultats de recherche "${searchText}"`

        return(
                <View style={preferencesStyles.container}>
                    {//!(!!display && display == "category") && 
                    
                        <View style={preferencesStyles.top}>
                            <Top searchText={searchText} />
                        </View>
                        
                    }
    <View style={[{flex:1,}]}>
        <ProductsListWithFilters name="SearchResults" getDatas={getDatas} onEndReached={loadMoreData_} onEndReachedThreshold={0.5} isLoading={isLoading} filters={true} searchText={searchText} datas={searchedProducts} horizontal={false} styles={preferencesStyles} title={title} display="category"/>
    </View>
                </View>
        )
}

export default  SearchResults;
