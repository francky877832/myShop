import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const productDetailsStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : -20
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
    },

    bottom :
    {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
    },
    price :
    {
        
    },
    acheter :
    {
        
    },
    panier :
    {
        
    },


})