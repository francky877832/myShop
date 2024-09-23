import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BadgeIcon from './BadgeIcon';
import SearchBar from './SearchBar';
import badgeIconStyles from '../../styles/badgeIconStyles';

import { topStyles } from '../../styles/topStyles';
import { appColors, appFont } from '../../styles/commonStyles';
import { OrdersContext } from '../../context/OrdersContext';

const Top = (props) => {
    const navigation = useNavigation()
    const {searchText, replaceNavigation} = props
    const { unreadNotifications } = useContext(OrdersContext)

    const handleNavigation = () => {
        if(replaceNavigation)
        {
            navigation.replace("Search");
        }
        else
        {
            navigation.navigate("Search");
        }
    }
    return(
        <View style={[topStyles.container, ]} >
            <Pressable  style={[topStyles.pressableBar, ]} pointerEvents='box-only' onPress={() => { handleNavigation() }}>
                <SearchBar placeholder={ searchText ? `${searchText} | resultats` : "Rechercher un produit" } styles={topStyles} isPrev={false} />
            </Pressable>

            <Pressable  style={[topStyles.notification, ]} onPress = { ()=>{ navigation.navigate("Notifications");} }>
                <BadgeIcon name="notifications" size={24} color="black" badgeCount={unreadNotifications} styles={badgeIconStyles} />
            </Pressable>
        </View>
    )
}

export default Top