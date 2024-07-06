import { StyleSheet } from "react-native";
import { appColors, screenHeight } from "./commonStyles";
import { appFont } from "./commonStyles";

export const categoriesStyles = StyleSheet.create({
    container: 
    {
      flex: 1,
      
    },
    categoryContainer : 
    {
      flexDirection : "row",
    },
    subCategoryContainer : 
    {
      flexDirection : "coloumn",
      //paddingHorizontal : 10,
      //left : 10,
      alignSelf : "flex-start",
      //backgroundColor : "red",
      width : "100%",
      height : screenHeight,
    },  
    pressableCat : 
    {
      justifyContent:"center",
      alignItems:"center",
      paddingVertical : 10,
      borderRightWidth : 1,
      borderBottomWidth : 1,
      borderColor : appColors.secondaryColor3,
      width : 100,
      height : 100,
      //position : "absolute",
      //backgroundColor:"blue",
      zIndex : 100,
    },
    pressableSubCat :
    {
       padding : 20,
       width : "100%",
      //height : 200,
       borderWidth : 1,
       borderColor : appColors.secondaryColor3,
       justifyContent : "center",
  
       //backgroundColor:"blue",

    },
    colorContainer :
    {
      width : "100%",
      justifyContent : "center",
      alignItems : "center",
    },
    pressableColor :
    {
       padding : 5,
       width : "100%",
       justifyContent : "center",
      alignItems : "center",
       //borderWidth : 1,
       //borderColor : appColors.secondaryColor3
    },


//Marque
})

