import { StyleSheet, StatusBar, Pressable } from "react-native";
import { appColors, appFont, screenWidth, customText } from "./commonStyles";




export const radioProductsListtStyles = StyleSheet.create({
    container : 
    {
        flex : 1,  
        backgroundColor : appColors.white, 
        borderTopWidth : 2,
        borderTopColor : appColors.lightWhite,
    },
    top :
    {
        flex : 1,
        paddingBottom : 115,        
        backgroundColor : appColors.white, 

    },
    flatListContainer :
    {
        //flex : 1,
        //backgroundColor : appColors.red, 
    },
    bottom :
    {
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        //paddingHorizontal : 20,
        paddingVertical : 20,
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 36,
        backgroundColor : appColors.white,
        borderTopWidth : 2,
        borderTopColor : appColors.secondaryColor3,
    },
    buttonView :
    {
        justifyContent : "center",
        alignItems : "center",
        //backgroundColor:"red",
    },
    bottomPrice : 
    {
        //flex : 1,
        justifyContent : "center",
        left : 10,
        //backgroundColor : appColors.green,
    },
    price :
    {
        ...customText.text,
        
    },
    pressable :
    {
        //flex : 1,
        paddingVertical: 10,
        paddingHorizontal : 50,
        borderRadius : 20,
    },  

})

export const radioProductStyles = StyleSheet.create({
    container : 
    {
       //flex : 1,  
    },
    radioGroup :
    {
        //flex : 1,
        //borderColor : appColors.red,
    },
    seller :
    {
        
    },
    radioGroup1 :
    {
        
    },
    radioGroup2 :
    {
        
    },
    radioContainer :
    {
        flexDirection : "row",
        justifyContent : "flex-start",
        alignItems : "center",
        
    },
    radioContainer1 :
    {
        borderTopWidth : 2,
        borderTopColor : appColors.lightWhite,
        borderBottomWidth : 2,
        borderBottomColor : appColors.lightWhite,
        paddingVertical : 20,
    },
    radioContainer2 :
    {
        paddingTop : 20,
    },
    radioProducts :
    {
        left : 40,
    },
    imageContainer :
    {
        width:75,
    },
    productImage :
    {
        width : 75,
        height : 100
    },
    productInfos :
    {
        flexDirection : "row",
    },
    inBasket :
    {
        top : 2,
        //left : 40,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
        backgroundColor : appColors.lightOrange,
        width : screenWidth/2,
        alignSelf : "center",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 10,
    },
    checkBoxContainer :
    {
        borderWidth:0, 
        padding:0, 
        backgroundColor:appColors.white,
    },
    checkBoxText : 
    {
        marginLeft:0,
        color:appColors.secondaryColor5,
        fontWeight:"normal",
    },

})