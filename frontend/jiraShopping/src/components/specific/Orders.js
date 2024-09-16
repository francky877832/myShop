import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert, Image, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { ordersStyles } from '../../styles/ordersStyles';
import { productDetailsStyles } from '../../styles/productDetailsStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';

import { sinceDate, formatMoney, formatDateToLitteral, capitalizeFirstLetter, } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';

import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';
import SellerBrand from '../common/SellerBrand';
import { productsImagesPath } from '../../remote/server';



const Orders = (props) => {
    const { user } = useContext(UserContext)
    //const user = {_id : "668fdfc6077f2a5c361dd7fc",}
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()
    const {orders, getOrders, page, sold, bought } = useContext(OrdersContext)
    const { groupOrder } = route.params
 /*   
    useEffect(() => {
        console.log("USEEFFECT")
        const fetchData = async () => {  
            await getOrders(user, page)
          }

          fetchData()
    }, [isFocused])
*/
    const RenderOrder = (props) => {
        const { order  } = props
       //console.log(order.length)
       
       const statusItem = {
        'payment_pending' : {color:appColors.yellow, iconName:'timer-outline', iconType:'ionicon'},
        'payment_successfull' : {color:appColors.green, iconName:'checkmark-shap', iconType:'ionicon'},
        'pending' : {color:appColors.yellow, iconName:'timer-outline', iconType:'ionicon'},
        'shipping' : {color:appColors.secondaryColor1, iconName:'truck-delivery', iconType:'material-community'},
        'delivered' : {color:appColors.green, iconName:'checkmark-shap', iconType:'ionicon'},
        'canceled' : {color:appColors.red, iconName:'close', iconType:'ionicon'},
        'completed' : {color:appColors.green, iconName:'checkmark-circle', iconType:'ionicon'},
       }
//console.log(group)
        const handleNavigation = () => {
            console.log("ok")
            navigation.navigate("OrdersDetails", {ordersDetails:order})
       }
        return(
            <Pressable style={[ordersStyles.orderContainer, ordersStyles.card]} onPress={()=>{handleNavigation()}}>
                <View style={[ordersStyles.orderTop]}>
                        <View style={[ordersStyles.orderTopLeft]}>
                            <View style={[ordersStyles.line, ordersStyles.date]}>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle]}>{formatDateToLitteral(order.group.createdAt)}</Text>
                            </View>

                            <View style={{height:10}}></View>

                            <View style={[ordersStyles.line]}>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:appColors.secondaryColor3}]}>Total : </Text>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:appColors.secondaryColor1}]}>{formatMoney(order.group.totalPrice)} XAF</Text>
                            </View>
                            
                            <View style={{height:10}}></View>
                        
                        </View>

                            

                        <Pressable style={[ordersStyles.line, ordersStyles.shipping]} onPress={()=>{handleNavigation()}}>
                            <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:appColors.secondaryColor1}]}>Details</Text>
                            <Icon name="caret-forward" type="ionicon" size={18} color={appColors.secondaryColor1} />
                        </Pressable>
                </View>

                <View style={[ordersStyles.orderBody]}>

                    <View style={{height:10}}></View>

                        <Pressable style={[ordersStyles.statusLine]}>
                            <View style={[ordersStyles.status]}>
                                <Icon name={statusItem[order.group.status].iconName} type={statusItem[order.group.status].iconType} size={18} color={statusItem[order.group.status].color} />
                                <View style={{width:5}}></View>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:statusItem[order.group.status].color}]}>{capitalizeFirstLetter(order.group.status)}</Text>
                            </View>

                            <View>

                            </View>
                        </Pressable>
                        
                    <View style={{height:10}}></View>

                    <View style={[ordersStyles.orderImagesContainer]}>
                            {
                                order.products.map((item, key) => {
                                    return (
                                            <View key={key} style={[{flexDirection:'row'}]}>
                                                <Pressable style={[ordersStyles.orderImg]} onPress={()=>{ navigation.navigate('ProductDetails', {productDetails:item.product})}}>
                                                    <Image source={{uri: `${productsImagesPath}/${item.product.images[0]}`}} style={[ordersStyles.images]} />
                                                </Pressable>
                                                <View style={{width:10}}></View>
                                            </View>
                                    )
                                })
                            }
                        </View>

                        <View style={[ordersStyles.footer]}>
                            <Text style={[customText.text, ordersStyles.text, {color:appColors.black, fontWeight:'bold'}]}>{`${order.products.length} ${order.products.length>1?"produits":"produit"}`}</Text>
                        </View>

                
                </View>
            </Pressable>
        )
    }

    useEffect(() => {
/*
        const fetchData = async () => {  
            await getOrders(user, page)
          };
          
           fetchData();*/
    }, [])
//console.log(bought)

const handleSellerBrandPressed = (product) => {
    navigation.navigate('Preferences', {screen: 'MyShop',params:undefined})
}

    return (
        <View style={[ordersStyles.container]}>
            <FlatList
                    data={groupOrder}
                    renderItem={ ({item}) => { return(<RenderOrder order={item} user={user} />
                ) } }
                    keyExtractor={ (item) => { return Math.random().toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[ordersStyles.flatlist,{paddingBottom:20}]}
                    style={[]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={()=>{
                        /*
                        return(
                            <View>
                                <View style={{height:20}}></View>
                                <Pressable style={[ordersStyles.sellerBrand,]} onPress={()=>{handleSellerBrandPressed() }}>
                                    <SellerBrand pub={false} onlineDate={user.online} username={user.username} navigation={navigation} route={route} closeNotif={false} />
                                </Pressable>
                            </View>
                        )*/
                    }}
            />
        </View>
    );
} 


export default Orders


/*
 <FlatList
                        data={order.products}
                        renderItem={ ({item}) => { return(
                            //order.map(product => {
                                    //return (
                                        <Pressable style={[ordersStyles.orderImg]}>
                                            <Image source={{uri: item.product.images[0]}} style={[ordersStyles.images]} />
                                        </Pressable>
                                    //)
                                //})
                               

                        ) } }
                        keyExtractor={ (item) => { return Math.random().toString(); } }
                        ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                        contentContainerStyle={[ordersStyles.flatlist]}
                        onEndReached={()=>{}}
                        onEndReachedThreshold={0.5}
                        //order.group.quantity
                        ListFooterComponent={()=>{
                            return(
                                <View style={[ordersStyles.footer]}>
                                    <Text style={[customText.text, ordersStyles.text, {color:appColors.black, fontWeight:'bold'}]}>{`${order.products.length} ${order.products.length>1?"produits":"produit"}`}</Text>
                                </View>
                            )
                        }}
                    />
            */