import { API_BACKEND } from '@env';
import React, { useState, createContext, useContext, useEffect, useCallback } from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';


import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";

import { UserContext } from './UserContext';
const ProductContext = createContext()


const ProductProvider = ({children}) => {
    //const { getProducts , loadMoreData, products} = useContext(ProductContext)

    const [products, setProducts]  = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1)
    const {user} = useContext(UserContext)

     const getProducts = async (page)=> {
      //console.log("responseJson")
        try
        {
            const response = await fetch(`${API_BACKEND}/api/datas/products/get?page=${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                     'Authorization': `Bearer ${user.token}`, //Vue protege
                },});
                const responseJson = await response.json();
                //console.log(responseJson)
                return responseJson
        } catch (error) {
            console.error(error);
            return []
      }
    }

  
    const loadMoreData = useCallback(async () => {
      console.log("ook")
      if (!hasMore) return;
  
      setIsLoading(true);
      try {

        const newData = await getProducts(page);
        //console.log(newData)
        if (newData.datas.length > 0) {
          //setProducts(newData)
          console.log("pk")
          setProducts((prevData) => [...prevData, ...newData.datas]);
          //if(page < totalPages)
            setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false); // Pas plus de données à charger
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      } finally {
        setIsLoading(false);
      }
    }, [isLoading, hasMore, page]);

    const productStateVars = {products, isLoading}
    const productStateStters = {setIsLoading}
    const utilsFunctions = {getProducts, loadMoreData}
    return (
        <ProductContext.Provider value={{...productStateVars, ...productStateStters, ...utilsFunctions}}>
            {children}
        </ProductContext.Provider>
    )
}



export {ProductContext, ProductProvider}