import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

import { serialize } from '../utils/commonAppFonctions'
import { server } from '../remote/server'
import { UserContext } from './UserContext'
const FilterContext = createContext()
const FilterProvider = ({children}) => {
    const [isLoading, setIsLoading]  = useState(true)

    const [selectedCategories, setSelectedCategories] = useState({"Vetements": true, "name": "Vetements"})
    //const [selectedModalCategories, setSelectedModalCategories] = useState({})

    //const [selectedBrands, setSelectedBrands] = useState({})

    const [selectedOrderBy, setSelectedOrderBy] = useState("")

    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [isNewOldFocused, setIsNewOldFocused] = useState(true)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [products, setProducts] = useState([])

    const [refreshComponent, setRefreshComponent] = useState(false)
    const {user} = useContext(UserContext)


    const _handlePress = useCallback((id) => {
        setSelectedCategories((prevSlectedCategories)=>{
            //console.log(prevSlectedCategories)
            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    })

   /* const updateModalCategories = useCallback((id) => {
        setSelectedModalCategories((prevSelectedCategories) => {
            /*console.log(({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            }))*/
/*
            return ({
                ...prevSelectedCategories,
                [id] : !prevSelectedCategories[id], 
            })
        })
    })*/

    const updateCategories = useCallback((id, path) => {
        setSelectedCategories((prevSelectedCategory) => {
            if(path==undefined)
            {        //console.log(id)
                if(prevSelectedCategory["name"] == id)
                    return {[id] : prevSelectedCategory[id], name:id,}
                return {[id] : !prevSelectedCategory[id], name:id,}
                
            }
            else if(path=="complete_category")
            {
                return {[id] : true, name:id,}
            }
            else
            { //console.log(path)
                return {[id] : true, name:id, subCategories:path}
            }
        })
    })

    /*const updateSelectedBrands = useCallback((name) => {
        setSelectedBrands((prevSlectedBrands)=>{
                //console.log(prevSlectedCategories)
        
                return ({
                    ...prevSlectedBrands,
                    [name] : !prevSlectedBrands[name], 
                })
            })

    })*/

    const getSearchedTextWithFilters = useCallback(async ({searchText, orderBy, selectedModalCategories, selectedBrands, conditions}) =>
    {
        console.log({searchText, orderBy, selectedModalCategories, selectedBrands, conditions, selectedCategories})
        //setIsLoading(true)
        //setSelectedOrderBy(orderBy);
        //console.log(selectedCategories)
        selectedModalCategories = selectedModalCategories || {}
        let categories;
        if(Object.keys(selectedModalCategories).length>0)
        {
            
            categories = Object.keys(selectedModalCategories).filter((key)=>{ return selectedModalCategories[key]===true})
            if(!!selectedCategories.subCategories)
                categories.push(`${categories.name}/${categories.subCategories}`)
            setSelectedCategories({})
        }
        else
        {
            categories = Object.keys(selectedCategories).filter((key)=>{ return selectedCategories[key]===true})
            if(!!selectedCategories.subCategories)
            {
                /* En cas sous categroie, on neglige la categorie et on est plus specifique */
                categories.pop()
                categories.push(`${selectedCategories.name}/${selectedCategories.subCategories}`)
            }
            selectedModalCategories={}
        }
        console.log(categories)
        //console.log(categories)
        selectedBrands = selectedBrands || {}
        let brands = Object.keys(selectedBrands).filter((key)=>{ return selectedBrands[key]==true})
        //console.log(selectedBrands)
        conditions = conditions || {}
        let condition = []
        conditions["old"] && condition.push("used")
        conditions["new"] && condition.push("new")
        conditions["new used"] && condition.push("new used")
        //console.log(condition)
        
        const filters = {
            name : searchText?.trim(),
            customFilters : {
                categories : categories || [],
                brands : brands || [],
                minPrice : minPrice.replace('.',''),
                maxPrice : maxPrice.replace('.',''),
                condition : condition || [],
            },
        }
        let order_by = {};
        switch(orderBy?.toLowerCase())
        {
            case "prix asc" :
                order_by = {price : 1}
                filters["customFilters"]["orderBy"] = order_by
                break;
            case "prix desc" :
                order_by = {price : -1}
                filters["customFilters"]["orderBy"] = order_by
                break
            case "plus recents" :
                order_by = {updatedAt : -1}
                filters["customFilters"]["orderBy"] = order_by
                break
            case "plus anciens" :
                order_by = {updatedAt : 1}
                filters["customFilters"]["orderBy"] = order_by
                break
            case "nom asc" :
                order_by = {name : 1}
                filters["customFilters"]["orderBy"] = order_by
            case  "nom desc" :
                order_by = {name : -1}
                filters["customFilters"]["orderBy"] = order_by  
                break
            default : break;
        }
     
        //console.log(filters)
        const queryString = serialize(filters)
       // console.log(queryString)
        try
        {
            const response = await fetch(`${server}/api/datas/products/search?${queryString}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //const j = await response.json();
            //console.log(j)
                if(!response.ok) 
                    throw new Error(`Erreur lors de la recherhce de produit${response.text()}`)
                const responseJson = await response.json();
                //console.log(responseJson)
                setProducts(responseJson)
                //setIsLoading(false)
               
                //setSelectedCategories({"Vetements": true, "name": "Vetements"}) //OR NOT
                //setRefreshComponent(!refreshComponent)

        } catch (error) {
            setIsLoading(false)
            console.error(error.message);
        
      }
    })

    

    const resetAllFiltersWithoutFecthingDatas = useCallback(() => {
        setIsLoading(true)
        setSelectedCategories({})
        //setSelectedBrands([])
        setSelectedOrderBy("")
        setMinPrice("")
        setMaxPrice("")
        
        //setRefreshComponent(!refreshComponent)
        //console.log("resetAllFiltersWithoutFecthingDatas")
    })

    const resetAllFilters = useCallback((searchText) => {
        setIsLoading(true)
        setSelectedCategories({})
        //setSelectedBrands([])
        setSelectedOrderBy("")
        setMinPrice("")
        setMaxPrice("")
        //setRefreshComponent(!refreshComponent)
        
        //getSearchedTextWithFilters({searchText:searchText})
    })



    const filterStateVars = {refreshComponent, isLoading, selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, products}
    const filterStateSetters = {setRefreshComponent, setIsLoading, setSelectedCategories, setSelectedOrderBy, setIsNewFocused,setIsNewOldFocused, isNewOldFocused, setIsOldFocused, setMinPrice, setMaxPrice, setProducts}
    const utilsFunctions = {_handlePress, updateCategories, resetAllFilters, getSearchedTextWithFilters, resetAllFiltersWithoutFecthingDatas }
    return (
        <FilterContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }

