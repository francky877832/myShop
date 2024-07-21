import React, { useState, forwardRef, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image, Modal } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


import { caourselImageStyles } from '../../styles/carouselImageStyles';
import { productStyles } from '../../styles/productStyles';
import { datas } from '../../utils/sampleDatas';
import { appColors } from '../../styles/commonStyles';


const { width: screenWidth } = Dimensions.get('window');

const CarouselImage = (props) =>
{
  const {styles, images} = props
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    //const image = "../../assets/images/product5.png"

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
    width:"100%",
    alignItems:"center", 
    //paddingRight:20,
    backgroundColor : appColors.clearBlack,
    top: 20,
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
})


export default CarouselImage

