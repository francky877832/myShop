import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

import { CustomButton } from '../common/CommonSimpleComponents'

import { topStyles } from '../../styles/topStyles';
import { appColors, appFont, customText, screenHeight } from '../../styles/commonStyles';
import { adminPannelStyles } from './styles/adminPannelStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';
import { addProductStyles } from '../../styles/addProductStyles';
import { OrdersContext } from '../../context/OrdersContext';
import { ScrollView } from 'react-native-gesture-handler';

const AdminPanel = (props, ref) => {
    const { } = props
    const { getOrderFromAdmin } = useContext(OrdersContext)

    const [productsStatus, setProductsStatus] = useState({status:{}, buyerConfirmation:{}, delivererConfirmation:{}, deliveryDate:{}})
    const [groupStatus, setGroupStatus] = useState("java")
    const [paymentStatus, setPaymentStatus] = useState("java")

    //const [deliveryDate]

    const [orderNo, setOrderNo] = useState("")
    const [orders, setOrders] = useState([])
    const [group, setGroup] = useState([])

    const obj=15;
    const [isOrderNoFocused, setIsOrderNoFocused] = useState(false)
    
    const updateProductsStatus = (label, product, value) => {
        setProductsStatus(prev => {
            return {
                ...prev,
                [label] : {[product] : value}
            }
        })
    }

    const getOrder = async (orderNo) => {
        try
        {
            const datas = await getOrderFromAdmin(orderNo)
            setOrders(datas.orders[0])
            setGroup(datas.group[0])
            //console.log(datas)
        }catch(error){
            console.log(error)
            return []
        }
    }

    const setOrder = async (orderNo) => {
        try
        {
            const orderDatas = {
                ...orders,
                products : orders.products.map(el => {
                    return {
                        ...el,
                        status : productsStatus["status"][el.product] || el.status,
                        buyerConfirmation : productsStatus["buyerConfirmation"][el.product] || el.buyerConfirmation,
                        delivererConfirmation : productsStatus["delivererConfirmation"][el.product] || el.delivererConfirmation,
                        //deliveryDate : productsStatus["deliveryDate"][el.product] || el.deliveryDate,
                        deliveryDate : productsStatus["deliveryDate"][el.product] ?  new Date().toISOString() : null,

                        //deliveryNo : productsStatus["deliveryNo"][el.product],
                        //deliveryDate : productsStatus["deliveryDate"][el.product],
                    }
                })
            }
            //console.log(orderDatas)
        }catch(error){
            console.log(error)
            return []
        }
    }

    useEffect(() => {
        const fetchDatas = async () => {
            await getOrder("JW-20240919-2976")
        }

        fetchDatas()
    }, [])

    const OrderProduct = (props) => {
        const { item, key } = props
        return (
            <View  style={[adminPannelStyles.contents,{borderBottomWidth:1,borderColor:appColors.lightWhite}]} key={key}>

                    <View styles={[adminPannelStyles.titles,]}>
                        <Text>Product : {item.product}</Text>
                    </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View styles={[adminPannelStyles.titles]}>
                        <Text>Status</Text>
                    </View>

                    <Picker selectedValue={productsStatus["status"][item.product]} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => updateProductsStatus("status", item.product, itemValue)}>
                        <Picker.Item label="Pending" value="pending" />
                        <Picker.Item label="Shipped" value="shipped" />
                        <Picker.Item label="Delivered" value="delivered" />
                        <Picker.Item label="Canceled" value="canceled" />
                    </Picker>
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View styles={[adminPannelStyles.titles]}>
                        <Text>Deliverer Confirmation : </Text>
                    </View>
                    <Picker selectedValue={productsStatus["delivererConfirmation"][item.product]} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => updateProductsStatus("delivererConfirmation", item.product, itemValue)}>
                        <Picker.Item label="Failed" value="0" />
                        <Picker.Item label="Success" value="1" />
                        <Picker.Item label="Processing" value="2" />
                    </Picker>
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View styles={[adminPannelStyles.titles]}>
                        <Text>Buyer Confirmation</Text>
                    </View>

                    <Picker selectedValue={productsStatus["buyerConfirmation"][item.product]} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => updateProductsStatus("buyerConfirmation", item.product, itemValue)}>
                        <Picker.Item label="Failed" value="0" />
                        <Picker.Item label="Success" value="1" />
                        <Picker.Item label="Processing" value="2" />
                    </Picker>
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View styles={[adminPannelStyles.titles]}>
                        <Text> Delivery No</Text>
                    </View>
                    
                    {!item.deliveryNo ?
                        <Pressable>
                            <Text>Generate</Text>
                        </Pressable>
                        :
                        <View>
                            <Text>{item.deliveryNo}</Text>
                        </View>
                    }
                    
                </View>

                <View style={[adminPannelStyles.line,{}]}>
                    <View styles={[adminPannelStyles.titles]}>
                        <Text> Delivery Date</Text>
                    </View>
                    
                    {!item.deliveryDate ?
                        <Pressable onPress={()=>{updateProductsStatus("deliveryDate", item.product, !productsStatus["deliveryDate"][item.product])}}
                            style={[adminPannelStyles.deliveryDate, {backgroundColor:productsStatus["deliveryDate"][item.product] ? appColors.green : appColors.gray }]}
                        >
                            <Text style={[customText.text, {color:appColors.white}]}>{productsStatus["deliveryDate"][item.product] ? "Now" : "Not Now"}</Text>
                        </Pressable>
                        :
                        <View>
                            <Text>{item.deliveryDate}</Text>
                        </View>
                    }
                    
                </View>
            </View>
        )
    }

    return(
        <ScrollView contentContainerStyle={[adminPannelStyles.container, ]}>
            <View styles={[adminPannelStyles.containers]} >
                <View styles={[adminPannelStyles.titles]}>
                    <Text>Numero De Commande</Text>
                </View>
                <Input placeholder="Numero de commande" value={orderNo} onChangeText={(no)=>{setOrderNo(no)}}
                            inputMode='text'
                            multiline={false}
                            maxLength={100}
                            placeholderTextColor={appColors.secondaryColor3}
                            inputStyle = {[searchBarStyles.inputText, ]}
                            onFocus={() => setIsOrderNoFocused(true)}
                            onBlur={() => setIsOrderNoFocused(false)}
                            underlineColorAndroid='transparent'
                            containerStyle={ []}
                            inputContainerStyle = {[adminPannelStyles.inputContainer ]}
                />
            </View>

            <View style={[adminPannelStyles.addProductSubmitView,{}]}>
                <CustomButton text="Chercher" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={adminPannelStyles} onPress={() => {getOrder()}} />
            </View>


            <View style={[adminPannelStyles.containers,{}]}>
                <View style={[adminPannelStyles.group,{}]}>
                    <View style={[adminPannelStyles.titles,{}]}>
                        <Text>Informations sur le groupe</Text>
                    </View>

                    <View style={[adminPannelStyles.contents,{}]}>
                        <View style={[adminPannelStyles.line,{}]}>
                            <View>
                                <Text>Status : </Text>
                            </View>
                           
                            <Picker selectedValue={groupStatus} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => setGroupStatus(itemValue)}>
                                <Picker.Item label="Pending" value="pending" />
                                <Picker.Item label="Shipped" value="shipped" />
                                <Picker.Item label="Delivered" value="delivered" />
                            </Picker>

                        </View>

                        <View style={[{height:10}]}></View>

                        <View style={[adminPannelStyles.line,{}]}>
                            <View>
                                <Text>Payment Status : </Text>
                            </View>
                            
                            <Picker selectedValue={paymentStatus} style={adminPannelStyles.picker}  onValueChange={(itemValue, itemIndex) => setPaymentStatus(itemValue)}>
                            <Picker.Item label="Payment Pending" value="payment_pending" />
                                <Picker.Item label="Payment Successful" value="payment_successful" />
                                <Picker.Item label="Payment Failed" value="payment_failed" />
                            </Picker>
                        </View>
                    </View>
                </View>


                <View style={{height:20}}></View>

                <View style={[adminPannelStyles.products]}>
                {
                    orders?.products?.map((item, key) => { 
                        return( 
                            <>
                                <OrderProduct item={item} key={key} />
                                <View style={{height:20}}></View>
                            </>
                    )})
                }

                </View>    
            </View>
                <View style={[adminPannelStyles.addProductSubmitView,{}]}>
                    <CustomButton text="Valider" color={appColors.white} backgroundColor={appColors.secondaryColor1} styles={adminPannelStyles} onPress={() => {setOrder()}} />
                </View>
        </ScrollView>
    )
}

export default AdminPanel