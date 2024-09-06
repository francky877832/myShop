import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import Carousel from 'react-native-reanimated-carousel';


import { caourselImageStyles } from '../../styles/carouselImageStyles';
import { productStyles } from '../../styles/productStyles';
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';
import { pluralize } from '../../utils/commonAppFonctions';
import { formatMoney, sinceDate, truncateText } from '../../utils/commonAppFonctions';

const { width: screenWidth } = Dimensions.get('window');


import { LeftToRightViewBox } from './AnimatedComponents';

const CarouselImage = (props) =>
{
  const {styles, product, images} = props
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showViews, setShowViews] = useState(true)
    const [showInBasket, setShowInBasket] = useState(false)
    //const image = "../../assets/images/product5.png"
    const intervalRef = useRef(null);

    const handleImagePress = (image) => {
      setSelectedImage(image);
      setModalVisible(true);
    };
  //console.log(images)
  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => handleImagePress(item)} style={[caourselImageStyles.itemContainer, productStyles.card, {borderRadius:0}]} key={index}>
      <Image source={{uri: item}} style={caourselImageStyles.image} />
    </Pressable> 
  )

useEffect(()=>{
  intervalRef.current = setInterval(() => {
    setShowInBasket(prev => !prev);
    setShowViews(prev => !prev);
    //console.log('ok')
  }, 5000);
  return () => {
    clearInterval(intervalRef.current);
  };
}, [])


useEffect(() => {

}, [showViews, showInBasket]);
  return (
    <View style={[caourselImageStyles.container,styles]}>
      <Carousel loop={true} width={screenWidth} height={screenWidth*1.2} 
        onSnapToItem={(index) => setCurrentIndex(index)}
        autoPlay={true} data={images} scrollAnimationDuration={1000} 
        renderItem={renderItem}
        
        />
        <View style={[paginationStyles.paginationBox]}>
          <Text style={paginationStyles.paginationText}>
            {currentIndex + 1}/{images.length}
          </Text>
        </View>

        {
          (showViews && product.views>=0) &&
            <LeftToRightViewBox show={showViews} duration={1000} styles={paginationStyles.viewsBox}>
              <Text style={paginationStyles.viewsText}>
                {formatMoney(product.views)} {pluralize(product.views, 'vue')}
              </Text>
            </LeftToRightViewBox>
        }

       {
        (showInBasket && product.inBasket>=0) &&
          <LeftToRightViewBox show={showInBasket} duration={1000} styles={paginationStyles.viewsBox}>
              <Text style={paginationStyles.viewsText}>
                  Ce produit est deja dans le panier de {formatMoney(product.inBasket)} {pluralize(product.inBasket, 'personne')}!
              </Text>
          </LeftToRightViewBox>
        }


        <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={paginationStyles.modalContainer}>
          <Image source={{ uri: selectedImage }} style={paginationStyles.fullImage} />
          <Pressable
            style={paginationStyles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={paginationStyles.closeButtonText}>Fermer</Text>
          </Pressable>
        </View>
      </Modal>

    </View>
  );
}

const paginationStyles = StyleSheet.create({
  paginationBox :
  {
    width:50,
    borderRadius : 225,
    alignItems:"center", 
    backgroundColor : appColors.clearBlack,
    top: 20,
    alignSelf : "flex-end",
    right : 20
  },
  paginationText: 
  {
    fontSize: 18,
    color: appColors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: appColors.clearBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '70%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: appColors.red,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: appColors.white,
  },

  viewsBox :
  {
    alignSelf : "flex-start",
    alignItems : 'flex-start',
    backgroundColor : appColors.white,
    left : 5,
    top : 20,
    paddingHorizontal : 10,
    borderWidth : 2,
    borderColor : appColors.yellow,
    borderRadius : 10,
  },
  inBasketBox :
  {
    alignSelf : "flex-start",
    alignItems : 'flex-start',
    backgroundColor : appColors.white,
    left : 5,
    top : 20,
    paddingHorizontal : 10,
    borderWidth : 2,
    borderColor : appColors.yellow,
    borderRadius : 10,
  },
  viewsText :
  {
    fontSize: 11,
    color: appColors.clearBlack,
    fontWeight : 'bold',
  }
})


export default CarouselImage

