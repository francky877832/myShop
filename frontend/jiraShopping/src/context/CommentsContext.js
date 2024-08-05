import { API_BACKEND } from '@env';
import React, { useState, createContext, useRef, useContext, useEffect, useCallback } from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';


import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";
import { reshapeComments  } from '../utils/commonAppFonctions';


import { UserContext } from './UserContext';
const CommentsContext = createContext()


const CommentsProvider = ({children}) => {
    //const { getProducts , loadMoreData, products} = useContext(ProductContext)

    const [comments, setComments] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1)
    const {user} = useContext(UserContext)
    const [refreshKey, setRefreshKey] = useState(0);
    const [filtersUpdated, setFiltersUpdated] = useState(false);



    const fetchProductComments = async (id, page) =>{
        console.log("cm")
        let comments_ = []
        try{
    //console.log("Ok")
            const response = await fetch(`${API_BACKEND}/api/datas/comments/get/${id}?page=${page}`);            
            comments_ = await response.json()
            //console.log(comments_)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            //console.log(datasdatas[0].products)
            //console.log(comments_.datas)
            const cm = reshapeComments(comments_.datas)
            /*console.log("cm.length")
            console.log(cm.length)
            console.log(comments.length)
            if(cm.length != comments.length)
            {
                setIsLoading(true)
            }*/
                
            //console.log(cm)
            return cm
            //Alert.alert("Commentaire recuperes avec success")
        }catch(error){
            //Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            console.log(error)
            return []
        }
    }

    const loadMoreComments = useCallback(async (id) => {
        console.log("ook")
        console.log(hasMore)
        if (isLoading || !hasMore) return;
    
        setIsLoading(true);
        try {
  
          const comments_ = await fetchProductComments(id, page);
          //console.log(comments_)
          if (comments_.length > 0) {
            //console.log(comments_)
            console.log("pk")
            //updateProducts(newData.datas);
            setComments((prevProducts)=>[...prevProducts, ...comments_])
            //console.log(comments_)
            //if(page < totalPages)
            setPage((prevPage) => prevPage + 1);
            //setRefreshKey(prevKey => prevKey + 1);
            //console.log(page)
          } else {
            setHasMore(false); // Pas plus de données à charger
          }
        } catch (error) {
          console.error('Erreur lors du chargement des commentaires :', error);
        } finally {
          setIsLoading(false);
        }
      }, [isLoading, hasMore, page]) //[isLoading, hasMore, page]);    

      const searchAgain = async () => {
        setIsLoading(false);
        setHasMore(true);
        setPage(1);
        setComments([]);
        setFiltersUpdated(true);
    }

    const productStateVars = {isLoading, filtersUpdated, hasMore, page, refreshKey, comments}
    const productStateStters = {setIsLoading, setComments}
    const utilsFunctions = {fetchProductComments, loadMoreComments, searchAgain}
    return (
        <CommentsContext.Provider value={{...productStateVars, ...productStateStters, ...utilsFunctions}}>
            {children}
        </CommentsContext.Provider>
    )
}



export {CommentsContext, CommentsProvider}