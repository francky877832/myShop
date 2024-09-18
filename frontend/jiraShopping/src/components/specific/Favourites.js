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
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { debouncer } from '../../utils/commonAppFonctions';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"

const Favourites = (props) => {

   // const {favourites, isLoading, loadMoreFavouriteProducts} = useContext(FavouritesContext)
   const dispatch = useDispatch();
   const isFocused = useIsFocused()
   const {user, isAuthenticated, } = useContext(UserContext)
   const { favourites, isLoading, page, hasMore, modifiedProducts } = useSelector((state) => state.favourites);
   const basket = useSelector((state) => state.basket.basket);
   
    const [datas, setDatas] = useState([])
//console.log(favourites)
    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search

    const emptyMessage="Votre liste de favoris est vide. Depechez-vous pour visiter les produits que vous porriez aimer !"
    const emptyIcon = {type:"font-awesome-5", name:"heart-broken", size:100, color:appColors.secondaryColor1, message:emptyMessage}



    
    const loadMoreFavouriteProducts = useCallback(() => {
        //dispatch(fetchUserFavourites({user:user._id, page:page}));
    },[fetchUserFavourites, page])

/* En le faisant on modifie aıtomatiquement modified product*/
    /*useEffect(() => {
        if (isFocused) {
            debouncer(dispatch, 3000)(fetchUserFavourites({user:user._id, page:page}));
            //console.log('FavouritesRefreshed')
        }
      }, [isFocused]);*/

      //basket={basket} pour reactualiser les favourites lorsquon ajoute un produi a basket
    return(
        <View style={[favouritesStyles.container,]}>
                    <View style={[favouritesStyles.top]}>
                        <Top />
                    </View>
                    <View style={[{flex:1,paddingBottom:0,}]}>
                        <ProductsListWithFilters emptyIcon={emptyIcon} basket={basket} isLoading={isLoading} onEndReached={loadMoreFavouriteProducts} onEndReachedThreshold={100} filters={false} datas={favourites} horizontal={false} title="Mes Favoris" />
                    </View>
        </View>
    )
}

export default  Favourites