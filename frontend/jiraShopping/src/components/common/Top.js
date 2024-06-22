import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BadgeIcon from './BadgeIcon';

const Top = (propos) => {
    return(
        <View>
            <TouchableOpacity>
                <TextInput placeholder="Recherher un produit" />
            </TouchableOpacity>

            <TouchableOpacity>
                <BadgeIcon name="notifications" size={24} color="black" badgeCount={5} />
            </TouchableOpacity>
        </View>
    )
}

export default Top