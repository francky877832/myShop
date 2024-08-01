import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BadgeIcon from './BadgeIcon';
import SearchBar from './SearchBar';
import badgeIconStyles from '../../styles/badgeIconStyles';

import { topStyles } from '../../styles/topStyles';
import { appColors, appFont } from '../../styles/commonStyles';

const Top = (props) => {
    const navigation = useNavigation()
    const {searchText} = props
    return(
        <View style={[topStyles.container, ]} >
            <Pressable  style={[topStyles.pressableBar, ]} pointerEvents='box-only' onPress={() => {navigation.navigate("Search");}}>
                <SearchBar placeholder={ searchText ? `${searchText} | resultats` : "Rechercher un produit" } styles={topStyles} isPrev={false} />
            </Pressable>

            <Pressable  style={[topStyles.notification, ]} onPress = { ()=>{ navigation.navigate("Notifications");} }>
                <BadgeIcon name="notifications" size={24} color="black" badgeCount={5} styles={badgeIconStyles} />
            </Pressable>
        </View>
    )
}

export default Top