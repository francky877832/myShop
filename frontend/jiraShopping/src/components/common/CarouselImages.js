import React, { useState, forwardRef, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


import { caourselImageStyles } from '../../styles/carouselImageStyles';
import { productStyles } from '../../styles/productStyles';
import { datas } from '../../utils/sampleDatas';


const { width: screenWidth } = Dimensions.get('window');

const CarouselImage = (props) =>
{
  const {styles, images} = props
    const carouselRef = useRef(null);
    const [index, setIndex] = useState(0); //length
    const image = "../../assets/images/product5.png"

  //console.log(images)
  const renderItem = ({ item, index }) => (
    <View style={[caourselImageStyles.itemContainer, productStyles.card, {borderRadius:0}]} key={index}>
      <Image source={{uri: item}} style={caourselImageStyles.image} />
    </View> 
  )


  return (
    <View style={[caourselImageStyles.container,styles]}>
      <Carousel loop={true} width={screenWidth} height={screenWidth*1.2} autoPlay={true} data={images} scrollAnimationDuration={1000} renderItem={renderItem}/>
    </View>
  );

}


export default CarouselImage