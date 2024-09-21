import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Pressable} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { offersStyles } from '../../styles/offersStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { appColors, customText, appFont } from '../../styles/commonStyles';
import BadgeIcon from '../common/BadgeIcon';

import { accountStyles } from '../../styles/accountStyles';
import { settings } from '../../utils/offersDatas';
import { topStyles } from '../../styles/topStyles';
import badgeIconStyles from '../../styles/badgeIconStyles';
import { UserContext } from '../../context/UserContext';
import { OrdersContext } from '../../context/OrdersContext';
import { truncateTextAndAddDots } from '../../utils/commonAppFonctions'

import { ShareButton } from '../common/CommonSimpleComponents'
import { appStoreUrl, server } from '../../remote/server';

//const loggedUser = "Francky"
const   Account = (props) => {
    const navigation = useNavigation()
    const {user} = useContext(UserContext)
    const { bought, sold } = useContext(OrdersContext)
    
    //console.log(bought)
    const handleBoughtClicked = () => {
        navigation.navigate('Orders', {groupOrder:bought,page:'bought'})
    }

    const handleSoldClicked = () => {
        navigation.navigate('Orders', {groupOrder:sold,page:'sold'})
    }

    return(
        <ScrollView style={[accountStyles.container,{}]}>
            <View style={[accountStyles.top]}>
                <View style={{height:10,}}></View>

                <View style={[accountStyles.firstLine]}>
                    <Text style={[accountStyles.text,{fontWeight:"bold"}]}>@{truncateTextAndAddDots(user.username, 15)}</Text>
                    <View style={[accountStyles.firstLineIcons]}>
                        <Pressable  style={[topStyles.notification, ]} onPress = { ()=>{ navigation.navigate("Notifications");} }>
                            <BadgeIcon name="notifications" size={24} color="black" badgeCount={5} styles={badgeIconStyles} />
                        </Pressable>
                    </View>
                </View>

                    <View style={{height:20,}}></View>

                <View style={[accountStyles.achatsVentes]}>
                    <View style={[accountStyles.achatsVentesView]}>
                        <Pressable  style={[accountStyles.AchatIcon]} onPress={()=>{handleBoughtClicked()}}>
                            <Icon type="font-awesome" name="shopping-cart" size={50} color={appColors.secondaryColor1} />
                        </Pressable>
                        <View style={{height:5,}}></View>
                        <Text  style={[accountStyles.text]}>Mes Achats</Text>
                    </View>

                    <View style={[accountStyles.achatsVentesView]}>
                        <Pressable style={[accountStyles.AchatIcon]} onPress={()=>(navigation.navigate("MyShop"))}>
                            <Icon type="ionicon" name="bag-handle" size={50} color={appColors.secondaryColor1} />
                        </Pressable>
                        <View style={{height:5,}}></View>
                        <Text  style={[accountStyles.text]}>Ma Boutique</Text>
                    </View>

                    <View style={[accountStyles.achatsVentesView]}>
                        <Pressable style={[accountStyles.AchatIcon]} onPress={()=>{handleSoldClicked()}}>
                            <Icon type="materialicon" name="price-check" size={50} color={appColors.secondaryColor1} />
                        </Pressable>
                        <View style={{height:5,}}></View>
                        <Text  style={[accountStyles.text]}>Mes Ventes</Text>
                    </View>
                </View>
                
                <View style={{height:20,}}></View>
            </View>
            <View style={{height:20,}}></View>
                


            <View style={[accountStyles.settings,]}>
            {
              settings.map((item, key) => { 
                                if(user.role!='admin' && item.name.toLowerCase()=='admin')
                                    return;
                                
                                return(
                                <View key={key}>
                                    <Pressable style={[accountStyles.settingsElement, !item.available?accountStyles.unavailable:false]} onPress={()=>{navigation.navigate(`${item.component}`)}} disabled={!item.available}> 
                                        <Text style={[accountStyles.text,{fontSize:18,},!item.available?accountStyles.unavailable:false]}>{item.name}</Text>
                                            { item.available &&
                                                <Icon type="font-awesome" name="angle-right" size={30} color={appColors.secondaryColor1} />
                                            }
                                    </Pressable>
                                </View>
                                )
                             })
                }
                 <Pressable style={[accountStyles.settingsElement, ]} onPress={()=>{Linking.openURL(appStoreUrl)}} > 
                    <Text style={[accountStyles.text,{fontSize:18,},]}>Partager l'Appli</Text>
                    <ShareButton  size={30} color={appColors.secondaryColor1} styles={{}} link={appStoreUrl} />
                </Pressable>
            </View>
            
            <View style={{padding : 2,}}>
                <Text style={[accountStyles.text,{fontSize:18,color:appColors.gray}]}>Version 1.0.0</Text>
            </View>
         

        </ScrollView>

    
    )
}

export default Account