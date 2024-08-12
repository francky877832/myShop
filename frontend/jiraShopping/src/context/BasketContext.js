import { API_BACKEND } from '@env';

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
    const [selectedProducts, setSelectedProducts] = useState({})
    const [selectedSeller, setSelectedSeller] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoading, setIsLoading]  = useState(true)


    const addBasketContext = (item) => {
        setBasket((prevState) =>{
            //item.liked = bool
            //console.log(item.id_)
            const tmp = isBasketPresent(item)
            const isPresent = tmp[0], i = tmp[1]
            if(isPresent)
            {
                prevState[i] = item
                let tmp_fav = [...prevState]
                //console.log(tmp_fav)
                tmp_fav.splice(i,1)
                //console.log("tmp_fav")
                //console.log([...prevState])
                return tmp_fav
            }
            else
            {
                //console.log([...prevState, item])
                return [...prevState, item]
            }

            

        })
    }



const addBasket = async (item) => {
    const basket = {
        user : loggedUserId,
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
            addBasketContext(item)
    }catch(error){
        console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }
}

const removeBasket = async (item) => {
    const basket = {
        useer : loggedUserId,
        username : loggedUser,
        product : item._id,
    }
    try
    {
        response = await fetch(`${server}/api/datas/basket/remove/${loggedUserId}`, {
            method: 'PUT',
            body: JSON.stringify(basket),
            headers: {
                'Content-Type': 'application/json',
            },})
            if(!response.ok)
            {
                throw new Error("Erreur lors de la suppression du panier")
            }
            addBasketContext(item)
            //Alert.alert("Succes Lors de la supression de basket")
    }catch(error){
        console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }
}


const isBasketPresent = (item) => {
    let i = 0, bool = false
    const f = [...basket]
    while(i < f.length)
    {
        if(f[i]._id == item._id)
        {
            bool = true
            break
        }
        i++
    }
    //console.log(i)
    return [bool, i]
}

const updateSelectedProducts = (item, bool) => {
    setSelectedProducts((prevState)=>{
       /* let price = totalPrice
        if(!!prevState[item._id])
            price -= item.price
        else
            price += item.price
        price = price<0 ? price*-1 :price
        setTotalPrice(price) //a modifier pour gerer les propositions + la commission
*/
    const sp = { ...prevState,
        [item._id] : bool==="remove" ? false : !prevState[item._id]
    }
    updateTotalPrice(sp)

        return sp
    })
}

const updateTotalPrice = (spro) => {
    console.log(spro)
    //console.log("ok")
    let price = 0
    setTotalPrice((prevPrice)=>{
        let sp = basket.filter((item)=>{
                return (spro[item._id]===true)
        })
        //console.log(sp)
        for(let el of sp){
            price += el.price //OR new price or Personnal Price
        }
        return price
    })
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
                setBasket(datas[0].productDetails)
    }catch(error){
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }
}

    useEffect(()=>{
        const fetchData = async () => {
            //setIsLoading(true);
            await fetchUserBasket()
            setIsLoading(false);
          };
      
          if (isLoading) {
            fetchData();
          }
        //console.log(basket)
    }, [isLoading])

    const basketStateVars = {basket,selectedProducts, selectedSeller, totalPrice, isLoading}
    const  basketStateStters = {setBasket, setSelectedSeller, setIsLoading}
    const utilsFunctions = {addBasket, fetchUserBasket, removeBasket, updateSelectedProducts, isBasketPresent, updateTotalPrice}// removeFavourite}
    return (
        <BasketContext.Provider value={{...basketStateVars, ...basketStateStters, ...utilsFunctions}}>
            {children}
        </BasketContext.Provider>
    )
}



export {BasketContext, BasketProvider}