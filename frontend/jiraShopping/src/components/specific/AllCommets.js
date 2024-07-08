import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native';
import { Input } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';


import { appColors, appFont, customText } from '../../styles/commonStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { reshapeComments } from '../../utils/commonAppFonctions';
import { Icon } from 'react-native-elements';
import { sinceDate, countDatas} from '../../utils/commonAppFonctions';

import { datas } from '../../utils/sampleDatas';

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

