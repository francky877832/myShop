import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont } from "./commonStyles";


export const commentStyles = StyleSheet.create({
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
      width: "100%",
      borderWidth : 1,
    },
    image: 
    {
      width: '100%',
      height: "100%",
    },
  });