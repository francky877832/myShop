import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable, Alert } from 'react-native';
import { RadioButton, } from 'react-native-paper';
import { Input } from 'react-native-elements';
//custom component
import Product from '../common/Product';
//custom styles
import { productsListStyles } from '../../styles/productsListStyles';
import { radioProductsListtStyles } from '../../styles/radioProductsListStyles';
import { numProduct } from '../../styles/productStyles';
import { radioProductStyles } from '../../styles/radioProductsListStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import SellerBrand from '../common/SellerBrand';
import { appColors, customText, screenWidth } from '../../styles/commonStyles';
//Contexte
import { FavouritesContext } from '../../context/FavouritesContext';
import { Icon } from 'react-native-elements';
import { CustomButton, Counter, DisplayPrice } from '../common/CommonSimpleComponents'
import { CheckBox } from 'react-native-elements';


import { formatMoney, pluralize, choosePrice, hasPropositionPrice } from '../../utils/commonAppFonctions';

import { useSelector, useDispatch } from 'react-redux';
import  {
    removeFromBasket,
    updateSelectedProducts,
    updateLocalBasket,
    setSelectedSeller, updateQuantities,
  } from '../../store/baskets/basketsSlice';
import { UserContext } from '../../context/UserContext';
import { productsImagesPath, usersImagesPath } from '../../remote/server';


  const loggedUser = "Francky"
  const loggedUserId = "66715deae5f65636347e7f9e"
  const username = "Franck"

