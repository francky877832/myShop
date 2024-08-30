import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { ordersDetailsStyles } from '../../styles/ordersDetailsStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';
import { CustomButton } from '../common/CommonSimpleComponents'


import { sinceDate, formatMoney, formatDateToLitteral } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';





const OrdersDetails = (props) => {
    //const { user } = useContext(UserContext)
    const user = {_id : "668fdfc6077f2a5c361dd7fc",}
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()
    const route = useRoute()
    const {orders, getOrders, page, sold, bought } = useContext(OrdersContext)

    const ordersDetails =  [{"__v": 0, "_id": "66731fcb569b492d3ef429ba", "buyer": {"__v": 14, "_id": "668fdfc6077f2a5c361dd7fc", "actif": 0, "createdAt": "2024-07-11T13:36:06.559Z", "email": "francky877832@gmail.com", "favourite": 25, "favourites": [Array], "follower": 0, "followers": [Array], "following": 0, "followings": [Array], "image": "http://192.168.133.254:3000/userApp/assets/images/new-user.jpg", "isEmailVerified": 0, "isPhoneNumberVerified": 0, "isPhoneVerified": 0, "online": 0, "password": "$2b$10$gef2m0T97E0VvHokTzjKMOYe4LXX/XALAp9r7zAoAyQENJynWppTm", "products": 0, "role": "seller", "star": 0, "updatedAt": "2024-07-11T13:36:06.559Z", "username": "francky877832", "ventes": 0}, "comments": [[Object]], "createdAt": "2024-06-19T18:10:39.702Z", "favourites": [], "group": [[Object]], "productDetails": [[Object]], "products": {"_id": "66cf430bc925887294010a3a", "createdAt": "2024-06-19T18:10:39.702Z", "groupId": "66d03e9cfa73e18593382cda", "groupOrders": [Object], "no": "211307101", "product": "6689733ae80918c70bc9fb23", "productDetails": [Object], "quantity": 2, "read": 1, "shippingAddress": [Object], "status": "shipping", "totalPrice": 50000, "updatedAt": "2024-06-19T18:10:39.702Z"}, "quantity": {}, "seller": {"__v": 
        13, "_id": "66715deae5f65636347e7f9e", "actif": 0, "createdAt": "2024-07-11T13:36:06.559Z", "email": "jira877832@gmail.com", "favourite": -12, "favourites": [Array], "follower": 0, "followers": [Array], "following": 0, "followings": [Array], "image": "http://192.168.133.254:3000/userApp/assets/images/new-user.jpg", "isEmailVerified": 0, "isPhoneNumberVerified": 0, "isPhoneVerified": 0, "online": 0, "password": "$2b$10$gef2m0T97E0VvHokTzjKMOYe4LXX/XALAp9r7zAoAyQENJynWppTm", "products": 0, "role": "seller", "star": 0, "updatedAt": "2024-07-11T13:36:06.559Z", "username": "jira877832", "ventes": 0}, "updatedAt": "2024-08-28T21:02:56.288Z"}]
    const order = ordersDetails[0]
    
    const statusItem = {
        'pending' : {color:appColors.red, iconName:'', iconType:''},
        'shipping' : {color:appColors.secondaryColor1, iconName:'', iconType:''},
        'delivered' : {color:appColors.green, iconName:'', iconType:''},
        'canceled' : {color:appColors.red, iconName:'', iconType:''},
    }

    const RenderOrderDetails = (props) => {
        const { order } = props
        return (
            <View style={[ordersDetailsStyles.container]}>
                <View style={[ordersDetailsStyles.top]}>
                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.text,  {color:appColors.gray}]}>Date De Livraison : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>{formatDateToLitteral(order.products.groupOrders.createdAt)}</Text>
                    </View>

                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.text,  {color:appColors.gray}]}>Numero De Livraion : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>{order.products.groupOrders.no}</Text>
                    </View>
                </View>


                <View style={[ordersDetailsStyles.seller]}>
                    
                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.text,  {color:appColors.gray}]}>Boutique : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>{order.products.groupOrders.no + '>'}</Text>
                    </View>
                 

                </View>

                <View style={[ordersDetailsStyles.seller]}>
                    <Pressable style={[ordersDetailsStyles.status]}>
                        <Icon name={statusItem[order.products.groupOrders.status]?.iconName} type={statusItem[order.products.groupOrders.status]?.iconType} size={18} color={appColors.green} />
                        <Text style={[customText.text, ordersDetailsStyles.text, {color:statusItem[order.products.groupOrders.status]?.color}]}>{order.products.groupOrders.status}</Text>
                    </Pressable>

                    <View>
                        <View>
                        
                        </View>

                        <View>
                            <View>
                                <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>Seller</Text>
                                <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>Nom Produit</Text>
                            </View>

                            <View>
                                <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>Quantité : </Text>
                                <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>1</Text>
                            </View>

                            <View>
                                <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.secondaryColor1}]}>2000</Text>
                            </View>

                            <View>
                                <CustomButton text="Boutique"  styles={{ pressable: ordersDetailsStyles.button, text: ordersDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={() => { }} />
                            </View>

                        </View>

                    </View>
                 

                </View>

            </View>
        )
    }

    return (
        <View style={[ordersDetailsStyles.container]}>
            <View style={[ordersDetailsStyles.container]}>
                <View style={{flexDirection:'row',}}>
                    <Text style={[customText.text, ordersDetailsStyles.text,  {color:appColors.gray}]}>Numero De Commande : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>{order.products.groupOrders.no}</Text>
                </View>

                <View style={{flexDirection:'row',}}>
                    <Text style={[customText.text, ordersDetailsStyles.text,  {color:appColors.gray}]}>Date De Commande : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>{formatDateToLitteral(order.products.groupOrders.createdAt)}</Text>
                </View>

                <View style={{flexDirection:'row',}}>
                    <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.gray}]}>Nombre De Produits : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.black}]}>{`${ordersDetails.length} ${ordersDetails.length>1?"produits":"produit"}`}</Text>
                </View>

                <View style={{flexDirection:'row',}}>
                    <Text style={[customText.text, ordersDetailsStyles.text,  {color:appColors.gray}]}>Total : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.text, {color:appColors.secondaryColor1}]}>{order.products.groupOrders.totalPrice}</Text>
                </View>

            </View>

           <FlatList
                    data={ordersDetails}
                    renderItem={ ({item}) => { return(<RenderOrderDetails order={item} user={user} />
                ) } }
                    keyExtractor={ (item) => { return Math.random().toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[ordersDetailsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
            />
        </View>
    );
} 


export default OrdersDetails