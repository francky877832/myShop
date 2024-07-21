import { API_BACKEND } from '@env';

import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Alert, Pressable, ActivityIndicator} from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { offersStyles } from '../../styles/offersStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { appColors, customText, appFont } from '../../styles/commonStyles';

import { formatMoney, checkOfferPrice, serialize } from '../../utils/commonAppFonctions';
import { offersDatas } from '../../utils/offersDatas';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';

const loggedUser = "Francky"
const   OffersItem = (props) => {
    const { item, styles, seller, buyer } = props
    //console.log(item)
    const from  = item.from //== "buyer" ? buyer : seller
    if(item.hasGotResponse == 2)
    {
        //if(from == loggedUser) //dont show input, show waiting for reply
         //else show input + accept or refuse icons
        return (
                <View style={[offersStyles.offerContainer,{}]}>
                    {
                        from == loggedUser
                        ?
                            <View style={[offersStyles.offer, offersStyles.offerRight ,{}]}>
                                <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor3,}]}>
                                    <Text>{item.price}</Text>
                                </View>
                                <View style={[offersStyles.offerBottom,{}]}>
                                        <View style={[{flex:1,alignItems:"center",justifyContent:"center",}]}>
                                            <Text style={[customText.text, offersStyles.offerBottomText, {color:appColors.secondaryColor1}]}>En attente...</Text>
                                        </View>
                                </View>
                            </View>
                           
                        :
                        
                            
                    
                            <View style={[offersStyles.offer, offersStyles.offerLeft ,{}]}>
                                <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor4,}]}>
                                    <Text>{item.price}</Text>
                                </View>
                                {/*
                                <View style={[offersStyles.offerBottom,{}]}>
                                        <Pressable style={[{flexDirection:"row",justifyContent:"center",alignItems:"center"}]}>
                                            <Icon name='close-circle' type='ionicon' size={18} color={appColors.red} />
                                            <Text style={[customText.text, offersStyles.offerBottomText]}>Refuser</Text>
                                        </Pressable>
                                        <Pressable style={[{flexDirection:"row",justifyContent:"center",alignItems:"center"}]}>
                                        <Icon name='checkmark-circle' type='ionicon' size={18} color={appColors.green} />
                                            <Text style={[customText.text, offersStyles.offerBottomText]}>Accepter</Text>
                                        </Pressable>
                                </View>*/}
                            </View>
                    }
                </View>
            )
    }
    else if(item.hasGotResponse == 0)
    {
        //if(from == loggedUser) //show input + red x icon
        //else show input + for another offers
        
            return (
                <View style={[offersStyles.offerContainer,{}]}>
                    {
                        from == loggedUser
                        ?
                            <View style={[offersStyles.offer, offersStyles.offerRight ,{}]}>
                                <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor3,}]}>
                                    <Text>{item.price}</Text>
                                </View>
                                <View style={[offersStyles.offerBottom,{}]}>
                                        <View style={[{flex:1,alignItems:"center",justifyContent:"center",}]}>
                                            <Icon name='close-circle' type='ionicon' size={18} color={appColors.red} />
                                            <Text style={[customText.text, offersStyles.offerBottomText]}>Refusé</Text>
                                        </View>
                                </View>
                            </View>
                           
                        :
                            <View style={[offersStyles.offer, offersStyles.offerLeft ,{}]}>
                                <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor4,}]}>
                                    <Text>{item.price}</Text>
                                </View>
                                <Pressable style={[offersStyles.offerBottom,{}]}>
                                    <View style={[{flex:1,alignItems:"center",justifyContent:"center",}]}>
                                        <Icon name='close-circle' type='ionicon' size={18} color={appColors.red} />
                                        <Text style={[customText.text, offersStyles.offerBottomText]}>Refusé</Text>
                                    </View>
                                </Pressable>
                            </View>
                    }
                </View>
            )
    }
    else if(item.hasGotResponse == 1)
    {
        //if(from == loggedUser) //close input + red thick icon
        //else close input and "has been approved"
        return (
            <View style={[offersStyles.offerContainer,{}]}>
            {
                from == loggedUser
                ?
                    <View style={[offersStyles.offer, offersStyles.offerRight ,{}]}>
                        <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor3,}]}>
                            <Text>{item.price}</Text>
                        </View>
                        <View style={[offersStyles.offerBottom,{}]}>
                                <View style={[{flex:1,alignItems:"center",justifyContent:"center",}]}>
                                    <Icon name='checkmark-circle' type='ionicon' size={18} color={appColors.green} />
                                    <Text style={[customText.text, offersStyles.offerBottomText]}>Accepté</Text>
                                </View>
                        </View>
                    </View>
                   
                :
                    <View style={[offersStyles.offer, offersStyles.offerLeft ,{}]}>
                        <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor4,}]}>
                            <Text>{item.price}</Text>
                        </View>
                        <Pressable style={[offersStyles.offerBottom,{}]}>
                            <View style={[{flex:1,alignItems:"center",justifyContent:"center",}]}>
                                <Icon name='checkmark-circle' type='ionicon' size={18} color={appColors.green} />
                                <Text style={[customText.text, offersStyles.offerBottomText]}>Accepté</Text>
                            </View>
                        </Pressable>
                    </View>
            }
        </View>
            )
    }
}

