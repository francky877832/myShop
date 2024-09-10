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

import { sinceDate, formatMoney, formatDateToLitteral, capitalizeFirstLetter } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';

import RenderNotificationItem from '../common/RenderNotificationItem';
import { OrdersContext } from '../../context/OrdersContext';
import SellerBrand from '../common/SellerBrand';




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
        'pending' : {color:appColors.yellow, iconName:'timer-outline', iconType:'ionicon'},
        'shipping' : {color:appColors.secondaryColor1, iconName:'', iconType:''},
        'delivered' : {color:appColors.green, iconName:'checkmark-shap', iconType:'ionicon'},
        'canceled' : {color:appColors.red, iconName:'close', iconType:'ionicon'},
        'completed' : {color:appColors.green, iconName:'checkmark-circle', iconType:'ionicon'},
       }
//console.log(group)
        const handleNavigation = () => {
            console.log("ok")
            navigation.navigate("OrdersDetails", {ordersDetails:group})
       }
        return(
            <Pressable style={[ordersStyles.orderContainer, ordersStyles.card]} onPress={()=>{handleNavigation()}}>
                <View style={[ordersStyles.orderTop]}>
                        <View style={[ordersStyles.orderTopLeft]}>
                            <View style={[ordersStyles.line, ordersStyles.date]}>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle]}>{formatDateToLitteral(order.products.groupOrders.createdAt)}</Text>
                            </View>

                            <View style={{height:10}}></View>

                            <View style={[ordersStyles.line]}>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:appColors.secondaryColor3}]}>Total : </Text>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:appColors.secondaryColor1}]}>{formatMoney(order.products.groupOrders.totalPrice)} XAF</Text>
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
                                <Icon name={statusItem[order.products.groupOrders.status].iconName} type={statusItem[order.products.groupOrders.status].iconType} size={18} color={statusItem[order.products.groupOrders.status].color} />
                                <View style={{width:5}}></View>
                                <Text style={[customText.text, ordersStyles.text, ordersStyles.textTitle, {color:statusItem[order.products.groupOrders.status].color}]}>{capitalizeFirstLetter(order.products.groupOrders.status)}</Text>
                            </View>

                            <View>

                            </View>
                        </Pressable>
                        
                    <View style={{height:10}}></View>

                    <FlatList
                        data={group}
                        renderItem={ ({item}) => { return(
                                <Pressable style={[ordersStyles.orderImg]}>
                                    <Image source={{uri: item.products.productDetails.images[0]}} style={[ordersStyles.images]} />
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
                                    <Text style={[customText.text, ordersStyles.text, {color:appColors.black, fontWeight:'bold'}]}>{`${group.length} ${group.length>1?"produits":"produit"}`}</Text>
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

const handleSellerBrandPressed = (product) => {
    navigation.navigate('Preferences', {screen: 'MyShop',params:undefined})
}

    return (
        <ScrollView style={[ordersStyles.container]}>
            <FlatList
                    data={bought}
                    renderItem={ ({item}) => { return(<RenderOrder group={item} user={user} />
                ) } }
                    keyExtractor={ (item) => { return Math.random().toString(); } }
                    ItemSeparatorComponent ={ (item) => { return <View style={{height:5,}}></View> }}
                    contentContainerStyle={[ordersStyles.flatlist]}
                    onEndReached={()=>{}}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={()=>{
                        return(
                            <View>
                                <View style={{height:20}}></View>
                                <Pressable style={[ordersStyles.sellerBrand,]} onPress={()=>{handleSellerBrandPressed() }}>
                                    <SellerBrand pub={false} onlineDate={user.online} username={user.username} navigation={navigation} route={route} closeNotif={false} />
                                </Pressable>
                            </View>
                        )
                    }}
            />
        </ScrollView>
    );
} 


export default Orders