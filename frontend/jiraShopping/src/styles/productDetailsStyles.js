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
        flex : 1,
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
        top : 30, 
        
        
    },
    descriptionBox : 
    {
        flexDirection : "row",
        backgroundColor : appColors.secondaryColor3,
        padding : 10,
        borderRadius : 5,
        width : "100%",
    },
    commentsContainer : 
    {
        
    }

})