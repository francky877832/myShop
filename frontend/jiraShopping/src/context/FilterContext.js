import React, { createContext, useState, useEffect, useContext, useCallback } from 'react'

import { serialize } from '../utils/commonAppFonctions'
import { server } from '../remote/server'
import { UserContext } from './UserContext'
const FilterContext = createContext()
const FilterProvider = ({children}) => {
    const [isLoading, setIsLoading]  = useState(false)

    const [selectedCategories, setSelectedCategories] = useState({})

    const [selectedModalCategoriesFromContext, setSelectedModalCategoriesFromContext] = useState({})
    const [selectedBrandFromContext, setSelectedBrandFromContext] = useState({})
    const [selectedConditionsFromContext, setSelectedConditionsFromContext] = useState({})
    const [filtersUpdated, setFiltersUpdated] = useState(false);


     const [selectedOrderBy, setSelectedOrderBy] = useState("")

    const [searchText, setSearchText] = useState("")

   

    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [isNewOldFocused, setIsNewOldFocused] = useState(true)
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [products, setProducts] = useState([])
    const [searchedProducts, setSearchedProducts] = useState([])

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(1)

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

    const getSearchedTextWithFilters = useCallback(async ({searchText, orderBy, selectedModalCategories, selectedCategory, selectedBrands, conditions, resetPage=false}) =>
    {
        if(resetPage){ setPage(1)}
        //console.log({searchText, orderBy, selectedModalCategories, selectedBrands, conditions, selectedCategories})
        //setIsLoading(true)
        //setSelectedOrderBy(orderBy);
        //selectedCategories
        console.log(selectedCategory)
        selectedModalCategories = selectedModalCategories || {}
        let categories;
        if(Object.keys(selectedModalCategories).length>0 || searchText.trim().length>0)
        {
            
            categories = Object.keys(selectedModalCategories).filter((key)=>{ return selectedModalCategories[key]===true})
            if(!!selectedCategory.subCategories)
                categories.push(`${categories.name}/${categories.subCategories}`)
            setSelectedCategories({})
        }
        else
        { //console.log("GTA")
            if(Object.keys(selectedCategory).length<=0)
            {
                setSelectedCategories({"Vetements": true, "name": "Vetements"})
            }    
            else
            {
                categories = Object.keys(selectedCategory).filter((key)=>{ return selectedCategory[key]===true})
                if(!!selectedCategory.subCategories)
                {
                    /* En cas sous categroie, on neglige la categorie et on est plus specifique */
                    categories.pop()
                    categories.push(`${selectedCategory.name}/${selectedCategory.subCategories}`)
                }
            }
            selectedModalCategories={}
        }
        console.log("categories")
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
        //console.log(orderBy)
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
     
        //GESTION DE LA PAGE
        filters["customFilters"]['page'] = (resetPage===true)?1:page
        
        

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
                //console.log(responseJson.datas)
               return responseJson
               //setProducts(responseJson.datas)
                //setIsLoading(false)
               
                //setSelectedCategories({"Vetements": true, "name": "Vetements"}) //OR NOT
                //setRefreshComponent(!refreshComponent)

        } catch (error) {
            setIsLoading(false)
            console.error(error.message);
            return []
        
      }
    })

    
    const loadMoreDataWithFilters = useCallback(async ({searchText, orderBy, selectedModalCategories, selectedCategory={}, selectedBrands, conditions, resetPage=false}) =>
    {
        //console.log("selectedCategory")
        //console.log(selectedCategory)
        console.log("hasMore")
        console.log(hasMore)
        console.log(isLoading)
        if (!resetPage && (isLoading || !hasMore)) return;
        //if (isLoading) return;
    
        setIsLoading(true);
        try {
            console.log("page")
            console.log(page)
            const newData = await getSearchedTextWithFilters({searchText:searchText, selectedModalCategories:selectedModalCategories, selectedCategory:selectedCategory, selectedBrands:selectedBrands, conditions:conditions, orderBy:orderBy, resetPage:resetPage}); //A MODDIFIER
            //console.log(newData)
            if (newData.datas.length > 0) {
                //setProducts(newData.datas)
                console.log("gs")
                //updateProducts(newData.datas);
                if(resetPage)
                {
                    setSearchedProducts(newData.datas)
                }
                else
                {
                    setProducts((prevProducts)=>[...prevProducts, ...newData.datas])
                }
                //setProducts(newData.datas)
                //if(page < totalPages)
                setPage((prevPage) => prevPage + 1);
                //setRefreshKey(prevKey => prevKey + 1);
                
            } else {
                setHasMore(false); // Pas plus de données à charger
            }
            } catch (error) {
            console.error('Erreur lors du chargement des données :', error);
            } finally {
                setIsLoading(false);
            }
      }, [isLoading, hasMore, page]);



    useEffect(()=>{

    }, [selectedOrderBy])

    const resetAllFiltersWithoutFecthingDatas = () => {
        //setIsLoading(false)
        setSelectedCategories({})
        //setSelectedBrands([])
        setSelectedOrderBy("")
        setMinPrice("")
        setMaxPrice("")

        setHasMore(true)
        setPage(1)
        setProducts([])
        
        //setRefreshComponent(!refreshComponent)
        //console.log("resetAllFiltersWithoutFecthingDatas")
    }

    const resetAllFilters = useCallback(() => {
        setIsLoading(false)
        //setSelectedCategories({})
        //setSelectedBrands([])
        setSelectedOrderBy("")
        setMinPrice("")
        setMaxPrice("")
        setIsNewFocused(true)
        setIsNewOldFocused(true)
        setIsNewOldFocused(true)
        setHasMore(true)
        setPage(1)
        setProducts([])
        //setRefreshComponent(!refreshComponent)
        
        //getSearchedTextWithFilters({searchText:searchText})
    })

    const searchAgain = async () => {
          setIsLoading(false);
          setHasMore(true);
          setFiltersUpdated(true);
          setPage(1);
          setProducts([]);
    }

//These 2 functiopn are important : used in Search, SR, Cat   
    const searchAgainWithoutUpdate = async () => {
        setIsLoading(false);
        setHasMore(true);
        setPage(1);
        setProducts([]);
  }

      const searchCategory = async (selectedCategories_) => {
        setIsLoading(false);
        setHasMore(true);
        setPage(1);
        setProducts([]);
        setSelectedCategories(selectedCategories_);
    }

    



    const filterStateVars = {searchedProducts, refreshComponent, filtersUpdated, isLoading, setHasMore, selectedCategories, selectedOrderBy, selectedBrandFromContext, selectedModalCategoriesFromContext, selectedConditionsFromContext, isNewFocused, isOldFocused, minPrice, maxPrice, products}
    const filterStateSetters = {setSearchedProducts, setFiltersUpdated, setSelectedModalCategoriesFromContext, setSelectedBrandFromContext, setSelectedConditionsFromContext, setRefreshComponent, setIsLoading, setSelectedCategories, setSelectedOrderBy, setIsNewFocused,setIsNewOldFocused, isNewOldFocused, setIsOldFocused, setMinPrice, setMaxPrice, setProducts}
    const utilsFunctions = {_handlePress, searchAgainWithoutUpdate, updateCategories, resetAllFilters, searchAgain, searchCategory, getSearchedTextWithFilters, resetAllFiltersWithoutFecthingDatas, loadMoreDataWithFilters }
    return (
        <FilterContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }

