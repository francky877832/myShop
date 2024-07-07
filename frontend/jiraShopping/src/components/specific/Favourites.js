import React, { useState, useEffect, createContext, useContext, useRef,  } from 'react';
import { View, } from 'react-native';

//custom component
import Top from '../common/Top';
import ProductsList from '../common/ProductsList';

//custom styles
import { favouritesStyles } from '../../styles/favouritesStyles';
import { preferencesStyles } from '../../styles/preferencesStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';
import { productStyles } from '../../styles/productStyles';
import { FavouritesContext } from '../../context/FavouritesContext';

const Favourites = (props) => {

    const {favourites} = useContext(FavouritesContext)
    const [datas, setDatas] = useState([])
//console.log(favourites)
    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search
    useEffect(()=>{
        /*let tmp = []
        for(el of favourites)
        {
            if(el.liked)
            {
                tmp.push(el)
            }
        }
        setDatas(tmp)*/
    }, [favourites])
    return(
        <View style={[favouritesStyles.container,]}>
                    <View style={[favouritesStyles.top]}>
                        <Top />
                    </View>
                    <View style={[{flex:1,paddingBottom:0,}]}>
                        <ProductsListWithFilters filters={false} datas={favourites} horizontal={false} title="Mes Favoris" />
                    </View>
        </View>
    )
}

export default  Favourites