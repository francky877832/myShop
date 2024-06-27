import React, { useState, forwardRef } from 'react';
import { View, Text, Pressable, FlatList, ScrollView, } from 'react-native';
import { Input } from 'react-native-elements';

import { appColors, appFont, customText } from '../../styles/commonStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { reshapeComments } from '../../utils/commonAppFonctions';
import { Icon } from 'react-native-elements';

import { datas } from '../../utils/sampleDatas';

const Comments = () =>
{
    const comments = [...datas]
    const reshapedComments = reshapeComments(comments)
    console.log(reshapedComments)

    const [isFocused, setIsFocused] = useState(false)

    const Comment = (props) => {
        const { comment, styles } = props
            return (
                    <View style={[styles.commentContainer, ]} >
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Pressable style={[styles.comment, ]} onPress={()=>{console.log(comment.id_)}}>
                                <Text style={[commentsStyles.commentText]} >{comment.text}</Text>
                            </Pressable>
                            <Pressable onPress={()=>{console.log(comment.id_)}}>
                                <Icon name='arrow-back' type='ionicon' />
                            </Pressable>
                        </View>
                    
                    {
                        comment.subComment && comment.subComment.length > 0
                        ?
                        comment.subComment.map((item)=>{
                            return (
                                <View style={{flexDirection:"row-reverse",alignItems:"center"}} key={item.id_.toString()}>
                                    <Pressable onPress={()=>{console.log(comment.id_)}} style={[styles.comment, styles.subComment]} >
                                        <Text style={[commentsStyles.commentText]} >{item.text}</Text>
                                    </Pressable>

                                    <Pressable onPress={()=>{console.log(comment.id_)}}>
                                        <Icon name='arrow-back' type='ionicon' />
                                    </Pressable>
                            </View>
                            )
                        })
                        :
                        false
                    }
                </View>
                );
            
    }


    return(
        <View style={{}}>
                <FlatList
                    data={reshapedComments}
                    renderItem={ ({item}) => { return <Comment comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} /> } }
                    keyExtractor={ (item) => { return item.id_.toString(); } }
                    horizontal={false}
                    numColumns={ 1 }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[commentsStyles.flatlistContainer]}
                />
            <View style={commentsStyles.inputContainer}>
               <Input placeholder="Posez une question sur le produit" onChangeText={(text)=>{}}
                    placeholderTextColor={appColors.lightBlack}
                    style = {[commentsStyles.input, isFocused && commentsStyles.inputFocused, commentsStyles.searchBarInput]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    underlineColorAndroid='transparent'
                    inputContainerStyle={ { borderBottomWidth: 1 }}
                    rightIcon={ 
                        <Pressable onPress={() => {console.log("Go")}}>
                            <Icon name='arrow-back' type='ionicon' />
                        </Pressable>
                    }
                />
            </View>
        </View>
    )
}

export default Comments