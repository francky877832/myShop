import React, { createContext, useState, useEffect, useContext} from 'react'
import { Alert } from 'react-native'

import { server } from '../remote/server'
import { UserContext } from './UserContext'

const ProductItemContext = createContext()

const ProductItemProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState({"Vetements":true,name:"Vetements"}) //Normalemet category, categories est dans FilterItem
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const {user} = useContext(UserContext)


    const [ categories, setCategories ] = useState([])
    const [ brands, setBrands ] = useState([])

    const updateSelectedCategory = (id, path) => {
        setSelectedCategory((prevSelectedCategory) => {
           
            if(path==undefined)
            {        console.log(id)

                return {[id] : !prevSelectedCategory[id], name:id,}
            }
            else
            {
                return {[id] : true, name:id, subCategories:path}
            }
        })
    }


useEffect(() => {
    const fetchCategories = async () =>{
        try{
//console.log(user)
            const response = await fetch(`${server}/api/datas/categories/get`, {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
              },});            
            const datas = await response.json()
            //console.log(datas)
            setCategories(datas)
        }catch(error){
            Alert.alert("Erreur", "Une erreur est survenue! "+ error,[{text:"Ok"}]) //onPress:()=>navigation.goBack()
        }
    }
    const fetchBrands= async () =>{
        try{

            const response = await fetch(`${server}/api/datas/brands/get`);            
            const datas = await response.json()
            setBrands(datas)
        }catch(error){
            Alert.alert("Erreur", "Une erreur est survenue! "+ error,[{text:"Ok",}]) // onPress:()=>navigation.goBack()
        }
    }
    fetchCategories()
    fetchBrands()
}, [user])



    const productItemStateVars = {selectedBrand, selectedColor, categories, brands}
    const productItemStateSetters = {}
    const utilsFunctions = {setSelectedBrand, setSelectedColor,}
    return (
        <ProductItemContext.Provider value={{...productItemStateVars, ...productItemStateSetters, ...utilsFunctions}}>
            {children}
        </ProductItemContext.Provider>
    )
}


export { ProductItemProvider, ProductItemContext }

