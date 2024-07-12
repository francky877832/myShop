import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { Input } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';



import Comments from './Comments';

const AllCommets = (props) =>
{
    const { navigation } = props
    const route = useRoute()
    return(
        <ScrollView style={[allCommetsStyles.container,{}]} >
            <Comments all={true} allComments={route.params.comments} product={route.params.product}/>
        </ScrollView>
    )
}


export default AllCommets

const allCommetsStyles = StyleSheet.create({
    container :
    {

    },
})

