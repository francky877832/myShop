
import React, { useState, forwardRef, useRef, useEffect, useCallback, useMemo, useContext } from 'react';
import { View, Text, Pressable, FlatList, ScrollView, TextInput, Alert} from 'react-native';
import { Input } from 'react-native-elements';
import {CustomActivityIndicator} from '../common/CommonSimpleComponents'

import { appColors, appFont, customText } from '../../styles/commonStyles';
import { commentsStyles } from '../../styles/commentsStyles';
import { reshapeComments, convertWordsToNumbers, containsEmail } from '../../utils/commonAppFonctions';
import { Icon } from 'react-native-elements';
import { sinceDate, countDatas} from '../../utils/commonAppFonctions';

import { datas } from '../../utils/sampleDatas';

import { server } from '../../remote/server';

import { CommentsContext } from '../../context/CommentsContext';
import { ActivityIndicator } from 'react-native-paper';

const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
const Comments = (props) =>
{
    const { all, navigation, product, setters, setIsLoading, pass, flatListRef, inputRef, reshapedComments} = props
    const {inputValue, setInputValue, setIsResponseTo} = setters 
    //console.log(reshapedComments)
    
    const { /*reshapedComments,*/ loadMoreComments, isLoading, searchAgain, hasMore, page, totalComments, } = useContext(CommentsContext)
    
    const loadMore = async () => {
        //await searchAgain();
        await loadMoreComments(product._id)
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: Number.MAX_SAFE_INTEGER, animated: true });
        }
    }
//console.log(comments)
    //console.log("allComments")
    //console.log(allComments)
    //Requete parametres avec le nombre  de comments a afficher
    //modifier comments avec un champ subComment au lieur de isResponseTo length
    //const [inputValue, setInputValue] = useState("")
//    const [isFocused, setIsFocused] = useState(false)
//    const [isAll, setIsAll] = useState(all)
   
        //console.log(reshapedComments)




useEffect(()=>{
    //page est a 1 par defaut mais passons page quand meme bien quon sait quil est a un

    // quand on vient a partir des notifs
    if(pass)
        navigation.navigate("AllComments",{reshapedComments:reshapedComments,product:product,inputFocused:false, page:page})
})

