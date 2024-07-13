import React, { createContext, useState, useEffect } from 'react'

import { serialize } from '../utils/commonAppFonctions'
import { server } from '../remote/server'

const FilterContext = createContext()
const FilterProvider = ({children}) => {
    const [selectedCategories, setSelectCategories] = useState({"Vetements":true})
    const [selectedBrands, setSelectedBrands] = useState({})

    const [selectedOrderBy, setSelectedOrderBy] = useState("")

    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [products, setProducts] = useState([])

    const [refreshComponent, setRefreshComponent] = useState(false)

    const _handlePress = (id) => {
        setSelectCategories((prevSlectedCategories)=>{
            //console.log(prevSlectedCategories)
            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    }
    
    const updateCategories = (id) => {
        setSelectCategories((prevSlectedCategories)=>{
            //console.log(prevSlectedCategories)
    
            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    }

    const updateSelectedBrands = (name) => {
        setSelectedBrands((prevSlectedBrands)=>{
                //console.log(prevSlectedCategories)
        
                return ({
                    ...prevSlectedBrands,
                    [name] : !prevSlectedBrands[name], 
                })
            })

    }

    const getSearchedTextWithFilters = async (searchText, orderBy) =>
    {
        setSelectedOrderBy(orderBy);
        let categories = Object.keys(selectedCategories).filter((key)=>{ return selectedCategories[key]==true})
        //console.log(categories)
        let brands = Object.keys(selectedBrands).filter((key)=>{ return selectedBrands[key]==true})
        //console.log(selectedBrands)
        let condition = []
        isOldFocused && condition.push("used")
        isNewFocused && condition.push("new")
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
                //setRefreshComponent(!refreshComponent)

        } catch (error) {
        console.error(error.message);
      }
    }

    const resetAllFilters = (searchText) => {
        setSelectCategories([])
        setSelectedBrands([])
        setSelectedOrderBy()
        setIsNewFocused("")
        setIsOldFocused("")
        setMinPrice("")
        setMaxPrice("")
        setRefreshComponent(!refreshComponent)
        getSearchedTextWithFilters(searchText)
    }

    useEffect(()=>{
        //getSearchedTextWithFilters("ord")
    })

    const filterStateVars = {refreshComponent, selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, selectedBrands, products}
    const filterStateSetters = {setRefreshComponent, setSelectCategories, setSelectedOrderBy, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice, setProducts}
    const utilsFunctions = { _handlePress, updateCategories, updateSelectedBrands, resetAllFilters, getSearchedTextWithFilters }
    return (
        <FilterContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }

