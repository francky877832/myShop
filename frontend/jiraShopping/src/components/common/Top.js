import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';

import BadgeIcon from './BadgeIcon';
import SearchBar from './SearchBar';

import { topStyles } from '../../styles/topStyles';
import { appColors, appFont } from '../../styles/commonStyles';

const Top = (props) => {

    return(
        <View style={[topStyles.container, ]} >
            <Pressable  style={[topStyles.pressableBar, ]} onPress={() => {}}>
                <SearchBar placeholder="Rechercher un produit" styles={topStyles} isPrev={false} />
            </Pressable>

            <Pressable  style={[topStyles.notification, ]}onPress = { ()=>{ console.log("Notifications")} }>
                <BadgeIcon name="notifications" size={24} color="black" badgeCount={5} />
            </Pressable>
        </View>
    )
}

export default Top