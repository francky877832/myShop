import React, { useState, useEffect, useRef, useContext, useCallback, useMemo  } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, FlatList, Alert, TouchableWithoutFeedback, Modal} from 'react-native';

import { Button, CheckBox } from 'react-native-elements';
import { RadioButton, } from 'react-native-paper';

import { ConditionChoice, CustomButton, CustomActivityIndicator} from "../common/CommonSimpleComponents"
import { Icon } from 'react-native-elements';

import { appColors, appFont } from '../../styles/commonStyles';
import { filtersStyles, topHeight, subTopHeight, totalTopHeight } from '../../styles/filtersStyles';
import { commonSimpleComponentsStyles } from '../../styles/commonSimpleComponentsStyles';
import { customText, screenWidth } from '../../styles/commonStyles';
import FilterItem from './FilterItem';
import ProductsList from './ProductsList';
import { datas } from '../../utils/sampleDatas';
import { searchStyles } from '../../styles/searchStyles';
import { productStyles } from '../../styles/productStyles';
import { formatMoney } from '../../utils/commonAppFonctions';

//Context
import { FilterContext } from '../../context/FilterContext';
import { ProductItemContext } from '../../context/ProductItemContext';
import { useNavigation } from '@react-navigation/native';

const Filters = (props) => {
    const navigation = useNavigation()
    //const [isLoading, setIsLoading] = useState(true)

    const {selectedCategories, selectedOrderBy, minPrice, maxPrice, setSelectedCategories, setSelectedOrderBy, refreshComponent,
        setRefreshComponent, setMinPrice, setMaxPrice, _handlePress, updateCategories, resetAllFilters, getSearchedTextWithFilters,
        loadMoreDataWithFilters,
        isLoading, setIsLoading, setHasMore, searchAgain, filtersUpdated, setFiltersUpdated,
        setSelectedModalCategoriesFromContext, setSelectedBrandFromContext, setSelectedConditionsFromContext,
        products, searchAgainWithoutUpdate,
    }  =  useContext(FilterContext)
        //console.log(selectedModalCategories)
    
    const [selectedBrands, setSelectedBrands] = useState({})
    const [isNewFocused, setIsNewFocused] = useState(true)
    const [isOldFocused, setIsOldFocused] = useState(true)
    const [isNewOldFocused, setIsNewOldFocused] = useState(true)
    const [conditions, setConditions] = useState({"old":true, "new":true, "new used":true})
    const [selectedModalCategories, setSelectedModalCategories] = useState({})
    const timeoutRef = useRef(null);

    const { categories, brands, /*isLoading, setIsLoading*/ } = useContext(ProductItemContext)
//console.log(categories)
    const { suggestion, searchText,  getDatas, display, notDisplayFilters, onExit, setOnExit, search, previousScreen, category } = props
    const [showSuggestion, setShowSuggestion] = useState(suggestion)
    let replacedFilter;


useEffect(() => {
        // Fonction de nettoyage à exécuter lorsque le composant est démonté
        return () => {
          if (onExit) {
            setSelectedBrands({})
            setIsNewFocused(true)
            setIsOldFocused(true)
            setIsNewOldFocused(true)
            setConditions({"old":true, "new":true, "new used":true})
            setSelectedModalCategories({})
            setSelectedOrderBy("")
            //setSelectedCategories({})
            setOnExit(false)
            //Alert.alert("ok")
          }
        };

        
}, [onExit]);
useEffect(()=>{
    
}, [])



    const updateConditions = useCallback((name) =>
    {
        setConditions((prevSelectedConditions)=>{
            switch(name){
                case "new":
                    setIsNewFocused(!isNewFocused)
                    return {...prevSelectedConditions, [name]:isNewFocused}
                    break
                case "old":
                    setIsOldFocused(!isOldFocused)
                    return {...prevSelectedConditions, [name]:isOldFocused}
                    break
                case "new used":
                    setIsNewOldFocused(!isNewOldFocused)
                    return {...prevSelectedConditions, [name]:isNewOldFocused}
                    break
                default : return{...prevSelectedConditions}
            }
            
        })
    })

    const updateModalCategories = useCallback((id) => {
        setSelectedModalCategories((prevSelectedCategories) => {
            /*console.log(({
                ...prevSlectedCategories,
                [id] : !prevSlectedCategories[id], 
            }))*/

            return ({
                ...prevSelectedCategories,
                [id] : !prevSelectedCategories[id], 
            })
        })
    })

    const updateSelectedBrands = useCallback((name) => {
        setSelectedBrands((prevSlectedBrands)=>{
                //console.log(prevSlectedCategories)
        
                return ({
                    ...prevSlectedBrands,
                    [name] : !prevSlectedBrands[name], 
                })
            })

    })

   /* const categories = [
        {
            name : "Electonique",
            subCategories : [{id:1,name:"Telephone",}, {id:2, name:"Ordinateur"}]
    
        },

        {
            name : "Electonique",
            subCategories : [{id:3,name:"Telephone",}, {id:4, name:"Ordinateur"}]
    
        },
        {
            name : "Electonique",
            subCategories : [{id:5,name:"Telephone",}, {id:6, name:"Ordinateur"}]
    
        },
     
    ]*/
    const orderByItem = [{id:1,name:"Pertinence", attribut:"pertinence"}, 
                        {id:2,name:"Plus Cher", attribut:"prix-desc"},{id:3, name:"Moins Cher", attribut:"prix-asc"}, 
                        {id:4,name:"Les Plus Aimés", attribut:"more-liked"},
                        {id:5, name:"Les Plus Consultés", attribut:"more-viewed"}, 
                        {id:6,name:"Plus Recents", attribut:"newer"} ,{id:7,name:"Plus Anciens", attribut:"older"}]
    const orderByItems = useMemo(()=>(orderByItem),[])
    
    useEffect(() => {
        //console.log("2**");
       
    })

    const [modalPriceVisible, setModalPriceVisible] = useState(false);
    const [modalConditionVisible, setModalConditionVisible] = useState(false);
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
    const [modalOrderByVisible, setModalOrderByVisible] = useState(false);
    const [modalFiltersVisible, setModalFiltersVisible] = useState(false);
    const [modalBrandVisible, setModalBrandVisible] = useState(false);

    const functionsCatalog = { //for element in the filters
        "price" :  [modalPriceVisible, setModalPriceVisible],
        "condition" : [modalConditionVisible, setModalConditionVisible],
        "categories" : [modalCategoryVisible, setModalCategoryVisible],
        "trier" :  [modalOrderByVisible, setModalOrderByVisible],
        "filters" : [modalFiltersVisible, setModalFiltersVisible],
        "marque" :  [modalBrandVisible, setModalBrandVisible],
    }



    const [isMinPriceFocused, setIsMinPriceFocused] = useState(false)
    const [isMaxPriceFocused, setIsMaxPriceFocused] = useState(false)

    const filters = [{name:"Categories"},{name:"Price"},{name:"Condition"}, {name:"Marque"}]

const setOtherModalToFalse = useCallback((modal)=>{
    Object.keys(functionsCatalog).map((key)=>{
        if(modal!=key)
            //console.log(key)
            functionsCatalog[key][1](false)
    })
})
    const showFilters = useCallback((filter) => {
        filter = filter.toLowerCase()
        //console.log(filter)
            switch(filter)
            {
                case "trier" : 
                    setModalOrderByVisible(!modalOrderByVisible)
                    setModalFiltersVisible(false)

                    //activeFilterRef.current = [setModalOrderByVisible, "trier"];  
                    break;
                case "filters" : 
                    setModalFiltersVisible(!modalFiltersVisible)
                    setModalOrderByVisible(false)
                    //!modalFiltersVisible && setOtherModalToFalse(filter)
                    //(["categories","price","etat"].includes(from)) ? setModalFiltersVisible(false) : setModalFiltersVisible(true)
                    //setter(false)
                    //activeFilterRef.current = [setModalFiltersVisible, "filter"];
                    break;
                case "categories" :
                    //modalFiltersVisble est deja a true
                    //console.log("OK")
                    setModalCategoryVisible(!modalCategoryVisible)
                    setOtherModalToFalse(filter)
                    setModalFiltersVisible(true)


                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalCategoryVisible, "categories"];
                    break;
                case "price" : 
                    setModalPriceVisible(!modalPriceVisible);
                    setOtherModalToFalse(filter)
                    setModalFiltersVisible(true)


                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalPriceVisible, "price"]; 
                    break;
                case "condition" : 
                    setModalConditionVisible(!modalConditionVisible);
                    setOtherModalToFalse(filter)
                    setModalFiltersVisible(true)


                    //from!="filter" ? setter(false) : false
                    //activeFilterRef.current = [setModalConditionVisible, "etat"]; 
                    break;
                case "marque" : 
                    setModalBrandVisible(!modalBrandVisible);
                    setOtherModalToFalse(filter)
                    setModalFiltersVisible(true)


                    break;
                default :  break;
            }
    })

