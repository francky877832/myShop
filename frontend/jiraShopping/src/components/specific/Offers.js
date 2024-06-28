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
    const { item, styles } = props
    if(item.hasGotResponse == 2)
    {
        if(item.from == loggedUser) //dont show input, show waiting for reply
        {
            return (
                <View>
                    <Text>Ok</Text>
                </View>
            )
        }
        else //show input + accept or refuse icons
        {

        }
    }
    else if(item.hasGotResponse == 0)
    {
        if(item.from == loggedUser) //show input + red x icon
        {
            return (
                <View>
                    <Text>Ok</Text>
                </View>
            )
        }
        else //show input + for another offers
        {

        }
    }
    else if(item.hasGotResponse == 1)
    {
            if(item.from == loggedUser) //...has accepted ur oofer
            {
                return (
                    <View>
                        <Text>Ok</Text>
                    </View>
                )
            }
            else //u accepted this offer
            {
    
            }
    }
}

const Offers = (props) => {

    //const _getLastOffers
    const offers = offersDatas[0].offers
    const [inputValue, setInputValue] = useState("")
    const [isFocused, setIsFocused] = useState(false)


    return (
        <View>
            <FlatList
                    data={offers}
                    renderItem={ ({item}) => { return <OffersItem item={item} styles={{}} /> } }
                    keyExtractor={ (item) => { return item.id.toString(); } }
                    horizontal={false}
                    numColumns={ 1 }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[]}
                />
                {
                    (offers[offers.length-1].hasGotResponse == 2 && offers[offers.length-1].from != loggedUser)
                    ||
                    (offers[offers.length-1].hasGotResponse == 0 && offers[offers.length-1].from == loggedUser)
                    ?
                    <View style={{flexDirection:"column"}}>
                        <Input placeholder="Placer une offre" onChangeText={(text)=>{setInputValue(text)}}
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
                        <View>
                            <Text>En attente de reponse...</Text>
                        </View>
                }
        </View>
    )
}

export default Offers

