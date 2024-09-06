import { API_BACKEND } from '@env';
import React, { useState, createContext, useRef, useContext, useEffect, useCallback } from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { addModifiedProduct } from '../store/favourites/favouritesSlice';
import { useDispatch } from 'react-redux';

import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";

import { UserContext } from './UserContext';
const ProductContext = createContext()


const ProductProvider = ({children}) => {
    //const { getProducts , loadMoreData, products} = useContext(ProductContext)

    const [products, setProducts]  = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1)
    const {user} = useContext(UserContext)
    const [refreshKey, setRefreshKey] = useState(0);
    const dispatch = useDispatch()


     const getProducts = async (page)=> {
      //console.log("responseJson")
        try
        {
            const response = await fetch(`${server}/api/datas/products/get?page=${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                     'Authorization': `Bearer ${user.token}`, //Vue protege
                },});
                const responseJson = await response.json();
                //console.log(responseJson.datas[0].favourites)
                if(!response.ok){
                  throw new Error("Erreur lors de la recuperation des produits")
                }
                return responseJson.datas
        } catch (error) {
            console.error(error);
            return []
      }
    }

  const updateProducts = (newProducts) => {
    setProducts((prevProducts)=>{
        const uniqueNewProducts = newProducts.filter(
          (nP) => !prevProducts.some((p) => p.id === nP.id)
        );
  
        // Retourner la liste mise à jour avec les nouveaux produits
        return [...prevProducts, ...uniqueNewProducts];
    })
  }

  const isProductPresent = (item, products) => {
    let i = 0, bool = false
    const f = [...products]
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
    return bool
}

  
    const loadMoreData = useCallback(async () => {
      console.log("ook")
      if (isLoading || !hasMore) return;
  
      setIsLoading(true);
      try {

        const newData = await getProducts(page);
    
        //console.log(newData[2].comments)
        if (newData.length > 0) {
          //setProducts(newData)
          //console.log("pk")
          //updateProducts(newData.datas);
          //newData.map((el)=>console.log(el.comments))
          setProducts((prevProducts)=>[...prevProducts, ...newData])
          //if(page < totalPages)
          setPage((prevPage) => prevPage + 1);
          //setRefreshKey(prevKey => prevKey + 1);
          console.log(page)
        } else {
          setHasMore(false); // Pas plus de données à charger
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      } finally {
        setIsLoading(false);
      }
    }, [isLoading, hasMore, page]) //[isLoading, hasMore, page]);

    
    const productHasBeenSold = async (product, sold, visibility)=> {
      const datas = {
        product : product._id,
        sold : sold,
        visibility:visibility
      }
        try
        {
            const response = await fetch(`${server}/api/datas/products/product-sold`,{
                method: 'POST',
                body : JSON.stringify(datas),
                headers: {
                    'Content-Type': 'Application/json',
                     'Authorization': `Bearer ${user.token}`, //Vue protege
                },});
                const responseJson = await response.json();
                //console.log(responseJson.datas[0].favourites)
                if(!response.ok){
                  throw new Error("Erreur lors de la recuperation des produits")
                }
               

                
                return responseJson
        } catch (error) {
            console.error(error);
            return false
      }
    }

    const updateProductViews = async (product)=> {
      const datas = {
        product : product._id,
      }
        try
        {
            const response = await fetch(`${server}/api/datas/products/update-views`,{
                method: 'POST',
                body : JSON.stringify(datas),
                headers: {
                    'Content-Type': 'Application/json',
                     'Authorization': `Bearer ${user.token}`, //Vue protege
                },});
                const responseJson = await response.json();
                if(!response.ok){
                  throw new Error("Erreur lors de la recuperation des produits")
                }
                return responseJson
        } catch (error) {
            console.error(error);
            return false
      }
    }

    const productStateVars = {products, isLoading, refreshKey}
    const productStateStters = {setIsLoading}
    const utilsFunctions = {getProducts, loadMoreData, productHasBeenSold, updateProductViews}
    return (
        <ProductContext.Provider value={{...productStateVars, ...productStateStters, ...utilsFunctions}}>
            {children}
        </ProductContext.Provider>
    )
}



export {ProductContext, ProductProvider}