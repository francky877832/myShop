import React, { createContext, useState, useEffect } from 'react'

import { serialize } from '../utils/commonAppFonctions'
import { server } from '../remote/server'

const FilterContext = createContext()
const FilterProvider = ({children}) => {
    const [selectedCategories, setSelectCategories] = useState({})
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
            console.log(prevSlectedCategories)
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

    const getSearchedTextWithFilters = async (searchText) =>
    {
        let categories = Object.keys(selectedCategories).filter((key)=>{ return selectedCategories[key]==true})
        //console.log(categories)
        let brands = Object.keys(selectedBrands).filter((key)=>{ return selectedBrands[key]==true})
        //console.log(selectedBrands)
        let condition = []
        isOldFocused && condition.push("used")
        isNewFocused && condition.push("new")
        //console.log(condition)

        const filters = {
            name : searchText.trim(),
            customFilters : {
                categories : categories || [],
                brands : brands || [],
                orderBy : selectedOrderBy,
                minPrice : minPrice.replace('.',''),
                maxPrice : maxPrice.replace('.',''),
                condition : condition || [],
            }
        }
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
        } catch (error) {
        console.error(error.message);
      }
    }

    const resetAllFilters = () => {
        setSelectCategories([])
        setSelectedBrands([])
        setSelectedOrderBy()
        setIsNewFocused("")
        setIsOldFocused("")
        setMinPrice("")
        setMaxPrice("")
        getSearchedTextWithFilters(" ")
    }

    useEffect(()=>{
        //getSearchedTextWithFilters("ord")
    })

    const filterStateVars = {refreshComponent, selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice, selectedBrands, products}
    const filterStateSetters = {setRefreshComponent, setSelectCategories, setSelectedOrderBy, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice}
    const utilsFunctions = { _handlePress, updateCategories, updateSelectedBrands, resetAllFilters, getSearchedTextWithFilters }
    return (
        <FilterContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }

