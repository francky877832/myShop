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
    const [selectedBrands, setSelectedBrands] = useState({})
    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [isNewOldFocused, setIsNewOldFocused] = useState(true)
    const [conditions, setConditions] = useState({})
    const [selectedModalCategories, setSelectedModalCategories] = useState(selectedCategories)   
    //{selectedBrands:selectedBrands, isNewFocused:isNewFocused,isOldFocused:isOldFocused, isNewOldFocusedconditions:isNewOldFocusedconditions,conditions:conditions, selectedModalCategories:selectedModalCategories}
    //{setSelectedBrands:setSelectedBrands, setIsNewFocused:setIsNewFocused,setIsOldFocused:setIsOldFocused, setIsNewOldFocusedconditions:setIsNewOldFocusedconditions,conditions:conditions, selectedModalCategories:selectedModalCategories}

    const route = useRoute()
    const {searchText, display} = route.params
    const {
        selectedOrderBy,
       products, setProducts, getSearchedTextWithFilters, refreshComponent,resetAllFiltersWithoutFecthingDatas,
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
        setIsLoading(true)
    //console.log("searchText")
},[])

        async function getDatas({searchText, selectedModalCategories, selectedBrands, conditions, orderBy})
        {
            console.log("GETDATAS")
            console.log({searchText, selectedModalCategories, selectedBrands, conditions})
            if(!isLoading)
                setIsLoading(true)

            if(!!display && display == "category")
            {
                 
                    await getSearchedTextWithFilters({searchText:searchText, selectedModalCategories:selectedModalCategories, selectedBrands:selectedBrands, conditions:conditions, orderBy:orderBy})
                        //{searchText:" ", orderBy:selectedOrderBy, selectedCategories:selectedCategories})
                  
            }
            else
            {
                await getSearchedTextWithFilters({searchText:searchText, selectedModalCategories:selectedModalCategories, selectedBrands:selectedBrands, conditions:conditions, orderBy:orderBy})
            }  
            setIsLoading(false)      
        }
useEffect( ()=>{ 
        getDatas({searchText:searchText, selectedModalCategories:{}, selectedBrands: {}, conditions:{}, orderBy:selectedOrderBy})
    console.log("ok")
}, [])

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
        <ProductsListWithFilters name="SearchResults" getDatas={getDatas} isLoading={isLoading} filters={true} searchText={searchText} datas={products} horizontal={false} styles={preferencesStyles} title={`Resultats de recherche "${searchText}"`}/>
    </View>
                </View>
        )
}

export default  SearchResults;
