import React, { createContext, useState } from 'react'

const ProductItemContext = createContext()
const ProductItemProvider = ({children}) => {
    const [selectedCategories, setSelectedCategories] = useState({})
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedColor, setSelectedColor] = useState("")


    const updateSelectedCategory = (id, path) => {
        setSelectedCategories((prevSelectedCategories) => {
           
            if(path==undefined)
            {
                return {[id] : !prevSelectedCategories[id]}
            }
            else
            {
                return {[id] : true, name:id, subCategories:path}
            }
        })
    }

    

    const productItemStateVars = {selectedCategories,selectedBrand, selectedColor}
    const productItemStateSetters = {}
    const utilsFunctions = {updateSelectedCategory, setSelectedBrand, setSelectedColor}
    return (
        <ProductItemContext.Provider value={{...productItemStateVars, ...productItemStateSetters, ...utilsFunctions}}>
            {children}
        </ProductItemContext.Provider>
    )
}


export { ProductItemProvider, ProductItemContext }

