import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';


import Top from '../common/Top';


const Preferences = (propos) => {
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Top/>
                <FlatList>
                    <View>
                        <Text>Ok</Text>
                    </View>
                </FlatList>
            </View>
        </SafeAreaView>
    )
}

export default  Preferences