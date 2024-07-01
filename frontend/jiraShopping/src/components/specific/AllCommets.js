import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

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
    return(
        <View style={[allCommetsStyles.container,{}]} >
            <Comments all={true} />
        </View>
    )
}


export default AllCommets

const allCommetsStyles = StyleSheet.create({
    container :
    {

    },
})

