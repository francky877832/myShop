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
    const [selectedColorFromContext, setSelectedColorFromContext] = useState({})
    const [minPriceFromContext, setMinPriceFromContext] = useState(null)
    const [maxPriceFromContext, setMaxPriceFromContext] = useState(null)

    const [allCategoriesSelected, setAllCategoriesSelected] = useState(Object.keys(selectedModalCategoriesFromContext).some((el)=>selectedModalCategoriesFromContext[el]===false))
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


    const updateAllCategoriesSelected = useCallback((categories) => {
        //setAllCategoriesSelected(!Object.keys(selectedModalCategoriesFromContext).some((el)=> el.split('/')[0]===category && selectedModalCategoriesFromContext[el]===false))
        setAllCategoriesSelected(prev => {
        let allCategoriesChecked = {}
           categories.forEach((cat)=>{
                cat.subCategories.forEach((subCat)=> {
                    allCategoriesChecked = {...allCategoriesChecked, [`${cat.name}/${subCat.name}`] : !prev }
                })
           })
           
           setSelectedModalCategoriesFromContext(allCategoriesChecked)
           return !prev 
        })
    })

    const updateModalCategories = useCallback((id) => {
        setSelectedModalCategoriesFromContext((prevSlectedCategories)=>{
            //console.log(prevSlectedCategories)
            return ({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            })
        })
    })

    const updateSelectedBrands = useCallback((name) => {
        setSelectedBrandFromContext((prevSlectedBrands)=>{
                //console.log(prevSlectedCategories)
        
                return ({
                    ...prevSlectedBrands,
                    [name] : !prevSlectedBrands[name], 
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

    const getSearchedTextWithFilters = useCallback(async ({searchText, orderBy, selectedModalCategories, selectedCategory, selectedBrands, conditions, selectedColors, resetPage=false}) =>
    {
        
        if(resetPage){ setPage(1)}
        //console.log({searchText, orderBy, selectedModalCategories, selectedBrands, conditions, selectedCategories})
        //setIsLoading(true)
        //setSelectedOrderBy(orderBy);
        //selectedCategories
        //console.log(selectedCategory)
        searchText = searchText || " "
        selectedModalCategories = selectedModalCategoriesFromContext
        selectedCategory = selectedCategories
        selectedBrands = selectedBrandFromContext
        conditions = selectedConditionsFromContext
        selectedColors = selectedColorFromContext

        //console.log(selectedBrandFromContext)


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

        //console.log("categories")
       // console.log(categories)
        //console.log(categories)
        
        //GESTION DES MARQUES
        let brands = Object.keys(selectedBrands).filter((key)=>{ return selectedBrands[key]==true})
        
        //COLORS
        let colors = Object.keys(selectedColors).filter((key)=>{ return selectedColors[key]==true})

        //CONDITIONS
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
                colors : colors || [],
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
                console.log(filters)
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

    
    const loadMoreDataWithFilters = useCallback(async ({searchText, orderBy, selectedModalCategories, selectedCategory={}, selectedBrands, conditions, resetPage=false, search=false}) =>
    {
        //console.log("selectedCategory")
        //console.log(selectedCategory)
        //console.log("hasMore")
        //console.log(hasMore)
        //console.log(isLoading)
        
        if (!resetPage && (isLoading || !hasMore)) return;
        //if (isLoading) return;
    
        setIsLoading(true);
        try {
            //console.log("page")
            //console.log(page)
            console.log("filters")

            const newData = await getSearchedTextWithFilters({searchText:searchText, selectedModalCategories:selectedModalCategories, selectedCategory:selectedCategory, selectedBrands:selectedBrands, conditions:conditions, orderBy:orderBy, resetPage:resetPage}); //A MODDIFIER
            console.log(newData.datas.length)
            console.log("filters")

            if (newData.datas.length > 0) {
                //setProducts(newData.datas)
                //console.log(products)
                //updateProducts(newData.datas);
                //console.log("*****")
                //console.log(resetPage)
                if(resetPage)
                {
                    search ? setSearchedProducts(newData.datas) :  setProducts(newData.datas)
                }
                else
                {
                    search 
                    ?
                        setSearchedProducts((prevProducts)=>[...prevProducts, ...newData.datas])
                    :
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
      }) // [isLoading, hasMore, page, selectedBrandFromContext]);



    useEffect(()=>{
        //console.log("MY PRODUCTS")
        //console.log(products.length)
    }, [products])

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
        setSearchedProducts([])

        
        //setRefreshComponent(!refreshComponent)
        //console.log("resetAllFiltersWithoutFecthingDatas")
    }

    const resetAllFilters = useCallback(() => {
        setIsLoading(false)
        setHasMore(true)
        setPage(1)
        //setSelectedCategories({})
        //setSelectedBrands([])
        setSelectedOrderBy("")
        
        setMinPrice("")
        setMaxPrice("")
        setMaxPriceFromContext(null)
        setMinPriceFromContext(null)

        setIsNewFocused(true)
        setIsNewOldFocused(true)
        setIsNewOldFocused(true)
        setSelectedConditionsFromContext({})

        setSelectedModalCategoriesFromContext({})
        
        setSelectedBrandFromContext({})

       
        setSelectedColorFromContext({})


        setProducts([])
        setSearchedProducts([])

        //setRefreshComponent(!refreshComponent)
        
        //getSearchedTextWithFilters({searchText:searchText})
    })

    const searchAgain = async () => {
          setIsLoading(false);
          setHasMore(true);
          setFiltersUpdated(true);
          setPage(1);
          setProducts([]);
          setSearchedProducts([])
    }

//These 2 functiopn are important : used in Search, SR, Cat   
    const searchAgainWithoutUpdate = async () => {
        setIsLoading(false);
        setHasMore(true);
        setPage(1);
        setProducts([]);
        setSearchedProducts([])

  }

      const searchCategory = async (selectedCategories_) => {
        setIsLoading(false);
        setHasMore(true);
        setPage(1);
        setProducts([]);
        setSelectedCategories(selectedCategories_);
        setSearchedProducts([])

    }

    



    const filterStateVars = {selectedColorFromContext, minPriceFromContext, maxPriceFromContext, allCategoriesSelected, searchedProducts, refreshComponent, filtersUpdated, isLoading, setHasMore, selectedCategories, selectedOrderBy, selectedBrandFromContext, selectedModalCategoriesFromContext, selectedConditionsFromContext, isNewFocused, isOldFocused, minPrice, maxPrice, products}
    const filterStateSetters = {setSelectedColorFromContext, setMinPriceFromContext, setMaxPriceFromContext, setAllCategoriesSelected, setSearchedProducts, setFiltersUpdated, setSelectedModalCategoriesFromContext, setSelectedBrandFromContext, setSelectedConditionsFromContext, setRefreshComponent, setIsLoading, setSelectedCategories, setSelectedOrderBy, setIsNewFocused,setIsNewOldFocused, isNewOldFocused, setIsOldFocused, setMinPrice, setMaxPrice, setProducts}
    const utilsFunctions = {updateAllCategoriesSelected, updateSelectedBrands, updateModalCategories, searchAgainWithoutUpdate, updateCategories, resetAllFilters, searchAgain, searchCategory, getSearchedTextWithFilters, resetAllFiltersWithoutFecthingDatas, loadMoreDataWithFilters }
    return (
        <FilterContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </FilterContext.Provider>
    )
}


export { FilterContext, FilterProvider }

