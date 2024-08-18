import { StyleSheet, StatusBar} from "react-native";
import { appColors, appFont } from "./commonStyles";
import { screenHeight, screenWidth } from "./commentsStyles";
import { productStyles } from "./productStyles";
import { filtersStyles } from "./filtersStyles";

export const productDetailsStyles = StyleSheet.create({
    container : 
    {
        //top : 0,
        width : "100%",
        height : "100%",
    },
    buttonContainer : 
    {
        flexDirection : "row",
        justifyContent : "space-between",
        paddingHorizontal : 10,
        zIndex : 100,
        backgroundColor : appColors.lightBlack, //transparence sur limage
    },
    similarContainer : 
    {
        ...filtersStyles.similarContainer,
        top : 20,
        //paddingLeft : 1,
        paddingBottom :  20,
        //backgroundColor : appColors.white,
        //justifyContent : 'center',
        //alignItems : 'center',
        //width : '100%',
    },
    getBackPosition :
    {
        bottom : 60 //to get back position from buttonContainer
    },

    buttonContainerLeft : 
    {
       flexDirection : "row",
       justifyContent : "space-between",
    },
    prevButton :
    {
        color : appColors.white,
    },
    likeButton : //not used cause of different place to display in
    {
        backgroundColor : appColors.white,
        color : appColors.white,
    },
    shareButton :
    {
       
    },
    underCaroussel :
    {
        //flex : 1,
        backgroundColor : appColors.white,

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
        flexDirection : "column",
        backgroundColor : appColors.secondaryColor3,
        padding : 10,
        top : 5,
        borderRadius : 5,
        width : "100%",
    },
    infosBox :
    {
        paddingHorizontal : 10,
        paddingTop : 5,
    },
    commentsContainer : 
    {
        //flex : 1,
        width : "100%",
        //paddingHorizontal : 5,
        paddingBottom : 10,
        backgroundColor : appColors.white,
        top : 10,
        paddingTop : 10,
    },
    scrollView :
    {
        backgroundColor : appColors.lightWhite,
        width : "100%",
        //bottom : -screenHeight/2,
        left : 0,
        right : 0,
        
    },

    bottom :
    {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        position : "relative",
        left : 0,
        right : 0,
        bottom : 0,
        backgroundColor : appColors.white,
        height : 60,
        borderWidth : 1,
        borderColor : appColors.secondaryColor3,
        //paddingVertical : 10, height est fixe
        paddingHorizontal : 10,
        //zIndex : 0,

    },
    button:
    {
        ...productStyles.card,
        shadowColor : appColors.white,
        justifyContent : "center",
        alignItems : "center",
        height : 50,
        borderRadius : 5,
    },
    buttonText:
    {
        textAlign : "center",
        fontWeight : "bold",
    },
    price :
    {
        flex : 1,
        alignItems : "center",

    },
    acheter :
    {
        flex : 1,
        borderRadius : 5,
    },
    panier :
    {
        flex : 1,
        borderRadius : 5,
       // borderLeftColor : appColors.white,
        //borderLeftWidth : 1,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
        left : -5,
    },

    sellerBrand :
    {
        backgroundColor : appColors.lightOrange,
        paddingVertical : 10,
        paddingHorizontal : 5,
        width : screenWidth,
    }, 

    likeAddersImages : 
    {
        width : 50,
        height : 50,
        borderRadius : 25,
        //left : -10,
    },

    likeAdders : 
    {
        backgroundColor : appColors.white,
        padding : 10,
        //alignItems : 'center',
    },
    likeTitle : 
    {

    },
    likeContent :
    {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
    },
    likeItem :
    {
        position : 'relaive',
        justifyContent:"center",
        alignItems : 'center',
    },
    someText : 
    {
        fontWeight: "bold", fontSize: 20, color: appColors.black ,paddingLeft:10,
    }

 
    

  
})