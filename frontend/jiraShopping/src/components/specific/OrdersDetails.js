import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert, Image, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { ordersDetailsStyles } from '../../styles/ordersDetailsStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';
import { CustomButton } from '../common/CommonSimpleComponents'


import { sinceDate, formatMoney, formatDateToLitteral, truncateText, openWhatsApp, whatsappMessage } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';
import { ordersStyles } from '../../styles/ordersStyles';
import { choosePrice } from '../../utils/commonAppFonctions'
import { orderPhone, productsImagesPath } from '../../remote/server';



const OrdersDetails = (props) => {
    //const { user } = useContext(UserContext)
    const user = {_id : "668fdfc6077f2a5c361dd7fc",}
    const [isLoading, setIsLoading] = useState(false)
   
    const navigation = useNavigation()
    const route = useRoute()
    const { ordersDetails } = route.params
    //const {orders, getOrders, page, sold, bought } = useContext(OrdersContext)

    /*
        const ordersDetails =  [{"__v": 0, "_id": "66731fcb569b492d3ef429ba", "buyer": {"__v": 14, "_id": "668fdfc6077f2a5c361dd7fc", "actif": 0, "createdAt": "2024-07-11T13:36:06.559Z", "email": "francky877832@gmail.com", "favourite": 25, "favourites": [Array], "follower": 0, "followers": [Array], "following": 0, "followings": [Array], "image": "http://192.168.133.254:3000/userApp/assets/images/new-user.jpg", "isEmailVerified": 0, "isPhoneNumberVerified": 0, "isPhoneVerified": 0, "online": 0, "password": "$2b$10$gef2m0T97E0VvHokTzjKMOYe4LXX/XALAp9r7zAoAyQENJynWppTm", "products": 0, "role": "seller", "star": 0, "updatedAt": "2024-07-11T13:36:06.559Z", "username": "francky877832", "ventes": 0}, "comments": [[Object]], "createdAt": "2024-06-19T18:10:39.702Z", "favourites": [], "group": [[Object]], "productDetails": [[Object]], "products": {"_id": "66cf430bc925887294010a3a", "createdAt": "2024-06-19T18:10:39.702Z", "groupId": "66d03e9cfa73e18593382cda", "groupOrders": [Object], "no": "211307101", "product": "6689733ae80918c70bc9fb23", "productDetails": [Object], "quantity": 2, "read": 1, "shippingAddress": [Object], "status": "shipping", "totalPrice": 50000, "updatedAt": "2024-06-19T18:10:39.702Z"}, "quantity": {}, "seller": {"__v": 
            13, "_id": "66715deae5f65636347e7f9e", "actif": 0, "createdAt": "2024-07-11T13:36:06.559Z", "email": "jira877832@gmail.com", "favourite": -12, "favourites": [Array], "follower": 0, "followers": [Array], "following": 0, "followings": [Array], "image": "http://192.168.133.254:3000/userApp/assets/images/new-user.jpg", "isEmailVerified": 0, "isPhoneNumberVerified": 0, "isPhoneVerified": 0, "online": 0, "password": "$2b$10$gef2m0T97E0VvHokTzjKMOYe4LXX/XALAp9r7zAoAyQENJynWppTm", "products": 0, "role": "seller", "star": 0, "updatedAt": "2024-07-11T13:36:06.559Z", "username": "jira877832", "ventes": 0}, "updatedAt": "2024-08-28T21:02:56.288Z"}]
        const order = ordersDetails[0]
    */
    
        const statusItem = {
            'payment_pending' : {color:appColors.yellow, iconName:'timer-outline', iconType:'ionicon'},
            'payment_successfull' : {color:appColors.green, iconName:'checkmark-shap', iconType:'ionicon'},
            'pending' : {color:appColors.yellow, iconName:'timer-outline', iconType:'ionicon'},
            'shipping' : {color:appColors.secondaryColor1, iconName:'', iconType:''},
            'delivered' : {color:appColors.green, iconName:'checkmark-shap', iconType:'ionicon'},
            'canceled' : {color:appColors.red, iconName:'close', iconType:'ionicon'},
            'completed' : {color:appColors.green, iconName:'checkmark-circle', iconType:'ionicon'},
        }

    const RenderOrderDetails = (props) => {
        const { order } = props
        return (
            <View style={[ordersDetailsStyles.orderContainer]}>
                <View style={[ordersDetailsStyles.top]}>
                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft,  {}]}>Date De Livraison : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {color:order.deliveryDate?black:statusItem[order.status].color}]}>{order.deliveryDate ? formatDateToLitteral(order.deliveryDate) : ' en cours' }</Text>
                    </View>

                    <View style={{height:5}}></View>

                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft,  {}]}>Numero De Livraion : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {color:order.deliveryNo?black:statusItem[order.status].color}]}>{order.deliveryNo ? order.deliveryNo : ' en cours' }</Text>
                    </View>
                </View>

                <View style={{height:20}}></View>

                <View style={[ordersDetailsStyles.seller]}>
                    
                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft,  {}]}>Boutique : </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>{order.product.seller.username}</Text>
                            <View style={{height:3}}></View>
                            <Icon name="caret-forward" type="ionicon" size={20} color={appColors.gray} />
                        </View>
                    </View>
                    
                    <View style={{height:10}}></View>

                    <View>
                        <CustomButton text="Visiter La Boutique"  styles={{ pressable: ordersDetailsStyles.button, text: ordersDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={()=>{ navigation.navigate('Shop', {seller:order.product.seller})}} />
                    </View>
                 
                </View>

                <View style={[ordersDetailsStyles.product]}>
                    <Pressable style={[ordersDetailsStyles.status]}>
                        <Icon name={statusItem[order.status]?.iconName} type={statusItem[order.status]?.iconType} size={18} color={statusItem[order.status]?.color} />
                        <View style={{width:5}}></View>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {color:statusItem[order.status]?.color}]}>{order.status}</Text>
                    </Pressable>

                    <View style={[ordersDetailsStyles.orderBody]}>
                        <Pressable style={[ordersDetailsStyles.orderImg]} onPress={()=>{ navigation.navigate('ProductDetails', {productDetails:order.product})}}>
                            <Image source={{uri: `${productsImagesPath}/${order.product.images[0]}`}} style={[ordersDetailsStyles.image]}  />
                        </Pressable>
         

                        <View style={[ordersDetailsStyles.productDetails]}>
                            <View>
                                <Text style={[customText.text, ordersDetailsStyles.textRight, {fontStyle:'italic'}]}>{order.product.seller.username}</Text>
                                <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>{truncateText(order.product.name, 25)[0]}{truncateText(order.product.name, 25)[1] ? "..." : null }</Text>
                            </View>

                            <View style={{height:10}}></View>

                            <View style={[ordersDetailsStyles.line]}>
                                <Text style={[customText.text, ordersDetailsStyles.textLeft, {color:appColors.black}]}>Quantité : </Text>
                                <Text style={[customText.text, ordersDetailsStyles.textRight, {color:appColors.black}]}>{order.quantity}</Text>
                            </View>

                            <View style={{height:10}}></View>

                            <View>
                                <Text style={[customText.text, ordersDetailsStyles.textRight, {color:appColors.secondaryColor1}]}>{formatMoney(order.uniquePrice)} XAF</Text>
                            </View>

                            <View style={{height:10}}></View>

                            <View>
                                <CustomButton text="Aller Au Produit"  styles={{ pressable: ordersDetailsStyles.button, text: ordersDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={()=>{ navigation.navigate('ProductDetails', {productDetails:order.product})}} />
                            </View>

                            <View style={{height:10}}></View>

                           
                        </View>

                    </View>
                
                {
                    order.buyerConfirmation!=1 && (user._id == ordersDetails.buyer._id) &&
                    <View style={[{}]}>
                       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={[{flexDirection:'row',justifyContent:'center'}]}>
                            <CustomButton text="J'ai reçu ce produit"  styles={{ pressable: {...ordersDetailsStyles.button, borderRadius:20}, text: ordersDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor5} onPress={()=>{ openWhatsApp(ordersDetails.group.orderPhone||orderPhone, '*NE MODIFIEZ PAS CE MESSAGE!!!!*\n\n'+whatsappMessage(ordersDetails.buyer.username, order.product.seller.username, "buyer-delivered", ordersDetails.group.no, ordersDetails.group._id, order.product._id)) }} />
                        </ScrollView>

                        <View style={[{}]}>
                            <Text style={[{fontSize:11,fontStyle:'italic'}]}>Confirmez lorsque vous avez reçu ce produit. Néamoins le confirmation est automatique 2 heures apres la réception du collis.</Text>
                        </View>
                    </View>
                }

                
                {
                    order.buyerConfirmation!=1 && (user._id != ordersDetails.buyer._id) &&
                    <View style={[{}]}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={[{flexDirection:'row',justifyContent:'center'}]}>
                            <CustomButton text="J'ai déja expédié ce produit"  styles={{ pressable: {...ordersDetailsStyles.button, borderRadius:20}, text: ordersDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor5} onPress={()=>{ openWhatsApp(ordersDetails.group.orderPhone||orderPhone, '*NE MODIFIEZ PAS CE MESSAGE!!!!*\n\n'+whatsappMessage(ordersDetails.buyer.username, order.product.seller.username, "seller-product-shipped", ordersDetails.group.no, ordersDetails.group._id, order.product._id)) }} />
                            <View style={{width:5}}></View>
                            <CustomButton text="Ce produit est déja arrivé"  styles={{ pressable: {...ordersDetailsStyles.button, borderRadius:20},  text: ordersDetailsStyles.buttonText,  }} color={appColors.white} backgroundColor={appColors.secondaryColor5} onPress={()=>{ openWhatsApp(ordersDetails.group.orderPhone||orderPhone, '*NE MODIFIEZ PAS CE MESSAGE!!!!*\n\n'+whatsappMessage(ordersDetails.buyer.username, order.product.seller.username, "seller-product-delivered", ordersDetails.group.no, ordersDetails.group._id, order.product._id)) }} />
                        </ScrollView>

                        <View style={[{}]}>
                            <Text style={[{fontSize:11,fontStyle:'italic'}]}>Vous recevrez automatiquement vos gains lorsque le client validera la reception du collis. Cliquez sur 'processus de livraison' ci haut ou dans la section Compte de l'appli pour plus d'informations.</Text>
                        </View>
                    </View>
                }

                </View>

            </View>
        )
    }

function flatlistHeader(){
    return(
        <View style={{top:5}}>
            <View style={[ordersDetailsStyles.topContainer]}>
                <View style={[ordersDetailsStyles.line]}>
                    <Text style={[customText.text, ordersDetailsStyles.textLeft,  {}]}>Numero De Commande : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>{ordersDetails.group.no}</Text>
                </View>

                <View style={{height:5}}></View>

                <View style={[ordersDetailsStyles.line]}>
                    <Text style={[customText.text, ordersDetailsStyles.textLeft,  {}]}>Date De Commande : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>{formatDateToLitteral(ordersDetails.group.createdAt)}</Text>
                </View>

                <View style={{height:5}}></View>

                <View style={[ordersDetailsStyles.line]}>
                    <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>Nombre De Produits : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.textRight, {color:appColors.clearGreen}]}>{`${ordersDetails.products.length} ${ordersDetails.products.length>1?"Produits":"Produit"}`}</Text>
                </View>

                <View style={{height:5}}></View>

                <View style={[ordersDetailsStyles.line]}>
                    <Text style={[customText.text, ordersDetailsStyles.textLeft,  {color:appColors.gray}]}>Total : </Text>
                    <Text style={[customText.text, ordersDetailsStyles.textRight, {color:appColors.secondaryColor1}]}>{formatMoney(ordersDetails.group.totalPrice)} XAF</Text>
                </View>

                <View style={{height:5}}></View>

        </View>
         
         <View style={{height:20}}></View>

        </View>
    )
}

