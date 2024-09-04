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

const CategoryResults = (props) => {
    const [onExit, setOnExit] = useState(false);
    //const [products, setProducts] = useState([])
   
    //{selectedBrands:selectedBrands, isNewFocused:isNewFocused,isOldFocused:isOldFocused, isNewOldFocusedconditions:isNewOldFocusedconditions,conditions:conditions, selectedModalCategories:selectedModalCategories}
    //{setSelectedBrands:setSelectedBrands, setIsNewFocused:setIsNewFocused,setIsOldFocused:setIsOldFocused, setIsNewOldFocusedconditions:setIsNewOldFocusedconditions,conditions:conditions, selectedModalCategories:selectedModalCategories}

    const route = useRoute()
    const {searchText, display, category} = route.params
    const {
        selectedOrderBy,
       products, setProducts, getSearchedTextWithFilters, refreshComponent,resetAllFiltersWithoutFecthingDatas,
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
                            setProducts(datas)
                        }catch(error){
                            Alert.alert("Erreur", "Une erreur est survenue! "+ error,[{text:"Ok", onPress:()=>navigation.goBack()}])
                        }
        }

        
useEffect(()=>{
    //console.log(searchText)
    cat_reminder = selectedCategories
},[])
        async function getDatas({searchText, selectedModalCategories, selectedCategory={}, selectedBrands, conditions, orderBy})
        {
            //console.log("GETDATAS")
            //console.log({searchText, selectedModalCategories, selectedCategories, selectedBrands, conditions, orderBy})
            
            await loadMoreDataWithFilters({searchText:searchText, selectedCategory:selectedCategory, selectedModalCategories:selectedModalCategories, selectedBrands:selectedBrands, conditions:conditions, orderBy:orderBy})
                            //{searchText:" ", orderBy:selectedOrderBy, selectedCategories:selectedCategories})    
        }

        async function loadMoreData_(){
            await loadMoreDataWithFilters({searchText:searchText, selectedCategory:category, selectedModalCategories:selectedModalCategoriesFromContext, selectedBrands:selectedBrandFromContext, conditions:selectedConditionsFromContext, orderBy:selectedOrderBy, resetPage:false})
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
    //console.log("category");
    //console.log(category);
    //if(!isLoading)
    //    setIsLoading(true)
    
    getDatas({searchText:" ", selectedCategory:category, selectedModalCategories:{}, selectedBrands: {}, conditions:{}, orderBy:selectedOrderBy})

    }, [searchText])

useEffect(() => {
    const cat_reminder = selectedCategories
        const beforeRemoveListener = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            setSelectedCategories(cat_reminder)
            setOnExit(true)
            navigation.dispatch(e.data.action)
        })
        return beforeRemoveListener;
}, [navigation]);
const title = `Resultats de recherche "${searchText}"`
        return(
                <View style={preferencesStyles.container}>
                    {//!(!!display && display == "category") &&
                        <View style={preferencesStyles.top}>
                            <Top searchText={searchText} replaceNavigation={true} />
                        </View>
                    }
    <View style={[{flex:1,}]}>
        <ProductsListWithFilters name="CategoryResults" onExit={onExit} setOnExit={setOnExit} selectedCategory={category} getDatas={getDatas} onEndReached={loadMoreData_} onEndReachedThreshold={0.5} isLoading={isLoading} filters={true} notDisplayFilters={{"categories":false,}} searchText={searchText} datas={products} horizontal={false} styles={preferencesStyles} title={title} display="category"/>
    </View>
                </View>
        )
}

export default  CategoryResults;
