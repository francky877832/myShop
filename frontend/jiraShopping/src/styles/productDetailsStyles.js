import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";
import { screenHeight, screenWidth } from "./commentsStyles";
import { productStyles } from "./productStyles";


export const productDetailsStyles = StyleSheet.create({
    container : 
    {
        top : 0,
        height : screenHeight,
    },
    buttonContainer : 
    {
        flexDirection : "row",
        justifyContent : "space-between",
        paddingHorizontal : 10,
        top : 30,
        zIndex : 99,
        backgroundColor : appColors.lightBlack,
    },
    buttonContainerLeft : 
    {
       flexDirection : "row",
       justifyContent : "space-between",
    },
    prevButton :
    {
        
    },
    likeButton :
    {
        backgroundColor : appColors.white,
    },
    shareButton :
    {
       
    },
    underCaroussel :
    {
        //flex : 1,
        backgroundColor : appColors.white, 
        paddingHorizontal : 10,
        paddingTop : 5,

    },
    since :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        
    },
    name :
    {
        
        
    },
    details :
    {
        flexDirection:"row",
        justifyContent:"space-between",
        top : 15,
    },
    description :
    {
      paddingTop : 25,
      paddingBottom : 20,
    },
    descriptionBox : 
    {
        flexDirection : "row",
        backgroundColor : appColors.secondaryColor3,
        padding : 10,
        top : 5,
        borderRadius : 5,
        width : "100%",
    },
    commentsContainer : 
    {
        //flex : 1,
        width : "100%",
        paddingHorizontal : 10,
        paddingBottom : 10,
        backgroundColor : appColors.white,
        top : 10,
        paddingTop : 10,
    },

    similarContainer : 
    {
        top : 50,
        paddingLeft: 10,
        paddingBottom : 50,
    },

    bottom :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
        backgroundColor : appColors.lightWhite,
        height : 50,
        borderWidth : 1,
        borderColor : appColors.lightBlack,
    },
    button:
    {
        ...productStyles.card,
        justifyContent : "center",
        alignItems : "center",
        height : 50,
        borderRadius : 0,
    },
    buttonText:
    {
        textAlign : "center",
        fontWeight : "bold",
    },
    price :
    {
        flex : 1,

    },
    acheter :
    {
        flex : 1,
        borderRadius : 0,
        borderRightWidth : 1,
        borderRightColor : appColors.white
    },
    panier :
    {
        flex : 1,
        borderRadius : 0,
    },


})