function flatlistFooter(){
    return (
        <View>
            
            <View style={{height:20}}></View>

        <View style={[ordersStyles.ordersDetails]}>
            <View style={[ordersDetailsStyles.address]}>
                <View style={[ordersDetailsStyles.line, ordersDetailsStyles.location]}>
                    <Icon name='location' type='ionicon' size={18} color={appColors.secondaryColor1} />
                    <View style={{width:10}}></View>
                    <Text style={[customText.text, ordersDetailsStyles.textRight,]}>Adresse De Livraison</Text>
                </View>
                
                <View style={{height:20}}></View>

                <View style={[ordersDetailsStyles.addressDetails]}>
                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Acheteur : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{ordersDetails.buyer.name || ordersDetails.buyer.username}</Text>
                    </View>
                    
                    <View style={{height:10}}></View>

                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Ville :  </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{ordersDetails.group.shippingAddress.city}</Text>
                    </View>

                    <View style={{height:10}}></View>

                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Quartier : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{ordersDetails.group.shippingAddress.quater}</Text>
                    </View>

                    <View style={{height:10}}></View>

                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Address : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{ordersDetails.group.shippingAddress.completeAddress}</Text>
                    </View>

                    <View style={{height:10}}></View>

                    {
                        <View style={[ordersDetailsStyles.line]}>
                            <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Tél : </Text>
                            <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{ user._id == ordersDetails.buyer._id ? ordersDetails.group.phone :  ordersDetails.group.orderPhone}</Text>
                        </View>
                    }
                    {/*
                    ( user._id == ordersDetails.buyer._id) &&
                        <View style={[ordersDetailsStyles.line]}>
                            <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Tél : </Text>
                            <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{ordersDetails.group.phone}</Text>
                        </View>
                        */
                    }
                </View>
            </View>

            <View style={{height:20}}></View>

            <View style={[ordersDetailsStyles.payment]}>
                <Pressable style={[ordersDetailsStyles.line, ordersDetailsStyles.location]}>
                    <Icon name='newspaper-sharp' type='ionicon' size={18} color={appColors.secondaryColor1} />
                    <View style={{width:5}}></View>
                    <Text style={[customText.text, ordersDetailsStyles.textRight,]}>Informations De Payement</Text>
                </Pressable>
                
                <View style={{height:20}}></View>

                <View  style={[ordersDetailsStyles.paymentDetails]}>
                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Sous-total : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>{formatMoney(ordersDetails.group.totalPrice)} XAF</Text>
                    </View>
                    
                    <View style={{height:5}}></View>

                    <View style={[ordersDetailsStyles.line, {borderBottomWidth:1,borderColor:appColors.lightWhite,paddingBottom:10,}]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Extra : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {}]}>0 XAF</Text>
                    </View>

                    <View style={{height:5}}></View>

                    <View style={[ordersDetailsStyles.line]}>
                        <Text style={[customText.text, ordersDetailsStyles.textRight, {}]}>Total : </Text>
                        <Text style={[customText.text, ordersDetailsStyles.textLeft, {color:appColors.secondaryColor1}]}>{formatMoney(ordersDetails.group.totalPrice)} XAF</Text>
                    </View>



                </View>

            </View>
        </View>
    </View>
    )
}

    return (
        <View contentContainerStyle={[ordersDetailsStyles.container]}>
           <FlatList
                    data={ordersDetails.products}
                    renderItem={ ({item}) => { return(<RenderOrderDetails order={item} user={user} />
                ) } }
                    keyExtractor={ (item) => { return Math.random().toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[ordersDetailsStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={flatlistHeader}
                    ListFooterComponent={flatlistFooter}
                    style={[ordersDetailsStyles.flatlist]}
            />
        </View>
    );
} 


export default OrdersDetails