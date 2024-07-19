import React, { createContext, useState, useEffect, useContext, useMemo} from 'react'
import { Alert } from 'react-native'

import { server } from '../remote/server'
import { UserContext } from './UserContext'

const ProductItemContext = createContext()

const ProductItemProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState({"Vetements":true,name:"Vetements"}) //Normalemet category, categories est dans FilterItem
    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedColor, setSelectedColor] = useState("")
    const {user} = useContext(UserContext)
    const [comments, setComments] = useState([])

    const [ categorie, setCategories ] = useState([])
    const [ brands, setBrands ] = useState([])
    const categories = useMemo(()=>(categorie))
    const [isLoading, setIsLoading]  = useState(true)


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
    //console.log(isLoading)
    const fetchCategories = async () =>{
        try{
//console.log("user")
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
    
    const fetchData = async () => {
        //setIsLoading(true);
        await fetchCategories();
        await fetchBrands();
        setIsLoading(false);
      };
  
      if (isLoading) {
        fetchData();
      }
}, [isLoading])



    const productItemStateVars = {comments, selectedBrand, selectedColor, categories, brands, isLoading}
    const productItemStateSetters = {setComments, setSelectedBrand, setSelectedColor, setIsLoading}
    const utilsFunctions = {}
    return (
        <ProductItemContext.Provider value={{...productItemStateVars, ...productItemStateSetters, ...utilsFunctions}}>
            {children}
        </ProductItemContext.Provider>
    )
}


export { ProductItemProvider, ProductItemContext }

