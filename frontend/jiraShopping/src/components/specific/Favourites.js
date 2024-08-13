import React, { useState, useEffect, createContext, useContext, useRef, useCallback,  } from 'react';
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

import { useSelector, useDispatch } from 'react-redux';
import { fetchUserFavourites } from '../../store/favourites/favouritesSlice'; 


const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"

const Favourites = (props) => {

   // const {favourites, isLoading, loadMoreFavouriteProducts} = useContext(FavouritesContext)
   const dispatch = useDispatch();
   const { favourites, isLoading, page, hasMore } = useSelector((state) => state.favourites);

    const [datas, setDatas] = useState([])
//console.log(favourites)
    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search
    
    const loadMoreFavouriteProducts = useCallback(() => {
        //dispatch(fetchUserFavourites({user:loggedUserId, page:page}));
    },[fetchUserFavourites, loggedUserId, page])


    return(
        <View style={[favouritesStyles.container,]}>
                    <View style={[favouritesStyles.top]}>
                        <Top />
                    </View>
                    <View style={[{flex:1,paddingBottom:0,}]}>
                        <ProductsListWithFilters  isLoading={isLoading} onEndReached={loadMoreFavouriteProducts} onEndReachedThreshold={100} filters={false} datas={favourites} horizontal={false} title="Mes Favoris" />
                    </View>
        </View>
    )
}

export default  Favourites