import React, { useState, createContext, useEffect } from "react";
import { datas } from "../utils/sampleDatas";

const FavouritesContext = createContext()

const FavouritesProvider = ({children}) => {

    const [favourites, setFavourites] = useState([])
        
    const addFavourite = (item, bool) => {
        setFavourites((prevState) =>{
            item.liked = bool
            //console.log(item.id_)
            const tmp = isFavouritePresent(item)
            const isPresent = tmp[0], i = tmp[1]
            if(isPresent)
            {
                prevState[i] = item
                console.log([...prevState])
                return [...prevState]
            }
            else
            {
                console.log([...prevState, item])
                return [...prevState, item]
            }

            

        })
    }


    const isFavouritePresent = (item) => {
        let i = 0, bool = false
        const f = [...favourites]
        while(i < f.length)
        {
            if(f[i].id_ == item.id_)
            {
                bool = true
                break
            }
            i++
        }
        console.log(i)
        return [bool, i]
    }

    useEffect(()=>{}) //pour initialiser le contexte avec les donnees de mongoDB


    const favouritesStateVars = {favourites}
    const favouritesStateStters = {}
    const utilsFunctions = {addFavourite,}// removeFavourite}
    return (
        <FavouritesContext.Provider value={{...favouritesStateVars, ...favouritesStateStters, ...utilsFunctions}}>
            {children}
        </FavouritesContext.Provider>
    )
}



export {FavouritesContext, FavouritesProvider}