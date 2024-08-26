import React, { useState, useEffect, createContext, useContext, useRef, useCallback  } from 'react';
import { View, Text, StyleSheet,  Dimensions, FlatList, Pressable, Alert } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';
//custom component


//custom styles
import { notificationsStyles } from '../../styles/notificationsStyles';

//custom app datas
import { datas } from '../../utils/sampleDatas';
import { appColors, customText } from '../../styles/commonStyles';

//
import { sendNotificaitons, getNotifications, updateNotificationsRead, getProductFromNotifications ,
          getOffers,
        } from '../../utils/commonAppNetworkFunctions'

import { sinceDate } from '../../utils/commonAppFonctions'

import { UserContext } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const RenderNotificationItem = (props) =>{
    const {item, openNotif, user, from} = props
    const [date, setDate] = useState(sinceDate(item.updatedAt).join(' '))
    const timeoutRef = useRef(null);
    const [read, setRead] = useState(item.read)



    useEffect(()=>{
    if(['seconde','secondes', 'minute', 'minutes'].includes(sinceDate(item.updatedAt)[1]))
    { 
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setInterval(() => {
            setDate(sinceDate(item.updatedAt).join(' '))
        }, 60000);
    }
    },[])

    const handleOpenNotif = () => {
        if(item.action!='none')
        {
            openNotif(user, item)
        }
        
        setRead(1)
    }

    const getIcon = (from) => {
        switch(from)
        {
            case "AllNotificiaitons" :
                return (<Icon type='material-icon' name='ring-volume' size={30} color={appColors.secondaryColor1} />)
                break
            default : return (<Icon type='material-icon' name='ring-volume' size={30} color={appColors.secondaryColor1} />)

        }
    }

        return(
            <View style={[notificationsStyles.item,]}>
                <Pressable onPress={()=>{handleOpenNotif()}} style={[notificationsStyles.pressable,  read ? notificationsStyles.itemRead : false,{}]}>
                    <View style={[notificationsStyles.icon,{}]}>
                        {getIcon(from)}
                    </View>
                    
                    <View style={[notificationsStyles.content,{}]}>
                        <View style={[notificationsStyles.title,{}]}>
                            <Text style={[customText.text, notificationsStyles.titleText, ]}>{item.title}</Text>
                        </View>

                        <View style={[notificationsStyles.message,{flexDirection:'row'}]}>
                            <View style={{width:1}}></View>
                            <Text style={[customText.text, notificationsStyles.messageText, {}]}>{item.message}</Text>
                        </View>
                    </View>
                </Pressable>

                    <View style={[notificationsStyles.sinceDate, {}]}>
                        <Text style={[customText.text, notificationsStyles.textDate, {}]}>il y'a {date}</Text>
                    </View>
            </View>
        )
}

export default RenderNotificationItem