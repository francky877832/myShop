import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Alert} from 'react-native';

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

import { FavouritesContext } from '../../context/FavouritesContext';
import { server } from '../../remote/server';
import { Button } from 'react-native-elements';

const Preferences = (props) => {
    const [isSearch, setIsSearch] = useState(false) 
    const [products, setProducts] = useState([])
    const {favourites, liked, setLikedIcon } = useContext(FavouritesContext)
    const [refreshComponent, setRefreshComponent] = useState(false)
const getProducts = async ()=> {
    try
    {
        const response = await fetch(`${server}/api/datas/products/get`,{
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },
            });
            const responseJson = await response.json();
            setProducts(responseJson)
    } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
        getProducts()
        //console.log("WE ARE IN PREF")
        //console.log(products)
       /* let p = [...products]
       for(let el of p)
        {
            el.liked = false
            for(let f of favourites)
            {
                if(el._id==f._id)
                {
                    el.liked = f.liked
                    
                }
            }
        }
    setProducts(p)
    console.log(products)
    for(let el of products)
    {
       console.log(el.liked)
    }
    //Alert.alert("ChokPref")*/
}, [refreshComponent])
    return(
            <View style={preferencesStyles.container}>
                    <View style={preferencesStyles.top}>
                        <Top />
                    </View>
<View style={[{flex:1,}]}>
    <Button title="Ok" onPress={()=>setRefreshComponent(!refreshComponent)}></Button>
                { isSearch ?
                        <ProductsListWithFilters name="Preference" filters={true} datas={products} horizontal={false} styles={preferencesStyles} title="Resultats de recherche" />
                    :
                    <View style={{flex:1}}>
                        <ProductsListWithFilters name="Preference" filters={true} datas={products} horizontal={false} styles={preferencesStyles} title="Produits tendances..." />
                    </View>
                }

    </View>
            </View>
    )
}

export default  Preferences