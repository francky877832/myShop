import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { ordersStyle } from '../../styles/ordersStyles';
//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';


import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';


import RenderNotificationItem from '../common/RenderNotificationItem';





const Orders = (props) => {
    const { user } = useContext(UserContext)
    //const user = {_id : "668fdfc6077f2a5c361dd7fc",}
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation()
    const route = useRoute()
    const {order } = route.params


    return (
        <View style={[ordersStyle.container]}>
            <Text>Ok</Text>
        </View>
    );
} 


export default Orders