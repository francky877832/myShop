import React, { useState, forwardRef } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';


import { appColors, appFont } from '../../styles/commonStyles';
import { commentStyles } from '../../styles/commentsStyles';
import { reshapeComments } from '../../utils/commonAppFonctions';

import { datas } from '../../utils/sampleDatas';

const Comments = () =>
{
    const comments = [...datas]
    const reshapedComments = reshapeComments(comments)
    console.log(reshapedComments)

    const Comment = (props) => {
        const { comment } = props
        return (
            <Pressable>
                <Text>{comment.text}</Text>
            </Pressable>
        )
    }


    return(
        <View style={[commentStyles.container]}>
            <View>
                <FlatList
                    data={datas}
                    renderItem={ ({item}) => { return <Comment comment={item} style={commentStyles.listItem} /> } }
                    keyExtractor={ (item) => { return item.id_.toString(); } }
                    horizontal={false}
                    numColumns={ 1 }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={commentStyles.flatlist}
                />
            </View>
        </View>
    )
}

export default Comments