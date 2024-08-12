import { API_BACKEND } from '@env';

import React, { useState, createContext, useEffect, useCallback } from "react";
import { Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native';


import { datas } from "../utils/sampleDatas";
import { server } from "../remote/server";

const FavouritesContext = createContext()

const loggedUser = "Francky"
const loggedUserId = "66715deae5f65636347e7f9e"
const FavouritesProvider = ({children}) => {

    const [favourites, setFavourites] = useState([])
    const [liked, setLikedIcon ] = useState()
    const [isLoading, setIsLoading]  = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalComments, setTotalComments] = useState(1)


        
    const addFavouriteContext = (item, bool) => {
        setFavourites((prevState) =>{
            //item.liked = bool
            //console.log(item.id_)
            const tmp = isFavouritePresent(item)
            const isPresent = tmp[0], i = tmp[1]
            if(isPresent)
            {
                prevState[i] = item
                let tmp_fav = [...prevState]
                //console.log(tmp_fav)
                tmp_fav.splice(i,1)
                //console.log(tmp_fav)
                //console.log([...prevState])
                return tmp_fav
            }
            else
            {
                //console.log([...prevState, item])
                return [item, ...prevState]
            }

            

        })
    }

    const addFavourite = async (item, bool) => {
        let response = null;
        const favourite = {
            user : loggedUserId,
            username : loggedUser,
            product : item._id,
        }
        //console.log(bool)
            try{
                if(bool)
                {
                    response = await fetch(`${server}/api/datas/favourites/update/${loggedUserId}`, {
                        method: 'POST',
                        body: JSON.stringify(favourite),
                        headers: {
                            'Content-Type': 'application/json',
                        },})
                        
                        responseLikes = await fetch(`${server}/api/datas/products/likes/update/${item._id}`, {
                            method: 'PUT',
                            body: JSON.stringify({updateLikes:1}),
                            headers: {
                                'Content-Type': 'application/json',
                            },
    
                        });
                        item.likes++
                }
                else
                {
                    //console.log("fine")
                    response = await fetch(`${server}/api/datas/favourites/remove/${loggedUserId}`, {
                        method: 'PUT',
                        body: JSON.stringify(favourite),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    responseLikes = await fetch(`${server}/api/datas/products/likes/update/${item._id}`, {
                        method: 'PUT',
                        body: JSON.stringify({updateLikes:-1}),
                        headers: {
                            'Content-Type': 'application/json',
                        },

                    });
                    item.likes > 0 ? item.likes-- : false
                    //console.log("REMOVE LIKE")

                }        
                    
                /*if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }*/
                addFavouriteContext(item, bool)
                const responseData = await response.json(); // Convertir la réponse en JSON
                console.log('Réponse de l\'API:', responseData);
                return responseData;
            }catch(error){
                console.log(error)
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
    }

    const fetchUserFavourites = async (username, page) =>{
            try{
    //console.log("Ok")
                const response = await fetch(`${server}/api/datas/favourites/get/${username}?page=${page}`);            
                const datas = await response.json()
                //console.log(datas)
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                //console.log(datasdatas[0].products)
                return datas
            }catch(error){
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
    }

    const loadMoreFavouriteProducts = useCallback(async () => {
        console.log("thennn")
        console.log(hasMore)
        if (isLoading || !hasMore) return;
    
        setIsLoading(true);
        try {
  
          const datas = await fetchUserFavourites(loggedUserId, page);
          const products = datas.datas
          //console.log(comments_)
          if (products.length > 0) {
            //console.log(comments_)
            console.log("pk")
            //updateProducts(newData.datas);
            //setComments((prevComments)=>[...prevComments, ...comments_])
            setFavourites((prevProducts)=>[...prevProducts, ...products[0].productDetails])
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
        }
      }, [isLoading, hasMore, page])

    const hasLiked = (item) => {
       /* if(favourites.length != 0)
        {
            const fav = [...favourites]
            for(let i in fav)
            {
                if(fav[i]._id == item._id)
                {
                    return true
                    break;
                }
            }
        }
        return false*/
        //console.log("FAVOURITES")
        //console.log(favourites)
        return isFavouritePresent(item)[0]
    }



    const isFavouritePresent = (item) => {
        let i = 0, bool = false
        const f = [...favourites]
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



    
    /*
        Hook pour initialiser le contexte avec les donnees de mongoDB
        Gotta be here to pre-charge favourites on Preferences
    */
    useEffect(()=>{
       
        const fetchData = async () => {
            //setIsLoading(true);
            await loadMoreFavouriteProducts()
        };
      
        //if (isLoading) {
            fetchData();
        //}
        //console.log(favourites)
    }, [])


    const favouritesStateVars = {favourites, liked, isLoading}
    const favouritesStateStters = {hasLiked, setLikedIcon, setIsLoading}
    const utilsFunctions = {addFavourite, loadMoreFavouriteProducts }// removeFavourite}
    return (
        <FavouritesContext.Provider value={{...favouritesStateVars, ...favouritesStateStters, ...utilsFunctions}}>
            {children}
        </FavouritesContext.Provider>
    )
}



export {FavouritesContext, FavouritesProvider}