import { API_BACKEND } from '@env';

import React, { useState, createContext, useEffect, useCallback, useContext} from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';


import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";

import { getOrders, updateOrderRead, updateOrderStatus } from '../utils/commonAppNetworkFunctions'
import { UserContext } from './UserContext';


const OrdersContext = createContext()

const OrdersProvider = ({children}) => {
    const { user } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1);
    const limit = 100
    const [hasMore, setHasMore] = useState(true);
    const [orders, setOrders] = useState([])
    const [isNewDatas, setIsNewDatas] = useState(false)

const fetchUserOrders = async (user, page, limit) => {
        //console.log("data.orders")
        try{
            
            const response = await fetch(`${server}/api/datas/orders/get/${user._id}?page=${page}&limit=${limit}`);            
            const data = await response.json()
           
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            
            return data.orders
        }catch(error){
            console.log(error)
            console.log("Get Offers", "Une erreur est survenue! "+ error,)
            return []
        }
    }
    
const updateOrderRead = async (itemId, productId) => {
        const order = {
            product : productId
        }
    
        try{
            
            const response = await fetch(`${server}/api/datas/orders/update/read/${itemId}`, {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
            },})          
            //const datas = await response.json()
                    //console.log(datas)
            
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                //console.log(datas)
                return true
        }catch(error){
            console.log(error)
            Alert.alert("Erreur", "Une erreur est survenue! "+ error.message)
            return false
        }
    }
    
const updateOrderStatus = async (itemId, productId, status) => {
        //console.log(item)
        const order = {
            product : productId,
            status : status
        }
        try{
            
            const response = await fetch(`${server}/api/datas/orders/offer/update/status/${itemId}`, {
                method: 'PUT',
                body: JSON.stringify(order),
                headers: {
                    'Content-Type': 'application/json',
            },})          
            //const datas = await response.json()
                    //console.log(datas)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
                //console.log(datas)
                return true
        }catch(error){
            console.log(error)
            Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            return false
        }
    }
    
    
    
  const getOrders = useCallback(async (user, page, limit) => {
    
    if (isLoading || !hasMore) return;
  
    setIsLoading(true);
    try {
      const newData = await fetchUserOrders(user, page, limit);
      //console.log(getOrders)
      if (newData?.length > 0) {
        !isNewDatas ? setOrders((prevOrders)=>[...prevOrders, ...newData]) : setOrders(newData)
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, page])

   
    const favouritesStateVars = { orders, isLoading, hasMore, page}
    const favouritesStateStters = { setIsLoading,  setHasMore, setPage, setOrders, setIsNewDatas }
    const utilsFunctions = { getOrders, updateOrderRead, updateOrderStatus  }
    return (
        <OrdersContext.Provider value={{...favouritesStateVars, ...favouritesStateStters, ...utilsFunctions}}>
            {children}
        </OrdersContext.Provider>
    )
}



export {OrdersContext, OrdersProvider}