import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Animated, PanResponder, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import CarouselImage from '../common/CarouselImages';
import { PrevButton, ShareButton, LikeButton, CustomButton } from "../common/CommonSimpleComponents";
import Comments from './Comments';
import { productDetailsStyles } from '../../styles/productDetailsStyles';
import { appColors, customText } from '../../styles/commonStyles';
import { sinceDate, truncateText } from '../../utils/commonAppFonctions';
import { datas } from '../../utils/sampleDatas';
import BadgeIcon from '../common/BadgeIcon';
import ProductsList from '../common/ProductsList';
import SellerBrand from '../common/SellerBrand';
import { screenHeight, screenWidth } from '../../styles/commentsStyles';

const ProductDetails = (props) => {
    const { navigation } = props;
    const data = datas[0];
    data.color = "blue";
    const numChars = 10;
    const [description, setDescription] = useState(truncateText(data.text, numChars));

   
    const minHeight = 0;
    const maxHeight = screenHeight / 2;
    const halfHeight = maxHeight / 2;
    const initialHeight = maxHeight;

    
    const pan = useRef(new Animated.Value(initialHeight)).current;
    const [lastValidHeight, setLastValidHeight] = useState(initialHeight);
    const animatedHeight = pan.interpolate({
        inputRange: [minHeight, maxHeight],
        outputRange: [minHeight, maxHeight],
        extrapolate: 'clamp',
    });

  
    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (ev, gestureState) => 
            {
                setLastValidHeight(pan._value);

                Animated.event(
                [
                    null,
                    { dy: pan }
                ],
                { useNativeDriver: false }
        )},
        onPanResponderRelease: (evt, gestureState) => {
                let finalValue;

                if (gestureState.dy < 0) {
                    // Si le geste va vers le haut (vers le haut de l'écran)
                    finalValue = lastValidHeight + gestureState.dy;
                    if (finalValue < halfHeight) {
                        finalValue = initialHeight; // Revenir à la hauteur initiale si moins de la moitié
                    } else {
                        finalValue = minHeight; // Aller à la hauteur minimale sinon
                    }
                } else {
                    // Si le geste va vers le bas (vers le bas de l'écran)
                    finalValue = initialHeight; // Revenir à la hauteur initiale
                }

          Animated.spring(pan, {
            toValue: finalValue,
            useNativeDriver: false,
            friction: 7,
            tension: 50,
          }).start();
        }
      })
    ).current;



    

    return (
        <View style={productDetailsStyles.container}>
            <View contentContainerStyle={[productDetailsStyles.getBackPosition, {}]}>
                <View style={productDetailsStyles.buttonContainer}>
                    <PrevButton styles={productDetailsStyles.prevButton} />
                    <View style={productDetailsStyles.buttonContainerLeft}>
                        <ShareButton styles={productDetailsStyles.shareButton} />
                        <View style={{ width: 10 }}></View>
                        <LikeButton hasLiked={data.liked} item={data} styles={{ color: appColors.white }} isCard={false} />
                    </View>
                </View>

                <Animated.View style={[productDetailsStyles.carousselIamge, { height: animatedHeight }]}>
                    <CarouselImage styles={{ }} />
                </Animated.View>
        
<View style={[productDetailsStyles.underCaroussel]} {...panResponder.panHandlers} >
                <ScrollView style={[productDetailsStyles.scrollView,]} >
                    <View style={[productDetailsStyles.infosBox]}>
                    <View style={productDetailsStyles.since}>
                        <View style={{ flexDirection: "row" }}>
                            <BadgeIcon name="time-sharp" size={18} color={appColors.secondaryColor4} styles={{}} isCard={false} />
                            <View style={{ width: 5 }}></View>
                            <Text style={[customText.text, { color: appColors.secondaryColor4 }]}>Mis à jour il y'a {sinceDate(data.updatedAt).join(" ")}</Text>
                        </View>
                        <View>
                            <LikeButton hasLiked={data.liked} item={data} styles={{ color: appColors.black }} isCard={false} />
                            <Text style={[customText.text]}>23</Text>
                        </View>
                    </View>

                    <View style={[productDetailsStyles.name]}>
                        <Text numberOfLines={2} style={[customText.text, { fontWeight: "bold" }]}>{data.username}</Text>
                        <View style={{ flexDirection: "row", top: 5 }}>
                            <Text style={[customText.text]}>Telephone categories.map</Text>
                        </View>
                    </View>

                    <View style={[productDetailsStyles.details]}>
                        <View style={[{ flexDirection: "row" }]}>
                            <BadgeIcon name="checkmark-circle-sharp" size={18} color="black" styles={{}} isCard={false} />
                            <Text style={[customText.text, { paddingLeft: 5 }]}>Tecno</Text>
                        </View>
                        <View style={[{ flexDirection: "row" }]}>
                            <View style={{ transform: [{ rotate: "-90deg" }] }}>
                                <BadgeIcon name="pricetag-outline" size={18} color="black" styles={{}} isCard={false} />
                            </View>
                            <Text style={[customText.text, { paddingLeft: 5 }]}>Utilisé</Text>
                        </View>
                        {data.color ?
                            <View style={[{ flexDirection: "row" }]}>
                                <BadgeIcon name="ellipse-sharp" size={18} color="blue" styles={{}} isCard={false} />
                                <Text style={[customText.text]}>Bleu</Text>
                            </View>
                            : false
                        }
                    </View>
                    <View style={[productDetailsStyles.description]}>
                        <Text style={[customText.text, { fontWeight: "bold" }]}>Description</Text>
                        <View style={[productDetailsStyles.descriptionBox]}>
                            <Text style={[customText.text]}>{description[0]}</Text>
                            {description[1] == 0 && !description[2] ? true :
                                description[1] == 1 ?
                                    <Pressable onPress={() => { setDescription(truncateText(data.text, data.text.length, true)) }}>
                                        <Text style={[customText.text, { color: appColors.secondaryColor1 }]}>...Plus</Text>
                                    </Pressable>
                                    :
                                    <Pressable onPress={() => { setDescription(truncateText(data.text, numChars, true)) }}>
                                        <Text style={[customText.text, { color: appColors.secondaryColor1 }]}>...Moins</Text>
                                    </Pressable>
                            }
                        </View>
                    </View>
                   
                </View>
    
             

                <View style={[productDetailsStyles.commentsContainer]}>
                    <View style={[productDetailsStyles.sellerBrand]}>
                        <SellerBrand pub={true} onlineDate="2024-02-01T00:00:00Z"/>
                    </View>
                    <View style={{height:20}}></View>
                    <Comments navigation={navigation} />
                </View>

                <View style={[productDetailsStyles.similarContainer]}>
                    <View>
                        <Text style={[customText.text, { fontWeight: "bold", fontSize: 20, color: appColors.black ,paddingLeft:10,}]}>Produits Similaires</Text>
                    </View>
                    <View>
                        <ProductsList datas={datas} horizontal={true} styles={{}} />
                    </View>
                </View>
</ScrollView>
</View>

            </View>

            <View style={[productDetailsStyles.bottom]}>
                <View style={[productDetailsStyles.button, productDetailsStyles.price]}>
                    <Text numberOfLines={2} style={[customText.text, productDetailsStyles.buttonText, { color: appColors.secondaryColor1 }]}>{data.realPrice} XAF</Text>
                </View>
                <View style={[productDetailsStyles.panier]}>
                    <CustomButton text="Ajouter au panier" styles={{ pressable: productDetailsStyles.button, text: productDetailsStyles.buttonText }} color={appColors.secondaryColor1} backgroundColor={appColors.white} onPress={() => { }} />
                </View>
                <View style={[productDetailsStyles.acheter]}>
                    <CustomButton text="Acheter" styles={{ pressable: productDetailsStyles.button, text: productDetailsStyles.buttonText }} color={appColors.white} backgroundColor={appColors.secondaryColor1} onPress={() => { }} />
                </View>
            </View>
        </View>
    );
};

export default ProductDetails;