//console.log(comments?.slice(0,2))



    const Comment = (props) => {
        const { comment, styles, all, } = props
        const [_, forceUpdate] = useState();
        const showSubComment = useRef(true)
//console.log(showSubComment!=false ? showSubComment : false)
        const setShowSubComment = (val) => {
            showSubComment.current = val;
            forceUpdate({}); // Forcer un re-render
          };

//console.log(comment)
const respondTo = (id, username) => {
    console.log(id)
    setIsResponseTo(id);
    setInputValue("@"+username+" " +inputValue);
    if (inputRef.current) {inputRef.current.focus() }
}
        return (
                    <View style={[styles.commentContainer,]} >
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Pressable style={[styles.comment, ]} onPress={()=>{ }}>
                                <Text style={[commentsStyles.commentText]} >{comment.text}</Text>
                            </Pressable>
                            { !!comment._id &&
                                <Pressable  onPress={()=>{respondTo(comment._id, comment.username)}}>
                                    <Icon name="arrow-undo-sharp" type='ionicon' size={18} color={appColors.black} />
                                </Pressable>
                            }
                        </View>

                        <View style={[{alignItems:"center"}]}><Text style={[customText.text, {fontSize:10,fontStyle:"italic",color:appColors.secondaryColor4}]}>{isNaN(sinceDate(comment.createdAt)[0]) || (sinceDate(comment.createdAt)[0]==0 && 
                                                                                                                                                                                                    (sinceDate(comment.createdAt)[1]=="secondes" || sinceDate(comment.createdAt)[1]=="ans"))
                                                                                                                                                                      ? "A l'instant" :"Ecrit il y'a " + sinceDate(comment.createdAt)[0] +" "+sinceDate(comment.createdAt)[1]  }</Text></View>
                        {
                            Object.keys(comment).includes("subComment") && comment.subComment?.length > 0 && all
                            ?
                                    <Pressable onPress={()=>{setShowSubComment(!showSubComment.current)}} style={{alignSelf:"flex-end",}}>
                                        { showSubComment.current ?
                                            <Text style={[customText.text, {textDecorationLine:"underline",fontWeight:"bold"}]}>Masquer les reponses</Text>
                                            :
                                            <Text style={[customText.text, {textDecorationLine:"underline",fontWeight:"bold",}]}>Afficher les reponses</Text>
                                        }
                                    </Pressable>
                            :
                            false
                        }
                    
                    {
                        showSubComment.current &&
                            (Object.keys(comment).includes("subComment") && comment?.subComment?.length > 0
                                ?
                                comment?.subComment.map((item, key)=>{
                                    return (
                                        <View style={[{flex:0}]}  key={key}>
                                            <View style={{flexDirection:"row-reverse",alignItems:"center"}}>
                                                <Pressable onPress={()=>{console.log(comment._id)}} style={[styles.comment, styles.subComment]} >
                                                    <Text style={[commentsStyles.commentText]} >{item.text}</Text>
                                                </Pressable>

                                                {
                                                /*
                                                    <Pressable onPress={()=>{setIsResponseTo(comment._id);setInputValue("@"+comment.username+" " +inputValue)}}>
                                                        <Icon name="arrow-undo-sharp" type='ionicon' size={18} color={appColors.black} />
                                                    </Pressable>
                                                */
                                                }
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
    const renderItem = useCallback(({item}) => { return <Comment all={all} comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} /> })
    const memoizedData = useMemo(() => reshapedComments, [reshapedComments]);
    const memoizedRenderItem = useMemo(() => renderItem, [renderItem]);

    return(
        <View style={[commentsStyles.container,{}]}>
           { !all &&  
            <View style={[{flexDirection:"column",justifyContent:"center"}]}>
               
                    <Pressable>
                        <Text style={[customText.text, {fontWeight:"bold",fontSize:20,color:appColors.black}]}>Une Questions ?</Text>
                    </Pressable>
        
                    <Pressable onPress={()=>{navigation.navigate("AllComments",{comments:reshapedComments,product:product})}} style={[{alignSelf:"flex-end",flexDirection:"row",}]}>
                            <Text style={[customText.text,{color:appColors.green,}]}>Tout Afficher</Text>
                            <Text style={[customText.text,{color:appColors.black,}]}>({reshapedComments.length})</Text>
                    </Pressable>
            </View>
        }
            <View style={[commentsStyles.flatlistContainerView]}>
                {all ?
                    <FlatList
                        data={memoizedData}
                        nestedScrollEnabled={true}
                        renderItem={ memoizedRenderItem }
                        keyExtractor={ (item) => { return item._id?item._id.toString():item.id.toString(); } }
                        horizontal={false}
                        numColumns={ 1 }
                        ref={flatListRef}
                        ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={[commentsStyles.flatlistContainer, !all?commentsStyles.flatlistContainerNotAll:false]}
                    />

                :
                    (reshapedComments?.slice(0,2))?.map((item, key)=>{
                    return(
                        <View style={{}} key={key}>
                            <Comment all={all} comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} />
                            <View style={{width:5,}}></View>
                        </View>
                    )
                    })
            

                /*(all ? reshapedComments : reshapedComments?.slice(0,2))?.map((item, key)=>{
                    //console.log("   ITEM")
                    //console.log(item)
                    return(
                        <View style={{}} key={key}>
                            <Comment all={all} comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} />
                            <View style={{width:5,}}></View>
                        </View>
                    )
                    })
                    /*<Pressable onPress={()=>{loadMoreComments(product)}}>
                    <Text>Charger plus...</Text>
                </Pressable>*/
            }
            
            {
            /*
            all ?
                !isLoading ?
                    hasMore ?
                            <Pressable onPress={()=>{loadMore()}} style={[{top:20,alignItems:"center",}]}>
                                <Text style={[customText.text, {color:appColors.secondaryColor1,textDecorationLine:"underline",fontSize:16,fontWeight:"bold"}]}>Charger plus...</Text>
                            </Pressable>
                        :
                        null
                :
                    <ActivityIndicator color={appColors.secondaryColor1} size="small" />
            : null
            */
            }

            </View>
        { !all &&  
            <View style={[commentsStyles.inputContainer,]}>
                <Pressable onPress={()=>{navigation.navigate("AllComments",{reshapedComments:reshapedComments,product:product,inputFocused:true})}} style={[{alignSelf:"flex-end",flexDirection:"row",}]}>
                    <Input placeholder="Posez une question" onChangeText={(text)=>{(text)}}
                        multiline={true}
                        numberOfLines={1}
                        placeholderTextColor={appColors.lightWhite}
                        inputStyle = {[commentsStyles.searchBarInput, commentsStyles.input,]}
                        underlineColorAndroid='transparent'
                        inputContainerStyle={ { }}
                        rightIcon={ 
                            <Pressable onPress={() =>{}} style={[commentsStyles.sendButton, {}]}>
                                <Icon name='send-sharp' type='ionicon' size={40} color={appColors.secondaryColor1} />
                            </Pressable>
                        }
                        readOnly={true}
                    />
                </Pressable>
            </View>
        }
                    
        </View>
    )
}

export default React.memo(Comments)