import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { screenHeight, screenWidth } from "./commentsStyles";



export const caourselImageStyles = StyleSheet.create({
    container: 
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width : "100%",
      //backgroundColor : appColors.red,
    },
    itemContainer: 
    {
      backgroundColor: appColors.white,
      borderRadius: 5,
      height: screenWidth*1.2,
      width: screenWidth,
      borderWidth : 1,
      borderColor : appColors.lightWhite2,
    },
    image: 
    {
      width: '100%',
      height: "100%",
    },
  });