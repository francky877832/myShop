import { StyleSheet, StatusBar } from "react-native";
import { appColors, appFont, customText } from "./commonStyles";

import { productStyles } from "./productStyles";



export const referralDetailsStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        //backgroundColor : appColors.lightOrange,
    },
    menu :
    {
        top : 50,
    },
    flatlist :
    {
        backgroundColor : appColors.white,
        //paddingBottom : 500,
    },
    renderTitleBox :
    {
        backgroundColor : appColors.secondaryColor1,
    },
    renderTitle :
    {
        fontSize : 20,
        color : appColors.white,
        fontWeight : 'bold',
    },
    text :
    {
        ...customText.text,
        textAlign : 'center',
    },
   

})