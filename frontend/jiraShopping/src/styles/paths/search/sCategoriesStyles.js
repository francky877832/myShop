import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText } from "../../commonStyles";
import { productStyles } from "../../productStyles";
import { productDetailsStyles } from "../../productDetailsStyles";


export const card  = StyleSheet.create({
        borderRadius: 8,
        shadowColor: appColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        borderWidth : 1,
        borderColor : appColors.secondaryColor3,
    })

export const sCategoriesStyles = StyleSheet.create({
    container : 
    {
        backgroundColor : appColors.lightWhite,
        flex : 1,
        
    },
    categoriesContainer :
    {
        backgroundColor : appColors.white,
    },
    pressableCat :
    {
        borderWidth : 1,
        borderColor : appColors.lightWhite,
        paddingVertical : 20,
        paddingHorizontal : 10,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center',
        width : '100%',
    },
    pressableColor :
    {
       padding : 5,
       width : "100%",
       justifyContent : "center",
      alignItems : "center",

    },
    checkBoxPressable :
    {

    },
    checkBoxContainer : 
    {
       flex : 1,
    },
    itemText : 
    {

    },



    //CONDITION
    conditionContainer :
    {
        flexDirection:"column", 
        justifyContent:"space-around",
        marginTop : 10,
        width: screenWidth,
        /*position:"absolute",
        top:0,
        left:0,right:0,
        zIndex : 100,*/
    },
    label :
    {
        ...customText.text,
       fontFamily : appFont.secondaryFontFamily3,
       fontWeight : "bold",
       color : appColors.secondaryColor5,
    },

    


    //PRICE
    
    priceContainer : 
    {
        flexDirection : "column",
        marginTop : 10,
        width: screenWidth,
        backgroundColor : appColors.lightWhite,
    },
    price : 
    {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : appColors.white,
        paddingVertical : 20,
    },
    pricesContainer : 
    {
        paddingHorizontal : 10,
        width : '100%',
        paddingVertical : 20,
    },
    priceInput :
    {
        //paddingLeft : 10,
        backgroundColor : appColors.lightWhite,
        height : 50,
        paddingLeft : 10,
        color : appColors.clearBlack,
        fontWeight : 'bold',
        fontSize : 16,
    },
    priceInputFocused:
    {
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
    }
})