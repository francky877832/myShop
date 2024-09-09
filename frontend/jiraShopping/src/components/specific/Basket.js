import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, Alert} from 'react-native';

//custom component
import Top from '../common/Top';
import Filters from '../common/Filters';
import RadioProductsList from './RadioProductsList';
import { CustomActivityIndicator } from '../common/CommonSimpleComponents'

//custom styles
import { basketStyles } from '../../styles/basketStyles';
//custom app datas
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';
import { productStyles } from '../../styles/productStyles';

import { BasketContext } from '../../context/BasketContext';
import { basketsProducts } from '../../utils/sampleDatas';

import { server } from '../../remote/server';

import { useSelector, useDispatch } from 'react-redux';
import { selectBasket, selectIsLoading, selectError, fetchUserBasket } from '../../store/baskets/basketsSlice';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const Basket = (props) => {
    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()
    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search
    //const [basket, setBasket] = useState([])
    //const {basket, fetchUserBasket, isLoading} = useContext(BasketContext)
    const {user, isAuthenticated, } = useContext(UserContext)

    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket.basket);
    const isLoading = useSelector((state) => state.basket.status);
    const error = useSelector((state) => state.basket.error);

    useEffect(() => {
        if (isFocused) {
            dispatch(fetchUserBasket(user._id));
            //console.log('newBasket')
        }
      }, [isFocused]);

    return(
        <View style={[basketStyles.container,]}>
            <View style={[{flex:1,}]}>
                <RadioProductsList route={route} navigation={navigation} datas={basket} styles={{}} />   
                    {
                        isLoading && 
                            <CustomActivityIndicator styles={{}} /> 
                    }
            </View>
        </View>
    )
}

export default  Basket