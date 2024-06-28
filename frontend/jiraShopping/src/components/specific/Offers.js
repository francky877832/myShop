import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable} from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { offersStyles } from '../../styles/offersStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { appColors, customText, appFont } from '../../styles/commonStyles';

import { formatMoney } from '../../utils/commonAppFonctions';
import { offersDatas } from '../../utils/offersDatas';

const loggedUser = "Francky"
const   OffersItem = (props) => {
    const { item, styles, seller, buyer } = props
    console.log(item)
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

    //const _getLastOffers
    const offers = offersDatas[0].offers
    const seller = offersDatas[0].seller
    const buyer = offersDatas[0].buyer

    const [inputValue, setInputValue] = useState(formatMoney(""))
    const [isFocused, setIsFocused] = useState(false)


    return (
        <View style={[offersStyles.container]}>
            <FlatList
                    data={offers}
                    renderItem={ ({item}) => { return <OffersItem item={item} seller={seller} buyer={buyer} styles={{}} /> } }
                    keyExtractor={ (item) => { return item.id.toString(); } }
                    horizontal={false}
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[offersStyles.offersContainer]}
                />
                {
                    (offers[offers.length-1].hasGotResponse == 0)
                    ?
                    <View style={[offersStyles.inputContainer]}>
                        <Input placeholder="Placer une offre" onChangeText={(text)=>{setInputValue(formatMoney(text))}}
                            multiline={false}
                            inputMode='numeric'
                            placeholderTextColor={appColors.lightBlack}
                            style = {[offersStyles.input, isFocused && offersStyles.inputFocused, offersStyles.searchBarInput, {fontSize:16,padding:5,}]}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            underlineColorAndroid='transparent'
                            inputContainerStyle={ { borderBottomWidth: 1, }}
                            rightIcon={ 
                                    <View style={[offersStyles.rightIcon]}>
                                        <Text style={[offersStyles.money]}>XAF</Text>
                                        <View style={{width:10}}></View>
                                        <Pressable onPress={() => {console.log("Go")}} >
                                            <Icon name='send-sharp' type='ionicon' size={24} color={appColors.secondaryColor1} />
                                        </Pressable>
                                    </View>
                                 }
                            value={inputValue}
                         />
        
                    </View>
                    :
                        offers[offers.length-1].hasGotResponse == 2 && offers[offers.length-1].from != loggedUser
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
                                    offers[offers.length-1].hasGotResponse == 1
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

