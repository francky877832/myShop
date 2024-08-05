import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont, customText, inputTextStyle } from "./commonStyles";

import { productStyles } from "./productStyles";


export const screen = Dimensions.get("window")
export const screenWidth = screen.width
export const screenHeight = screen.height

export const commentsStyles = StyleSheet.create({
    container: 
    {
      backgroundColor : appColors.white,
      paddingHorizontal:20,
      paddingBottom : 20,
    },
    commentContainer: 
    {
      backgroundColor : "red",
    
    },
    flatlistContainerView :
    {
      //flex : 1,
      paddingBottom : 20,
    },
    flatlistContainer : 
    {
      backgroundColor : appColors.white,
    },
    flatlistContainerNotAll :
    {
      maxHeight : 600,
    },
    
    comment: 
    {
      ///...productStyles.card,
      flexDirection : "row",
      backgroundColor : appColors.secondaryColor4,
      padding : 10,
      marginTop : 10,
      alignSelf : "flex-start",
      paddingLeft : 20,
      borderRadius : 10,
      maxWidth : "90%",
    },
    subComment: 
    {
      backgroundColor : appColors.secondaryColor3,
      alignSelf : "flex-end",
    },
    commentText :
    {
      ...customText.text,
    },
    sendButton :
    {
        left : 5,
    },

    inputContainer :
    {
      top : 10,
      //justifyContent : "center",
      //alignItems : "center",
    },
    input :
    {
      ...customText,
      ...inputTextStyle,
      padding : 10,
    },
    inputFocused :
    {
      borderBottomWidth : 1,
      borderColor : appColors.secondaryColor1,
    }
  
    

  });