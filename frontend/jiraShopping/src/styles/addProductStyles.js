import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";
import SellerBrand from "../components/common/SellerBrand";




export const addProductStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : 0,
        //backgroundColor : appColors.white,
    },
    containers :
    {
        
    },
    titles :
    {
        backgroundColor : appColors.lightWhite,
        height : 50,
        flexDirection :"row",
        alignItems : "center",
        paddingLeft : 20,
    },
    contents :
    {
        //height : 7,
        backgroundColor : appColors.white,
        flexDirection : "row",
        alignItems : "center",
        padding : 20,
        paddingRight : 0,
        
    },
    titlesText :
    {
        ...customText.text,
        fontWeight : "bold",
        fontSize : 20,
    },
    normalText :
    {
        ...customText.text,

    },
    imageBox :
    {
        width:100,
        height:100,
        borderWidth : 1,
        borderColor : appColors.secondaryColor4,
        justifyContent : "center",
        alignItems : "center",
    },
    bottomPicker :
    {
        position : "absolute",
        left : 0,
        right : 0,
        bottom : 0,
        padding : 20,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        paddingHorizontal : 20,
        backgroundColor : appColors.lightOrange,
    }

})