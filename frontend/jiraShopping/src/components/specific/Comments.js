import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, Pressable, FlatList, ScrollView, TextInput } from 'react-native';
import { Input } from 'react-native-elements';

import { appColors, appFont, customText } from '../../styles/commonStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { reshapeComments } from '../../utils/commonAppFonctions';
import { Icon } from 'react-native-elements';
import { sinceDate, countDatas} from '../../utils/commonAppFonctions';

import { datas } from '../../utils/sampleDatas';

const Comments = (props) =>
{
    const { all, navigation} = props 
    //Requete parametres avec le nombre  de comments a afficher
    //modifier comments avec un champ subComment au lieur de isResponseTo length
    const [inputValue, setInputValue] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isAll, setIsAll] = useState(all)
  
        const initialNumberOfComments = 2
        let data = [...datas] ; data = !all ? data.slice(0, initialNumberOfComments+1) : datas
        const comments = {comments : [...data], count:2, total : 3} //format de retourn cote server Express
        let  reshapedComments = reshapeComments(comments.comments)

        console.log(reshapedComments)

    const Comment = (props) => {
        const { comment, styles, all } = props

        const [showSubComment, setShowSubComment] = useState(false)

        return (
                    <View style={[styles.commentContainer,]} >
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Pressable style={[styles.comment, ]} onPress={()=>{console.log(comment.id_)}}>
                                <Text style={[commentsStyles.commentText]} >{comment.text}</Text>
                            </Pressable>
                            <Pressable  onPress={()=>{setInputValue("@"+comment.id_+" " +inputValue)}}>
                                <Icon name="arrow-undo-sharp" type='ionicon' size={18} color={appColors.black} />
                            </Pressable>
                        </View>

                        <View style={[{alignItems:"center"}]}><Text style={[customText.text, {fontSize:10,fontStyle:"italic",color:appColors.secondaryColor4}]}>Ecrit il y'a {sinceDate(comment.createdAt)[0] +" "+sinceDate(comment.createdAt)[1]  }</Text></View>
                        {
                            comment.subComment && comment.subComment.length > 0 && all
                            ?
                                    <Pressable onPress={()=>{setShowSubComment(!showSubComment)}} style={{alignSelf:"flex-end",}}>
                                        { showSubComment ?
                                            <Text style={[customText.text, {textDecorationLine:"underline",fontWeight:"bold"}]}>Masquer les reponses</Text>
                                            :
                                            <Text style={[customText.text, {textDecorationLine:"underline",fontWeight:"bold",}]}>Afficher les reponses</Text>
                                        }
                                    </Pressable>
                            :
                            false
                        }
                    
                    {
                        showSubComment &&
                            (comment.subComment && comment.subComment.length > 0
                                ?
                                comment.subComment.map((item)=>{
                                    return (
                                        <View style={[{flex:0}]}  key={item.id_.toString()}>
                                            <View style={{flexDirection:"row-reverse",alignItems:"center"}}>
                                                <Pressable onPress={()=>{console.log(comment.id_)}} style={[styles.comment, styles.subComment]} >
                                                    <Text style={[commentsStyles.commentText]} >{item.text}</Text>
                                                </Pressable>

                                                <Pressable onPress={()=>{setInputValue("@"+comment.id_+" " +inputValue)}}>
                                                    <Icon name="arrow-undo-sharp" type='ionicon' size={18} color={appColors.black} />
                                                </Pressable>
                                            </View>

                                            <View style={[{alignItems:"center"}]}><Text style={[customText.text, {fontSize:10,fontStyle:"italic",color:appColors.secondaryColor4}]}>Ecrit il y'a {sinceDate(comment.createdAt)[0] +" "+sinceDate(comment.createdAt)[1]  }</Text></View>

                                        </View>
        
                                    )
                                })
                                :
                                false
                        )
                    }
                </View>
                );
            
    }


    return(
        <View style={[commentsStyles.container,{}]}>
           { !all &&  
            <View style={[{flexDirection:"column",justifyContent:"center"}]}>
               
                    <Pressable>
                        <Text style={[customText.text, {fontWeight:"bold",fontSize:20,color:appColors.black}]}>Une Questions ?</Text>
                    </Pressable>
        
                    <Pressable onPress={()=>{navigation.navigate("AllComments")}} style={[{alignSelf:"flex-end",flexDirection:"row",}]}>
                            <Text style={[customText.text,{color:appColors.green,}]}>Tout Afficher</Text>
                            <Text style={[customText.text,{color:appColors.black,}]}>({countDatas(datas)})</Text>
                    </Pressable>
            </View>
        }
            <View style={[commentsStyles.flatlistContainerView]}>
                {/*<FlatList
                    data={reshapedComments}
                    nestedScrollEnabled={true}
                    renderItem={ ({item}) => { return <Comment all={all} comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} /> } }
                    keyExtractor={ (item) => { return item.id_.toString(); } }
                    horizontal={false}
                    numColumns={ 1 }
                    ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[commentsStyles.flatlistContainer, !all?commentsStyles.flatlistContainerNotAll:false]}
                />*/
                reshapedComments.map((item)=>{
                    return(
                        <View style={{}} key={item.id_}>
                            <Comment all={all} comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} />
                            <View style={{width:5,}}></View>
                        </View>
                    )
                    })
                }
            </View>
        { !all &&  
            <View style={[commentsStyles.inputContainer, {borderWidth:isFocused?0:1,}]}>
               <Input placeholder="Posez une question" onChangeText={(text)=>{setInputValue(text)}}
                    multiline={true}
                    numberOfLines={1}
                    placeholderTextColor={appColors.lightWhite}
                    inputStyle = {[commentsStyles.searchBarInput, commentsStyles.input, isFocused && commentsStyles.inputFocused,]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    underlineColorAndroid='transparent'
                    inputContainerStyle={ { borderBottomWidth:isFocused?0:1, }}
                    rightIcon={ 
                        <Pressable onPress={() => {console.log("Go")}} style={[commentsStyles.sendButton]}>
                            <Icon name='send-sharp' type='ionicon' size={24} color={appColors.secondaryColor1} />
                        </Pressable>
                    }
                    value={inputValue}
                />
            </View>
        }
        </View>
    )
}

export default Comments