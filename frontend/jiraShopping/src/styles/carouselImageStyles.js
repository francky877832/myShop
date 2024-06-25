import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont } from "./commonStyles";

const { width: screenWidth } = Dimensions.get('window');



export const caourselImageStyles = StyleSheet.create({
    container: 
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      //backgroundColor : appColors.red,
    },
    itemContainer: 
    {
      backgroundColor: '#fff',
      borderRadius: 5,
      height: 500,
      padding: 2,
      width: screenWidth,
      borderWidth : 1,
    },
    image: 
    {
      width: '100%',
      height: "100%",
    },
  });