const RadioProductsList = (props) => {
    const { item, datas, navigation, route  } = props;
    const {user} = useContext(UserContext)
    //const { removeBasket, updateTotalPrice} = useContext(BasketContext)
    
    dispatch = useDispatch()

    const [quatity, setQuantity] = useState(1)
    const [quantitiesFocused, setQuantitiesFocused] = useState({})

    //const [quantities, setQuantities] = useState({})

    /*const updateQuantities = useCallback((id, quantity) => {
        console.log(quantity)
        setQuantities(prev => {
            //console.log(prev)
            return {...prev, [id] : quantities[id] ? parseInt(quantity) : 1}
        })
    }, [quantities])*/
    const updateQuantitiesFocused = (id, focused) => {
        setQuantitiesFocused(prev => {
            return {[id] : focused}
        })
    }

    const basket = datas
    const selectedProducts = useSelector((state) => state.basket.selectedProducts);
    const selectedSeller = useSelector((state) => state.basket.selectedSeller);
    const totalPrice = useSelector((state) => state.basket.totalPrice);
    const isLoading = useSelector((state) => state.basket.status);
    const error = useSelector((state) => state.basket.error);

    const quantities = useSelector((state) => state.basket.quantities);


    const timeoutRef = useRef(null);


//UTİLS FONCT
const handleRemoveFromBasket = useCallback((product) => {
    Alert.alert(
        "Supprimer le produit",
        "Êtes-vous sûr de vouloir supprimer ce produit du panier ?",
        [
            {
                text: "Annuler",
                style: "cancel"
            },
            {
                text: "Oui", onPress: () => {
                    dispatch(updateSelectedProducts({product:product, bool:false}));

                    dispatch(updateLocalBasket({product:product, isAdding:false}));
                
                        timeoutRef.current = setTimeout(() => {
                        //console.log(isBasketPresent)
                        dispatch(removeFromBasket({product:product, user:user})); 
                        }, 1000)
                }
            }
        ]
    );
    
  },[]);

  const handleSelectedSeller = useCallback((val) => {dispatch(setSelectedSeller(val)) },[]);
  const handleUpdateSelectedProducts  = useCallback((product, bool) => {dispatch(updateSelectedProducts({product:product, bool:bool}))},[])

  const  updateQuantitiesAndPrice = useCallback((product, num) => {
    dispatch(updateQuantities({id:product._id, quantity: num}))
    handleUpdateSelectedProducts({product:product, bool:false})
  }, [])


  const proceedBasketPayment = () => {
    if(Object.keys(selectedProducts).length > 0 && Object.keys(selectedProducts).some(id => selectedProducts[id]===true))
    {
        const orderProducts = basket.filter(p => selectedProducts[p._id]===true)
        const orderProductsWithQuantities = orderProducts.map(p => {
            return {...p, orderQuantity:quantities[p._id] || 1}
        })
        //console.log(orderProductsWithQuantities[1].orderQuantity)
        navigation.navigate('VerifyDeliveryInfos', {products:orderProductsWithQuantities})
    }
    else
    {
        Alert.alert('Infos','Vous devez choisir au moins un produit.')
    }
    
  }


const RadioProduct = (props) => {
        const {item, user} = props

        /*
    const [localSelectedProducts, setLocalSelectedProducts] = useState({})
    const updateLocalSelectedProducts = (itemId) => {
        setLocalSelectedProducts(prev => {
            console.log('ok')
        return ({
                    ...prev,
                    [itemId]: !localSelectedProducts[itemId] 
                })
        })
        
        //console.log(state.selectedProducts)
        state.selectedProducts = updatedSelectedProducts;
        state.totalPrice = Object.keys(updatedSelectedProducts).reduce((total, key) => {
        const isSelected = updatedSelectedProducts[key];
        const item = state.basket.find((product) => product._id === key);
        return isSelected ? total + (item?.price || 0) : total;
        }, 0);
        
    }
    */

            

        let passed_sellers = []
        let passed_product = []

        //console.log(item)
        //const profile = item.productDetails.images[0] || require('../../assets/images/product5.png')
        const inBasket = 3

        const handleSellerBrandPressed = useCallback((product) => {
            //Pas vraiment necesairre parce qun user ne pourra pas ajouter son propre produit a Basket
            if(user._id!=product.seller._id)
            {
                navigation.navigate("Shop", {seller:product.seller}) 
            }
            else
            {
                navigation.navigate('Preferences', {screen: 'MyShop',params:undefined})
            }
        }, [navigation])
// <SellerBrand pub={false} certified={true} username={product1.seller.username} route={route} navigation={navigation} closeNotif={true} /> 
    
        return (
            <View styles={[radioProductStyles.container,{}]}>       
                <RadioButton.Group onValueChange={val => {handleSelectedSeller(val)}} value={selectedSeller} style={[radioProductStyles.radioGroup,radioProductStyles.radioGroup1,]}>
                    {
                        item.products.map((product1, key) => {
                               
                            return(
                            <View style={[radioProductsListtStyles.seller,{}]} key={key}>
                                { passed_sellers.includes(product1.seller._id) ? false :
                                    <View style={[radioProductStyles.radioContainer, radioProductStyles.radioContainer1]} >
                                        <RadioButton value={product1.seller._id} />
                                        <Pressable style={[radioProductStyles.sellerBrand]} onPress={()=>{ handleSellerBrandPressed(product1) }}>
                                            <Image source={{uri: `${usersImagesPath}/${product1.seller.image}`}} style={radioProductStyles.sellerImage} />
                                            <View style={{width:10}}></View>
                                            <Text style={[customText.text, {fontWeight:'bold'}]}>{product1.seller.username}</Text>
                                        </Pressable>
                                    </View>
                                }
                            
                        {item.products.map((product2, key) => {
                             //setQuantities(prev => { return {...prev, [product2._id] : 1}})
                             passed_sellers.push(product1.seller._id) 
                            if(product1.seller._id == product2.seller._id && !passed_product.includes(product2._id))
                            { 
                                passed_product.push(product2._id)
                                return(
                                    <View style={[radioProductStyles.radioProducts,{flexWrap:'wrap' }]} key={key}>
                                            <View style={[radioProductStyles.radioContainer, radioProductStyles.radioContainer2, {  }]} >
                                                    <CheckBox title=
                                                    {
                                                    <View style={[{}]}>
                                                    <Pressable style={[radioProductStyles.productInfos,{ }]} onPress={()=>{navigation.navigate('ProductDetails', {productDetails:product2})}}>
                                                        <View style={{width:10}}></View>
                                                        <View style={[radioProductStyles.imageContainer,{}]}>
                                                            <Image source={{uri: `${productsImagesPath}/${product2.images[0]}`}} style={[radioProductStyles.productImage,{}]} />
                                                        </View>
                                                        <View style={[{left : 10, flexWrap:'wrap', width:'100%', }]}>
                                                            <Text style={[customText.text, ]} numberOfLines={2} >{product2.name.length>25?product2.name.substring(0,25)+'...':product2.name}</Text>
                                                            <Text style={[customText.text, {color:appColors.secondaryColor3} ]}>{product2.category.replace(/\//g, ' | ')}</Text> 
                                                            
                                                            <View style={[{flexDirection : 'row', alignItems:'center', top:10,}]}>
                                                                <Text style={[customText.text, {fontWeight:"bold",color:((hasPropositionPrice(product2) || product2.price > product2.newPrice ))?appColors.green:appColors.clearBlack}]}>{formatMoney(choosePrice(product2))} XAF{/* prix de la proposition ou real Price*/}</Text>
                                                                <View style={{width:10}}></View>
                                                                {
                                                                    (hasPropositionPrice(product2) || product2.price > product2.newPrice ) &&
                                                                    <Text style={[customText.text, {fontStyle:'italic',fontWeight:"bold",fontSize:11, color:appColors.secondaryColor1}]}> Offre Spéciale</Text>
                                                                }
                                                            </View>

                                                            <Text style={[customText.text, {top:10, fontSize:12, fontWeight:"bold"} ]} numberOfLines={2} >Stock Restant : {product2.stock}</Text>
                                                        </View>
                                                    </Pressable>    
                                                    <View style={[{height:5}]}></View>
                                                        <View style={[radioProductStyles.inBasketQuantity]}>
                                                            <Counter product={product2} number={quantities[product2._id]} quantities={quantities} dispatch={dispatch} setNumber={updateQuantitiesAndPrice} limit={product2.stock} />
                                                            <Pressable onPress={()=>{handleRemoveFromBasket(product2);}} style={[radioProductStyles.trash]}>
                                                                <Icon name="trash-outline" color={appColors.red} size={24} type="ionicon" style={[{/*alignSelf:"flex-end"*/}]} />
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                } 
                                                containerStyle={[radioProductStyles.checkBoxContainer,{}]} 
                                                textStyle={[customText.text,radioProductStyles.checkBoxText]} 
                                                checked={selectedSeller==product2.seller._id && selectedProducts[product2._id]} 
                                                onPress={() => {selectedSeller==product2.seller._id ? handleUpdateSelectedProducts(product2, true) : Alert.alert("Infos","Veillez d'abord selectionner le vendeur adéquat.") }} 
                                            
                                                />

                                                </View> 
                                            
                                                    

                                                    {product2.inBasket>0 &&
                                                        <>
                                                            <View style={[{height:5}]}></View>
                                                            <View style={radioProductStyles.inBasket}>
                                                                <Text style={[customText.text, {fontSize:10,}]}>{`Dans le panier de ${product2.inBasket} ${pluralize(product2.inBasket, 'autre')} ${pluralize(product2.inBasket, 'personne')}`}</Text>
                                                            </View>
                                                            <View style={{height:5,}}></View>
                                                        </>
                                                    }

                                                    
                                            
                                           
                                    </View>
                                )
                            }
                        })
                    }
                    </View>)
                })
                }                        
                
                
                </RadioButton.Group>
            </View>
        )
    }

    

    const products = [{products:datas}]

    return(
            <View style={[radioProductsListtStyles.container,]}>

                <View style={radioProductsListtStyles.top}>
                    <FlatList
                        data={products}
                        renderItem={ ({item}) => { return <RadioProduct item={item} user={user}  /> } }
                        keyExtractor={ (item) => { return Math.random().toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[radioProductsListtStyles.flatListContainer]}
                    />
                </View>

                    <View style={radioProductsListtStyles.bottom}>
                        <View style={radioProductsListtStyles.bottomPrice}>
                            <Text style={[radioProductsListtStyles.price, {color:appColors.secondaryColor3}]}>Total : </Text>
                            <Text style={[radioProductsListtStyles.price, {fontWeight:"bold",}]}>{formatMoney(totalPrice)?formatMoney(totalPrice):0} XAF</Text>
                        </View>
                        <View style={radioProductsListtStyles.buttonView}>
                            <CustomButton text="Payer" color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={()=>{proceedBasketPayment()}} styles={radioProductsListtStyles} />
                        </View>
                    </View>
            </View>
    )
}

export default  RadioProductsList


/* <Input value={quantities[product2._id]} onChangeText={(qt)=>{updateQuantities(product2._id, qt)}}
                                                                        inputMode='numeric'
                                                                        multiline={false}
                                                                        maxLength={2}
                                                                        placeholder='1'
                                                                        placeholderTextColor={appColors.secondaryColor3}
                                                                        inputStyle = {[searchBarStyles.inputText, {color:appColors.gray,}]}
                                                                        onFocus={() => updateQuantitiesFocused(product2._id, true)}
                                                                        onBlur={() => updateQuantitiesFocused(product2._id, false)}
                                                                        underlineColorAndroid='transparent'
                                                                        style={[{textAlign : 'center'}]}
                                                                        containerStyle={[{justifyContent:'center',alignItems:'center'}]}
                                                                        inputContainerStyle = {[radioProductStyles.inputContainer, quantitiesFocused[product2._id] && radioProductStyles.inputContainerFocused,]}
                                                                    />
*/