const handleOrderby = async (val)=>{
    //PEUT-ETRE FAIT EN LOCAL
       
        //console.log(selectedOrderBy)
        //await searchAgain()
        //console.log(selectedBrands)
    setModalOrderByVisible(false)
    if(val != selectedOrderBy)
    {
        setSelectedOrderBy(val)
        await searchAgainWithoutUpdate()
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Configurer un nouveau timeout
        timeoutRef.current = setTimeout(async () => {
           
                await loadMoreDataWithFilters({searchText:searchText||" ", selectedCategory:selectedCategories, orderBy:val, 
                    selectedModalCategories:selectedModalCategories, selectedBrands:selectedBrands, conditions:conditions, resetPage:true, search:search});
            
            
        }, 100);
    }
        
        //Pas besoin de getSearchedTextWithFilters par ce Filters est dans SearchResults et cela se fait auto.
        //Il ya juste besoin de mettre a jour selectedOrderBy et de re-rendre le component avec un activityIndicator
   
}

useEffect(()=>{
    //console.log(products)
    async function loadDatas()
    {
        if(filtersUpdated)
        {
            await loadMoreDataWithFilters({searchText:searchText||" ", selectedCategory:selectedCategories, selectedModalCategories:selectedModalCategories,selectedBrands:selectedBrands,conditions:conditions,orderBy:selectedOrderBy, resetPage:true, search:search})
        }
        setFiltersUpdated(false);
        setSelectedOrderBy('pertinence')
    }

    loadDatas()

}, [filtersUpdated])

const validateFilters = async () => {
    await searchAgain() //Agis sur filtersUpdated, juste en haut
    
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
    }

    // Configurer un nouveau timeout
    timeoutRef.current = setTimeout(async () => {
        setSelectedModalCategoriesFromContext(selectedModalCategories)
        setSelectedBrandFromContext(selectedBrands)
        setSelectedConditionsFromContext(conditions)
    }, 100);
    
}


    return (
    
        <View style={[filtersStyles.contentContainerStyle,{height : modalFiltersVisible?totalTopHeight:topHeight}]}>
                {suggestion && !showSuggestion &&
                            <Pressable onPress={()=>{setShowSuggestion(!showSuggestion)}} style={{backgroundColor:appColors.white, paddingLeft:5,position:"relative",flexDirection:"row"}}>
                                <Icon name='bulb' type='ionicon' size={18} color={appColors.green} />
                                <Text style={[customText.text, {fontWeight:"bold",color:appColors.green,textDecorationLine:"underline"}]}>Suggestions</Text>
                            </Pressable>
                         }
{ //showSuggestion ||
        <View style={[filtersStyles.container]}>
            <View style={[filtersStyles.topMostContainer, {height : modalFiltersVisible?totalTopHeight:topHeight}]}>
                <View style={[filtersStyles.topContainer,]}>
                        <Pressable style={[filtersStyles.trierFiltrer,  modalOrderByVisible ? filtersStyles.trierFiltrerFocused : false, ]} onPress={()=>{showFilters("trier")}}>
                            <Icon name='swap-vertical' type='ionicon' size={18} color={appColors.secondaryColor1} />
                                <View style={{width:10}}></View>
                            <Text style={[customText.text, modalOrderByVisible ? filtersStyles.modalVisibleText : false,]}>Trier</Text>
                        </Pressable>

                        <Pressable style={[filtersStyles.trierFiltrer, {borderLeftWidth:1,borderLeftColor:appColors.secondaryColor3}, modalFiltersVisible ? filtersStyles.trierFiltrerFocused : false,]} onPress={()=>{navigation.navigate('FiltersSearch', {notDisplayFilters:notDisplayFilters,previousScreen:previousScreen, searchText:searchText, category:category})}}>
                                <Icon name='filter' type='ionicon' size={18} color={appColors.secondaryColor1} />
                                    <View style={{width:10}}></View>
                                <Text style={[customText.text, modalFiltersVisible ? filtersStyles.modalVisibleText : false, ]}>Filtrer</Text>
                        </Pressable>    
                </View>
            {/*modalFiltersVisible &&
            
                <View style={[filtersStyles.filtres]}>
                        <FlatList data={filters} keyExtractor={(item)=>{ return item.name.toString();}} renderItem={({item}) => {
                            return (
                                <Pressable style={[filtersStyles.pressableFilter, functionsCatalog[item.name.toLowerCase()][0] ? filtersStyles.pressableFilterFocused : false,
                                notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersStyles.pressableFilterDisabled:null
                                ]} onPress={()=>{showFilters(item.name)}} disabled={notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?true:false} >
                                    <Text style={[customText.text, notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?filtersStyles.pressableFilterTextDisabled:null]}>{notDisplayFilters.hasOwnProperty(item.name.toLowerCase())?selectedCategories.name:item.name}</Text>
                                </Pressable>
                            )
                    }}
                            ItemSeparatorComponent={(item) => {return <View style={{width:20,}}></View>}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{justifyContent:"center", alignItems:"center",}}
                        />
                </View>
                */
            }
        </View>



    <Modal visible={modalOrderByVisible} transparent={true}  onRequestClose={() => setModalOrderByVisible(false)}>
        <Pressable style={[filtersStyles.orderByContainer]}  onPress={() => setModalOrderByVisible(false)}>
            <View style={[filtersStyles.radioBox]}>
                    <View style={[filtersStyles.modalHeader]}>
                        <Text style={[customText.text,filtersStyles.modalHeaderText]}>Trier Par...</Text>
                    </View>
                        <RadioButton.Group onValueChange={val => {handleOrderby(val); return val}} value={selectedOrderBy} style={[filtersStyles.radioGroup,]}>
                            {
                                orderByItems.map((item) => {
                                    return(
                                        <View style={filtersStyles.radioContainer} key={item.id}>
                                            <RadioButton value={item.attribut} />
                                                <Text>{item.name}</Text>
                                        </View>
                                    )
                                })
                            }
                        </RadioButton.Group>
            </View>
            <View style={{height:20,}}></View>
        </Pressable>
    </Modal>



{modalFiltersVisible &&  (modalConditionVisible || modalCategoryVisible || modalPriceVisible || modalBrandVisible) && 
<View style={[filtersStyles.modal,{}]}>
            <View style={{width:"100%",}}>
                { /*modalFiltersVisible &&*/ modalPriceVisible &&
                <View style={[filtersStyles.priceContainer]} >
                    <View style={{height:10,}}></View>
                        
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Price</Text>
                        </View>

                        <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                            <Text style={filtersStyles.label}>Prix Min.</Text>
                            <Text style={filtersStyles.label}>Prix Max.</Text>
                        </View>

                        <View style={[filtersStyles.price,{}]}>
                            <View style = {[filtersStyles.minPrice]}>
                                <TextInput placeholder="Prix min."
                                    placeholderTextColor={appColors.mainColor}
                                    inputMode='numeric'
                                    style = {[filtersStyles.input, isMinPriceFocused && filtersStyles.inputFocused]}
                                    onFocus={() => setIsMinPriceFocused(true)}
                                    onBlur={() => setIsMinPriceFocused(false)}
                                    value={minPrice}
                                    onChangeText={(price) => setMinPrice(formatMoney(price))}
                                />
                            </View>

                        <Text>-</Text>

                        <View style = {[filtersStyles.maxPrice]}>
                            <TextInput placeholder="Prix max."
                                placeholderTextColor={appColors.mainColor}
                                inputMode='numeric'
                                style = {[filtersStyles.input, isMaxPriceFocused && filtersStyles.inputFocused]}
                                onFocus={() => setIsMaxPriceFocused(true)}
                                onBlur={() => setIsMaxPriceFocused(false)}
                                value={maxPrice}
                                onChangeText={(price) => setMaxPrice(formatMoney(price))}
                            />
                        </View>
                    </View>

                    <View style={{height:20,}}></View>
                        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:0}}>
                            <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setMaxPrice("");setMinPrice("");}} />
                            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{validateFilters()}} />
                        </View>
                </View>
            }
        { modalFiltersVisible && modalConditionVisible &&
                    <View style={filtersStyles.conditionContainer}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text,filtersStyles.label]}>Condition</Text>
                        </View>
                        <ConditionChoice styles={{}} updateConditions={updateConditions} conditions={conditions} />
                    
                        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:0}}>
                            <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setConditions({})}} />
                            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{validateFilters()}} />
                        </View>
                    </View>
        }


        {
            modalFiltersVisible && modalCategoryVisible &&
                    <View style={[filtersStyles.categoryContainer, filtersStyles.cardItem]}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Categories</Text>
                        </View>

                        <View style={[filtersStyles.filterFlatlist, filtersStyles.cardItem,]}>
                            <FlatList
                                data={[...categories, ...categories]}
                                nestedScrollEnabled={true}
                                renderItem={ ({item}) => { return <FilterItem updateModalCategories={updateModalCategories} selectedModalCategories={selectedModalCategories} selectedCategories={selectedCategories} tag="category" item={item} /> } }
                                keyExtractor={ (item) => { return Math.random().toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={filtersStyles.categorySeparator}></View> }}
                                horizontal={false}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{  }}  // Optional padding
                                style={{  }}
                            />
                              {isLoading && 
                                    <CustomActivityIndicator styles={{}} /> 
                                }
                            </View>
                        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:15}}>
                            <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setSelectedModalCategories({});setSelectedCategories({});}} />
                            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>{validateFilters()}} />
                        </View>
                    </View>
        }

