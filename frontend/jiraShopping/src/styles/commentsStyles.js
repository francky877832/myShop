import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";

import { productStyles } from "./productStyles";
import { ScreenWidth } from "react-native-elements/dist/helpers";

export const screen = Dimensions.get("window")
export const screenWidth = screen.width
export const screenHeight = screen.height

export const commentsStyles = StyleSheet.create({
    container: 
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      top : 20,
      backgroundColor : appColors.white,
    },
    commentContainer: 
    {
      backgroundColor : "red",
    },
    flatlistContainer : 
    {
      backgroundColor : appColors.white,
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
      borderWidth : 1,
    },

  });