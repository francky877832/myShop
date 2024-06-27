import React, { useState, forwardRef, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


import CarouselImage from '../common/CarouselImages';
import {    PrevButton, ShareButton, LikeButton, CustomButton } from "../common/CommonSimpleComponents"
import Comments from './Comments';

import { productDetailsStyles } from '../../styles/productDetailsStyles';
import { appColors, appFont, customText } from '../../styles/commonStyles';

import { sinceDate, truncateText } from '../../utils/commonAppFonctions';

import { datas } from '../../utils/sampleDatas';
import BadgeIcon from '../common/BadgeIcon';

import ProductsList from '../common/ProductsList';

import { screenHeight, screenWidth } from '../../styles/commentsStyles';

const ProductDetails = () =>
{
    const data = datas[0]
    const numChars = 10
    const [description, setDescription] = useState(truncateText(data.text, numChars))
    return(
        <View style={productDetailsStyles.container}>
            <ScrollView contentContainerStyle={[{bottom:20,}]}>
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
                </View>

                <View style={[productDetailsStyles.similarContainer]}>
                    <View style={{}}>
                        <Text style={[customText.text, {fontWeight:"bold",fontSize:20,color:appColors.black}]}>Produits Similaires</Text>
                    </View>
                    <View style={{}}>
                        <ProductsList datas={datas} horizontal={true} />
                    </View>
                </View>

            </ScrollView>

                <View style={[productDetailsStyles.bottom]}>
                    <View style={[productDetailsStyles.price, productDetailsStyles.button]}>
                        <Text style={[customText.text, productDetailsStyles.buttonText, {color:appColors.secondaryColor1}]}>{data.realPrice} XAF</Text>
                    </View>

                    <View style={[productDetailsStyles.acheter]}>
                        <CustomButton text="Acheter" styles={{pressable : productDetailsStyles.button, text:productDetailsStyles.buttonText}} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={()=>{}} />
                    </View>

                    <View style={[productDetailsStyles.panier]}>
                        <CustomButton text="Ajouter au panier" styles={{pressable : productDetailsStyles.button, text:productDetailsStyles.buttonText}} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={()=>{}}/>
                    </View>
                </View>


        </View>
    )
}

export default ProductDetails