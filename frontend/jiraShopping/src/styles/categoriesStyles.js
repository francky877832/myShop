import { StyleSheet } from "react-native";
import { appColors } from "./commonStyles";
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

    },
    pressableSubCat :
    {
       padding : 20,
       width : "100%",
       borderWidth : 1,
       borderColor : appColors.secondaryColor3
    },


//Marque
})

