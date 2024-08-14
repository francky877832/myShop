import { API_BACKEND } from '@env';
import React, { useState, createContext, useRef, useContext, useEffect, useCallback } from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';


import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";
import { reshapeComments  } from '../utils/commonAppFonctions';


import { UserContext } from './UserContext';


const CommentsContext = createContext()

const loggedUser = 'Francky'

const CommentsProvider = ({children}) => {
    //const { getProducts , loadMoreData, products} = useContext(ProductContext)

    //const [comments, setComments] = useState([])
    const [reshapedComments, setReshapedComments] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalComments, setTotalComments] = useState(1)
    const {user} = useContext(UserContext)
    const [refreshKey, setRefreshKey] = useState(0);
    const [filtersUpdated, setFiltersUpdated] = useState(false);
    const [onNewComment, setOnNewComment] = useState(false)
    const [isResponseTo, setIsResponseTo] = useState(null)
    const COMMENT_PER_PAGE = 3



    const fetchProductComments = async (id, page) =>{
        //console.log("cm")
        let comments_ = []
        try{
    //console.log("Ok")
            const response = await fetch(`${server}/api/datas/comments/get/${id}?page=${page}`);            
            comments_ = await response.json()
            //console.log(comments_)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            //console.log(datasdatas[0].products)
            //console.log(comments_.datas)
            setTotalComments(comments_.totalDatas)
            
            //const cm = reshapeComments(comments_.datas)
            /*console.log("cm.length")
            console.log(cm.length)
            console.log(comments.length)
            if(cm.length != comments.length)
            {
                setIsLoading(true)
            }*/
                
            //console.log(cm)
            return comments_.datas
            //Alert.alert("Commentaire recuperes avec success")
        }catch(error){
            //Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            console.log(error)
            return []
        }
    }


    
    const fetchProductLastComment = async (id, username) =>{
        let comment = []
        try{
    //console.log("Ok")
            const response = await fetch(`${server}/api/datas/comments/get/last/${id}?user=${username}`);            
            comment = await response.json()
            //console.log(comments_)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            return comment
        }catch(error){
            console.log(error)
            return []
        }finally {
            setOnNewComment(false);
        }
    }

    const loadMoreComments = useCallback(async (product) => {
        console.log("ook")
        /*if(onNewComment)
            searchAgain_()*/
        console.log(onNewComment)
        console.log(isLoading)
        console.log(hasMore)
        
        if(onNewComment)
        {
            try 
            {
  
                const comment_ = await fetchProductLastComment(product._id, loggedUser);
                let updatedComments;
                setReshapedComments((prevComments)=>{
                    if(!!isResponseTo)
                    {
                            //console.log("prevComments")
                        updatedComments = prevComments.map(cm => {
                            if (cm._id == comment_.isResponseTo) {
                                return {
                                    ...cm,
                                    subComment: [...cm.subComment, comment_]
                                };
                            }
                            return cm;
                        });
                        product.comments = updatedComments
                        return updatedComments
                    }
                    else
                    {
                            //product.comments.unshift(comment_)
                            //prevComments[0] = comment_
                            updatedComments = [comment_, ...prevComments.slice(1)];
                            product.comments = updatedComments
                            return updatedComments
                    }
                })
                

                

            }catch (error) {
                console.error('Erreur lors du chargement des commentaires onNewComment :', error);
            }finally {
                setIsLoading(false);
                setOnNewComment(false);
                setIsResponseTo("")
            }
        }

/*
        if (isLoading || !hasMore) return;
    
        setIsLoading(true);
        try {
  
          const comments_ = await fetchProductComments(productId, page);
          console.log(comments_)
          if (comments_?.length > 0) {
            //console.log(comments_)
            console.log("pk")
            //updateProducts(newData.datas);
            //setComments((prevComments)=>[...prevComments, ...comments_])
            setReshapedComments((prevComments)=>{  
                return [...prevComments, ...comments_]
            })
            //console.log(comments_.length)
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
        }finally {
            setIsLoading(false);
            setOnNewComment(false);
        }*/

      }, [isLoading, hasMore, page]) //[isLoading, hasMore, page]);    

    const searchAgain = useCallback(async () => {
        setIsLoading(false);
        setHasMore(true);

        //setPage(1);
        //setComments([]);
        //setFiltersUpdated(true);
    },[isLoading, hasMore])

    const searchAgain_ =  useCallback(() => {
        setPage((prevPage) => prevPage - 1);
        setIsLoading(false);
        setHasMore(true);
        
        //setPage(1);
        //setComments([]);
        //setFiltersUpdated(true);
        
    }, [page, isLoading, hasMore])

    const productStateVars = {isLoading, filtersUpdated, hasMore, page, refreshKey, reshapedComments, totalComments, onNewComment, isResponseTo}
    const productStateStters = {setIsLoading, setOnNewComment, setPage, setIsResponseTo}
    const utilsFunctions = {fetchProductComments, loadMoreComments, searchAgain, searchAgain_, setReshapedComments,}
    return (
        <CommentsContext.Provider value={{...productStateVars, ...productStateStters, ...utilsFunctions}}>
            {children}
        </CommentsContext.Provider>
    )
}



export {CommentsContext, CommentsProvider}