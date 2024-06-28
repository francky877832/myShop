import { StyleSheet, Dimensions } from "react-native";
import { appColors, appFont } from "./commonStyles";

export const numProduct = 2
export const paddingForProductContainer = { horizontal : 10, vertical : 10, }

const marginHorizontal = 5
const marginVertical = 5
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth/numProduct) - marginHorizontal - paddingForProductContainer.horizontal;

export const productStyles = StyleSheet.create({
    container : 
    {
        backgroundColor : appColors.secondaryColor2,
        width : cardWidth,
        //height : 100,
        marginHorizontal : marginHorizontal,
        marginVertical : marginVertical,
        paddingBottom : 5,
    },
    containerHorizontal : //Horizontal container ?
    {
        backgroundColor : appColors.secondaryColor2,
        width : screenWidth/2,
        //height : 100,
        marginHorizontal : marginHorizontal,
        marginVertical : marginVertical,
        paddingBottom : 5,
    },
    imageHorizontal : 
    {
        width : "100%",
        //height: 300 * 1.2,
        borderRadius: 8,
    },


    pressable :
    {
        flex : 1 ,
    },

    image : 
    {
        width : "100%",
        height: cardWidth * 1.2,
        borderRadius: 8,
    },
    text : 
    {
        paddingHorizontal : 10,
        paddingVertical : 5
    },

    shopName :
    {
        fontWeight : "bold",
        fontStyle : "italic",
        fontFamily : appFont.mainFontFamily,
        color : "gray",
        
    },
    productName :
    { 
        fontWeight : "normal",
        fontStyle : "normal",
        fontFamily : appFont.mainFontFamily,
        color : "gray",
        paddingTop : 7,
        alignSelf : "center",
    },
    price :
    {
        color : appColors.secondaryColor1,
    },

    top :
    {
       height : 25,
       width : "100%",
       position : "absolute",
       top : -cardWidth * 1.2,
       flexDirection : "row",
       justifyContent : "space-between",
       paddingHorizontal : 10,
       marginLeft : -5,
    },
    bottom :
    {
        top : 5,
        borderRadius: 8,
        padding : 5,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
        flexDirection : "row",
        justifyContent : "center",
    },
    category :
    {
        fontSize : 14,
        fontWeight : "bold",
        fontStyle : "normal",
        fontFamily : appFont.mainFontFamily,
        color : appColors.secondaryColor1,
    },
    feesBy : 
    {
        flexDirection : "row",
        backgroundColor : "gray",
        color : "white",
        top : 3,
    },


    card : 
    {
        borderRadius: 8,
        shadowColor: appColors.lightWhite,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },

    
})