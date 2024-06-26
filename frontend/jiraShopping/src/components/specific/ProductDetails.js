import React, { useState, forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import CarouselImage from '../common/CarouselImages';
import {    PrevButton, ShareButton, LikeButton } from "../common/CommonSimpleComponents"
import Comments from './Comments';

import { productDetailsStyles } from '../../styles/productDetailsStyles';
import { appColors, appFont, customText } from '../../styles/commonStyles';

import { sinceDate, truncateText } from '../../utils/commonAppFonctions';

import { datas } from '../../utils/sampleDatas';
import BadgeIcon from '../common/BadgeIcon';

const ProductDetails = () =>
{
    const data = datas[0]
    const numChars = 10
    const [description, setDescription] = useState(truncateText(data.text, numChars))
    return(
        <SafeAreaView>
            <View style={productDetailsStyles.container}>

                <View style={productDetailsStyles.buttonContainer}>
                    <PrevButton styles={productDetailsStyles.prevButton}/>
                    <View style={productDetailsStyles.buttonContainerLeft}>
                        <ShareButton styles={productDetailsStyles.shareButton}/>
                        <View style={{width:10,}}></View>
                        <LikeButton styles={productDetailsStyles.likeButton} isCard={false} />
                    </View>
                </View>
                
                <CarouselImage styles={productDetailsStyles.carousselIamge} />

                <View style={[productDetailsStyles.underCaroussel]}>
                    <View style={productDetailsStyles.since}>
                        <View style={{ flexDirection:"row"}}>
                            <BadgeIcon name="time-sharp" size={18} color={appColors.secondaryColor4} styles={{}} isCard={false} />
                            <View style={{width:5,}}></View>
                            <Text style={[customText.text, {color : appColors.secondaryColor4}]}>Mis a jour il y'a {sinceDate(data.updatedAt).join(" ")}</Text>
                        </View>

                        <View style={{ }}>
                            <LikeButton styles={productDetailsStyles.likeButton} isCard={false} />
                            <Text style={[customText.text, ]}>23</Text>
                        </View>
                    </View>


                    <View style={[productDetailsStyles.name]}>
                        <Text numberOfLines={2} style={[customText.text, {fontWeight:"bold"}]}>{data.username}</Text>
                        <View style={{flexDirection:"row", top:5,}}>
                            <Text style={[customText.text, ]}>Telephone categories.map</Text>
                        </View>
                    </View>

                    <View style={[productDetailsStyles.details]}> 
                        <View style={[{flexDirection:"row",}]}> 
                            <BadgeIcon name="checkmark-circle-sharp" size={18} color="black" styles={{}} isCard={false} />
                            <Text style={[customText.text,{paddingLeft:5,} ]} >Tecno</Text>
                        </View>

                        <View style={[{flexDirection:"row",}]}>
                            <View style={{transform:[{rotate:"-90deg"}]}}>
                                <BadgeIcon name="pricetag-outline" size={18} color="black" styles={{}} isCard={false} />
                            </View>
                            <Text style={[customText.text, {paddingLeft:5}]}>Utilisé</Text>
                        </View>

                            { data.color ?
                                <View style={[{flexDirection:"row",}]}>
                                    <BadgeIcon name="ellipse-sharp" size={18} color="blue" styles={{}} isCard={false} />
                                    <Text style={[customText.text, ]}>Bleu</Text>
                                </View>
                                :
                                false
                            }                 
                    </View>
                    <View style={[productDetailsStyles.description]}>
                        <Text style={[customText.text, {fontWeight:"bold"} ]}>Description</Text>
                        <View style={[productDetailsStyles.descriptionBox]}>
                            <Text style={[customText.text, ]}>{description[0]}</Text>
                            {
                                description[1] == 0 && !description[2]
                                ?
                                    true
                                :
                                description[1] == 1
                                ?
                                    <Pressable onPress={()=>{ setDescription(truncateText(data.text, data.text.length, true))}}>
                                        <Text style={[customText.text, {color:appColors.secondaryColor1}]}>...Plus</Text>
                                    </Pressable>
                                :          
                                
                                    <Pressable onPress={()=>{ setDescription(truncateText(data.text, numChars, true)) }}>
                                        <Text style={[customText.text, {color:appColors.secondaryColor1}]}>...Moins</Text>
                                    </Pressable>
                            }
                        </View>
                    </View>
                </View>

                <View style={[productDetailsStyles.commentsContainer]}>
                    <Comments />
                    <Text>Ok</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetails