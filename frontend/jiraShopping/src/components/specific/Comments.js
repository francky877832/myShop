
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

import { ProductItemContext } from '../../context/ProductItemContext';

const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
const Comments = (props) =>
{
    const { all, navigation, product, setters, isLoading, setIsLoading} = props
    const {inputValue,setInputValue, setIsResponseTo} = setters 
    
    const { comments, } = useContext(ProductItemContext)

    //console.log("allComments")
    //console.log(allComments)
    //Requete parametres avec le nombre  de comments a afficher
    //modifier comments avec un champ subComment au lieur de isResponseTo length
    //const [inputValue, setInputValue] = useState("")
//    const [isFocused, setIsFocused] = useState(false)
//    const [isAll, setIsAll] = useState(all)
   
        //console.log(reshapedComments)




/*
useEffect(()=>{
    onNewComment ? setIsLoading(true) : setIsLoading(false)
})*/


    const Comment = (props) => {
        const { comment, styles, all, } = props
        const [_, forceUpdate] = useState();
        const showSubComment = useRef(true)
//console.log(showSubComment!=false ? showSubComment : false)
        const setShowSubComment = (val) => {
            showSubComment.current = val;
            forceUpdate({}); // Forcer un re-render
          };


        return (
                    <View style={[styles.commentContainer,]} >
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Pressable style={[styles.comment, ]} onPress={()=>{console.log(comment._id)}}>
                                <Text style={[commentsStyles.commentText]} >{comment.text}</Text>
                            </Pressable>
                            <Pressable  onPress={()=>{setIsResponseTo(comment._id);setInputValue("@"+comment.username+" " +inputValue);}}>
                                <Icon name="arrow-undo-sharp" type='ionicon' size={18} color={appColors.black} />
                            </Pressable>
                        </View>

                        <View style={[{alignItems:"center"}]}><Text style={[customText.text, {fontSize:10,fontStyle:"italic",color:appColors.secondaryColor4}]}>{isNaN(sinceDate(comment.createdAt)[0]) || (sinceDate(comment.createdAt)[0]==0 && 
                                                                                                                                                                                                    (sinceDate(comment.createdAt)[1]=="secondes" || sinceDate(comment.createdAt)[1]=="ans"))
                                                                                                                                                                      ? "A l'instant" :"Ecrit il y'a " + sinceDate(comment.createdAt)[0] +" "+sinceDate(comment.createdAt)[1]  }</Text></View>
                        {
                            comment?.subComment && comment.subComment?.length > 0 && all
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
                            (comment.subComment && comment.subComment.length > 0
                                ?
                                comment.subComment.map((item)=>{
                                    return (
                                        <View style={[{flex:0}]}  key={item._id.toString()}>
                                            <View style={{flexDirection:"row-reverse",alignItems:"center"}}>
                                                <Pressable onPress={()=>{console.log(comment._id)}} style={[styles.comment, styles.subComment]} >
                                                    <Text style={[commentsStyles.commentText]} >{item.text}</Text>
                                                </Pressable>

                                                <Pressable onPress={()=>{setIsResponseTo(comment._id);setInputValue("@"+comment.username+" " +inputValue)}}>
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
        
                    <Pressable onPress={()=>{navigation.navigate("AllComments",{comments:comments,product:product})}} style={[{alignSelf:"flex-end",flexDirection:"row",}]}>
                            <Text style={[customText.text,{color:appColors.green,}]}>Tout Afficher</Text>
                            <Text style={[customText.text,{color:appColors.black,}]}>({comments.length})</Text>
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

                (all ? comments : comments?.slice(0,2))?.map((item)=>{
                    //console.log("   ITEM")
                    //console.log(item)
                    return(
                        <View style={{}} key={item?._id}>
                            <Comment all={all} comment={item} styles={ {comment : {...commentsStyles.comment}, subComment : {...commentsStyles.subComment}}} />
                            <View style={{width:5,}}></View>
                        </View>
                    )
                    })
                
            }
            </View>
        { !all &&  
            <View style={[commentsStyles.inputContainer,]}>
                <Pressable onPress={()=>{navigation.navigate("AllComments",{comments:comments,product:product,inputFocused:true})}} style={[{alignSelf:"flex-end",flexDirection:"row",}]}>
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

export default Comments