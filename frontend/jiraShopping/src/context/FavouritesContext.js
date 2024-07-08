import React, { useState, createContext, useEffect } from "react";
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
                console.log(tmp_fav)
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

    const addFavourite = async (item, bool) => {
        let response = null;
        const favourite = {
            useer : loggedUserId,
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

    const fetchUserFavourites = async () =>{
            try{
    //console.log("Ok")
                const response = await fetch(`${server}/api/datas/favourites/get/${loggedUserId}`);            
                const datas = await response.json()
                //console.log(datas)
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                //console.log(datasdatas[0].products)
                setFavourites(datas[0].productDetails)
            }catch(error){
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
            }
    }

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

//hook pour initialiser le contexte avec les donnees de mongoDB
    useEffect(()=>{
        fetchUserFavourites()
        //console.log(favourites)
    }, [])

    const favouritesStateVars = {favourites, liked}
    const favouritesStateStters = {hasLiked, setLikedIcon}
    const utilsFunctions = {addFavourite, }// removeFavourite}
    return (
        <FavouritesContext.Provider value={{...favouritesStateVars, ...favouritesStateStters, ...utilsFunctions}}>
            {children}
        </FavouritesContext.Provider>
    )
}



export {FavouritesContext, FavouritesProvider}