{
            modalFiltersVisible && modalBrandVisible &&
                    <View style={[filtersStyles.categoryContainer, filtersStyles.cardItem]}>
                        <View style={{alignSelf : "center",}}>
                            <Text style={[customText.text, filtersStyles.label]}>Marques</Text>
                        </View>

                        <View style={[filtersStyles.filterFlatlist, filtersStyles.cardItem,]}>
                            <FlatList
                                data={brands}
                                renderItem={ ({item}) => { return <FilterItem tag="brand" item={item} updateSelectedBrands={updateSelectedBrands} selectedBrands={selectedBrands} /> } }
                                keyExtractor={ (item) => { return item._id.toString(); } }
                                ItemSeparatorComponent ={ (item) => { return <View style={filtersStyles.categorySeparator}></View> }}
                                horizontal={false}
                                numColumns={2}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{  maxHeight : 500,  }}
                            />
                        </View>

                        <View style={{flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingHorizontal:5,top:15}}>
                            <CustomButton text="Vider" color={appColors.gray} backgroundColor={appColors.white} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",borderWidth:1,borderColor:appColors.secondaryColor3},text:{fontWeight:"bold",}}} onPress={()=>{setSelectedBrands({});}} />
                            <CustomButton text="Appliquer" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={{pressable : {paddingVertical:15,borderRadius:10,width:"40%",}}} onPress={()=>validateFilters()} />
                        </View>
                    </View>
        }
            </View>
            </View>}
        </View>
}
{showSuggestion &&
                    <View style={[filtersStyles.similarContainer,{top:2,paddingTop:5,left:0,}]}>
                         {suggestion && showSuggestion &&
                            <Pressable onPress={()=>{setShowSuggestion(!showSuggestion)}} style={{backgroundColor:appColors.lightWhite,top:5,zIndex:99,position:"relative",flexDirection:"row",alignItems:"center",}}>
                                <Icon name='close' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                <Text style={[customText.text, {fontWeight:"bold",color:appColors.secondaryColor1,textDecorationLine:"underline"}]}>Fermer</Text>
                            </Pressable>
                         }
                        <ProductsList datas={datas} horizontal={true} styles={filtersStyles} />
                    </View>
}
    </View>


)}

export default  Filters;