const Offers = (props) => {

    const route = useRoute()
    const { product } = route.params
    //const _getLastOffers
    const [offers, setOffers] = useState(offersDatas[0])
    

    const [inputValue, setInputValue] = useState(formatMoney(""))
    const [isFocused, setIsFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isPriceLoading, setIsPriceLoading] = useState(false)

    const [priceError, setPriceError] = useState(false)

    const realPrice = !!product.newPrice ? product.newPrice : product.price
    const downBoundry = realPrice*(50/100)
    const upBoundry = realPrice

    const { user } = useContext(UserContext)

const checkPrice = (price) => {
    
    if(price < downBoundry || price > upBoundry)
    {
        setPriceError(true)
    }
    else
    {
        setPriceError(false)
    }
    setInputValue(formatMoney(price))

}
const addOffer = useCallback(async ()=>{
    //console.log(user)
    setIsPriceLoading(true)
    //console.log(product)
  
        const offer = {
            seller : product.sellerName,
            buyer : user.username,
            product : product._id,
            realPrice : realPrice,
            offers : { price : inputValue, from : user.username, hasGotResponse:2, },
            //hasGotResponse : 0,
        }

    //CONTROLES DES PRIX DE PROPOSITONS
        
        try
        {
            response = await fetch(`${API_BACKEND}/api/datas/offers/offer/update`, {
            method: 'POST',
            body: JSON.stringify(offer),
            headers: {
                'Content-Type': 'application/json',
            },})
            
            if(!response.ok)
            {
                throw new Error("Erreur lors de l'ajout de l'offre : ", (await response.json().error))
            }
            Alert.alert("Offre ajouté avec succes")
            setIsPriceLoading(false)
            setIsLoading(true)
    }catch(error){
        console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        setIsPriceLoading(false)
    }
},[])

const fetchUserOffers = async()=>{
    //console.log("Callback")
    const offer = {
            seller : product.sellerName,
            buyer : user.username,
            product : product._id,
    }
    try{
        //console.log("Ok")
            const response = await fetch(`${API_BACKEND}/api/datas/offers/offer/get?${serialize(offer)}`);            
            const datas = await response.json()
                    //console.log(datas)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
                console.log(datas[0].offers)
            setOffers(datas[0])
    }catch(error){
                
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
    }

}

const setHasGotResponse = async (bool)=>{
    
    //put setIsLoading(true) a la fin
}


useEffect(()=>{
        const fetchData = async () => {
            //setIsLoading(true);
            await fetchUserOffers()
            setIsLoading(false);
          };
      
          if (isLoading) {
            fetchData();
          }
        //console.log("basket")
    }, [isLoading,fetchUserOffers])
    return (
        <View style={[offersStyles.container]}>
            <FlatList
                    data={offers.offers}
                    renderItem={ ({item}) => { return <OffersItem item={item} seller={offers.seller} buyer={offers.buyer} styles={{}} /> } }
                    keyExtractor={ (item) => { return item._id.toString(); } }
                    horizontal={false}
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[offersStyles.offersContainerFlatlist]}
                />
    <View style={[offersStyles.bottom]}>
                {
                    (offers.offers[offers.offers?.length-1].hasGotResponse == 0)
                    ?
                    <View style={[offersStyles.inputContainer]}>
                        <Input placeholder="Placer une offre" onChangeText={(text)=>{checkPrice(text)}}
                            multiline={false}
                            onSubmitEditing={addOffer}
                            keyboardType='number-pad'
                            placeholderTextColor={appColors.lightBlack}
                            style = {[offersStyles.input, offersStyles.searchBarInput, {fontSize:16,padding:5,}]}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={[{borderBottomWidth:1}, isFocused && offersStyles.inputFocused,]}
                            rightIcon={ 
                               
                                    <View style={[offersStyles.rightIcon]}>
                                        <Text style={[offersStyles.money]}>XAF</Text>
                                        <View style={{width:10}}></View>
                                        { priceError ?
                                               <ActivityIndicator size="large" color={appColors.secondaryColor1}/>
                                            :
                                            <Pressable onPress={() => {addOffer()}} >
                                                { isPriceLoading ?
                                                     <ActivityIndicator size="large" color={appColors.white}/>
                                                    :
                                                    <Icon name='send-sharp' type='ionicon' size={40} color={appColors.secondaryColor1} />
                                                }
                                            </Pressable>
                                        }
                                    </View>
                                
                                 }
                            value={inputValue}
                         />
                        {priceError &&
                            <View style={{alignItems:"center"}}>
                                <Text style={[customText.text,{color:appColors.red,fontWeight:"bold",}]}>Le prix doit etre compris entre {downBoundry} et {upBoundry}</Text>
                            </View>
                        }
        
                    </View>
                    :
                            offers.offers[offers.offers?.length-1].hasGotResponse == 2 && offers.offers[offers.offers.length-1].from != loggedUser
                            ?
                            <View style={[offersStyles.inputContainer, offersStyles.offerBottom,{flex:1,backgroundColor:appColors.white}]}>
                                <Pressable style={[offersStyles.offersBottomConfirmationButtom,{}]}>
                                    <Icon name='close-circle' type='ionicon' size={24} color={appColors.red} />
                                    <Text style={[customText.text,]}>Refuser</Text>
                                </Pressable>
                                <Pressable style={[offersStyles.offersBottomConfirmationButtom,{}]}>
                                    <Icon name='checkmark-circle' type='ionicon' size={24} color={appColors.green} />
                                    <Text style={[customText.text,]}>Accepter</Text>
                                </Pressable>
                            </View>
                            :
                                    offers.offers[offers.offers.length-1].hasGotResponse == 1
                                    ?
                                        <View style={[offersStyles.inputContainer, offersStyles.offerBottom,{flex:1,backgroundColor:appColors.white}]}>
                                            <Pressable style={[offersStyles.offersBottomConfirmationButtom,{}]}>
                                                <Icon name='checkmark-circle' type='ionicon' size={24} color={appColors.green} />
                                                    <Text style={[customText.text,]}>Accepté</Text>
                                                </Pressable>
                                            </View>
                                    :
                                        <View style={[offersStyles.inputContainer, offersStyles.offersBottomWaiting,{}]}>
                                            <Icon name='time-sharp' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                            <Text style={[customText.text, ]}>Offre en attente de réponse</Text>
                                        </View>
                }
                </View>
        </View>
    )
}

export default Offers





                        {
                            
                            /*
                            <View style={[offersStyles.offer, offersStyles.offerLeft ,{}]}>
                                <View style={[offersStyles.offerTop,{backgroundColor:appColors.secondaryColor4,}]}>
                                    <Text>{item.price}</Text>
                                </View>
                                <View style={[offersStyles.offerBottom,{}]}>
                                        <Pressable style={[{flexDirection:"row",justifyContent:"center",alignItems:"center"}]}>
                                            <Icon name='close-circle' type='ionicon' size={18} color={appColors.red} />
                                            <Text style={[customText.text, offersStyles.offerBottomText]}>Refuser</Text>
                                        </Pressable>
                                        <Pressable style={[{flexDirection:"row",justifyContent:"center",alignItems:"center"}]}>
                                        <Icon name='checkmark-circle' type='ionicon' size={18} color={appColors.green} />
                                            <Text style={[customText.text, offersStyles.offerBottomText]}>Accepter</Text>
                                        </Pressable>
                                </View>
                            </View>
                        */}

