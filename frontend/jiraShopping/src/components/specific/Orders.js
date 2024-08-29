import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { ordersStyles } from '../../styles/ordersStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';


import { sinceDate, formatMoney, formatDateToLitteral } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';





const Orders = (props) => {
    //const { user } = useContext(UserContext)
    const user = {_id : "668fdfc6077f2a5c361dd7fc",}
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()
    const route = useRoute()
    const {orders, getOrders, page, sold, bought } = useContext(OrdersContext)

 

    const RenderOrder = (props) => {
        const { group  } = props
       //console.log(order.length)
       const order = group[0]
       const statusItem = {
        'pending' : {color:appColors.red, iconName:'', iconType:''},
        'shipping' : {color:appColors.secondaryColor1, iconName:'', iconType:''},
        'delivered' : {color:appColors.green, iconName:'', iconType:''},
        'canceled' : {color:appColors.red, iconName:'', iconType:''},
       }
//console.log(group)
        const handleNavigation = () => {
            console.log("ok")
            navigation.navigate("OrdersDetails", {ordersDetails:group})
       }
        return(
            <Pressable style={[ordersStyles.orderContainer]} onPress={()=>{handleNavigation()}}>
                <View style={[ordersStyles.orderTop]}>
                        <View style={[ordersStyles.date]}>
                            <View>
                                <Text style={[customText.text, ordersStyles.text]}>{formatDateToLitteral(order.products.groupOrders.createdAt)}</Text>
                            </View>
                            <View style={{flexDirection:'row',}}>
                                <Text style={[customText.text, ordersStyles.text]}>Total : </Text>
                                <Text style={[customText.text, ordersStyles.text, {color:appColors.secondaryColor1}]}>{formatMoney(order.products.groupOrders.totalPrice)} XAF</Text>
                            </View>
                        </View>

                        <Pressable style={[ordersStyles.shipping]} onPress={()=>{handleNavigation()}}>
                            <Text style={[customText.text, ordersStyles.text, {color:appColors.secondaryColor1}]}>Details</Text>
                            <Icon name="caret-forward" type="ionicon" size={18} color={appColors.secondaryColor1} />
                        </Pressable>
                </View>

                <View style={[ordersStyles.orderBody]}>
                        <Pressable style={[ordersStyles.status]}>
                            <Icon name={statusItem[order.products.groupOrders.status].iconName} type={statusItem[order.products.groupOrders.status].iconType} size={18} color={appColors.green} />
                            <Text style={[customText.text, ordersStyles.text, {color:statusItem[order.products.groupOrders.status].color}]}>{order.products.groupOrders.status}</Text>
                        </Pressable>

                    <FlatList
                        data={group}
                        renderItem={ ({item}) => { return(
                                <Pressable style={[ordersStyles.orderImg]}>
                                    <Image source={{uri: item.products.productDetails.images[0]}} style={[ordersStyles.images,{width:25,height:25}]} />
                                </Pressable>

                        ) } }
                        keyExtractor={ (item) => { return Math.random().toString(); } }
                        ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                        contentContainerStyle={[ordersStyles.flatlist]}
                        onEndReached={()=>{}}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={()=>{
                            return(
                                <View style={[ordersStyles.footer]}>
                                    <Text style={[customText.text, ordersStyles.text, {color:appColors.gray}]}>{`${group.length} ${group.length>1?"produits":"produit"}`}</Text>
                                </View>
                            )
                        }}
                    />
                    
                </View>
            </Pressable>
        )
    }

    useEffect(() => {

        const fetchData = async () => {  
            await getOrders(user, page)
          };
          
           fetchData();
    }, [])
//console.log(bought)
    return (
        <View style={[ordersStyles.container]}>
            <FlatList
                    data={bought}
                    renderItem={ ({item}) => { return(<RenderOrder group={item} user={user} />
                ) } }
                    keyExtractor={ (item) => { return Math.random().toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[ordersStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
            />
        </View>
    );
} 


export default Orders