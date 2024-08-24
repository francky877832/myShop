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
      paddingBottom : 0,
    },
    commentContainer: 
    {
      backgroundColor : "red",
    
    },
    flatlistContainerView :
    {
      //flex : 1,
      paddingBottom : 10,
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
      //left : 5,
    },
    subComment: 
    {
      backgroundColor : appColors.secondaryColor3,
      alignSelf : "flex-end",
      width : "65%",
      paddingHorizontal : 5,
      paddingVertical : 10,
      //left : 5,
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
      top : 0,
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
    },

    commentProfileContainer :
    {
      width : 30,
      height : 30,
      borderRadius : 15,
      //justifyContent : 'flex-end',
      alignSelf : 'flex-end',
      borderWidth : 2,
      borderColor : appColors.secondaryColor1,
      zIndex : 99,
      //bottom : 0,
    },
    commentProfile :
    {
      width : 30,
      height : 30,
      borderRadius : 15,
      top : '2%',
    }
  
    

  });