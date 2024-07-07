import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, Alert} from 'react-native';

//custom component
import Top from '../common/Top';
import Filters from '../common/Filters';
import RadioProductsList from './RadioProductsList';
//custom styles
import { basketStyles } from '../../styles/basketStyles';
//custom app datas
import { appColors } from '../../styles/commonStyles';
import ProductsListWithFilters from '../common/ProductsListWithFilters';
import { productStyles } from '../../styles/productStyles';

import { BasketContext } from '../../context/BasketContext';

import { basketsProducts } from '../../utils/sampleDatas';

import { server } from '../../remote/server';

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const Basket = (props) => {
    const [isSearch, setIsSearch] = useState(true) //Je ne crois pas avoir besoin de Search
    const [basket, setBasket] = useState([])
    //const {basket, fetchUserBasket} = useContext(BasketContext)

    const fetchUserBasket = async () =>{
        try{
            //console.log("Ok")
                const response = await fetch(`${server}/api/datas/basket/get/${loggedUserId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                });           
                const datas = await response.json()
                        //console.log(datas)
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
            //console.log(datas)
            setBasket(datas)
        }catch(error){
                    Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        }
    }  
useEffect(()=>{
    fetchUserBasket()
    //console.log(basket)
}, [basket])

    return(
        <View style={[basketStyles.container,]}>
                    <View style={[{flex:1,}]}>
                        <RadioProductsList datas={basket} styles={{}} />
                    </View>
        </View>
    )
}

export default  Basket