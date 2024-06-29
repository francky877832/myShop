import React, { createContext, useState } from 'react'

const FilterContext = createContext()
const FilterProvider = ({children}) => {
    const [selectedCategories, setSelectCategories] = useState({})
    const [selectedOrderBy, setSelectedOrderBy] = useState("")

    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")

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
            console.log(prevSlectedCategories)
    
            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    }

    const filterStateVar = {selectedCategories, selectedOrderBy, isNewFocused, isOldFocused, minPrice, maxPrice}
    const filterStateSetters = {setSelectCategories, setSelectedOrderBy, setIsNewFocused, setIsOldFocused, setMinPrice, setMaxPrice}
    const utilsFonctions = { _handlePress, updateCategories }
    return (
        <FilterContext.Provider value={{...filterStateVar, ...filterStateSetters, ...utilsFonctions}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }

