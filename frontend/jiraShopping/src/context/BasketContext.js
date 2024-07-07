import React, { useState, createContext, useEffect } from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';

import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";

const BasketContext = createContext()

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const BasketProvider = ({children}) => {

    const [basket, setBasket] = useState([])
    
const addBasket = async (item) => {
    const basket = {
        useer : loggedUserId,
        username : loggedUser,
        product : item._id,
    }
    try
    {
        response = await fetch(`${server}/api/datas/basket/update/${loggedUserId}`, {
            method: 'POST',
            body: JSON.stringify(basket),
            headers: {
                'Content-Type': 'application/json',
            },})
            if(!response.ok)
            {
                throw new Error("Erreur lors de l'ajout au panier")
            }
    }catch(error){
        console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }
}

const fetchUserBasket = async () =>{
    try{
        //console.log("Ok")
            const response = await fetch(`${server}/api/datas/basket/get/${loggedUserId}`);            
            const datas = await response.json()
                    //console.log(datas)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
                //console.log(datas)
                setBasket(datas.productDetails)
    }catch(error){
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }
}

    useEffect(()=>{
        //fetchUserBasket()
        //console.log(basket)
    },[])

    const basketStateVars = {basket, }
    const  basketStateStters = {}
    const utilsFunctions = {addBasket, fetchUserBasket}// removeFavourite}
    return (
        <BasketContext.Provider value={{...basketStateVars, ...basketStateStters, ...utilsFunctions}}>
            {children}
        </BasketContext.Provider>
    )
}



export {BasketContext, BasketProvider}