import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth, customText } from "../../../styles/commonStyles"
import { productStyles } from "../../../styles/productStyles";
import { productDetailsStyles } from "../../../styles/productDetailsStyles";


export const adminPannelStyles  = StyleSheet.create({
    container :
    {
        //flex : 1,
        paddingTop : 20,
        paddingBottom: 20,
        //backgroundColor : 'red',
    },
    titles :
    {
        backgroundColor : appColors.lightWhite,
        height : 50,
        flexDirection :"row",
        alignItems : "center",
        paddingLeft : 20,
    },
    containers :
    {
        //paddingHorizontal : 20,
    },
    contents :
    {
        backgroundColor : appColors.white,
        //flexDirection : "row",
        padding : 20,
    },
    group :
    {
        //paddingHorizontal : 20,
    },
    products : 
    {
        //paddingHorizontal : 20,
    },
    line:
    {   
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : 'center',
    },
    products :
    {
        //flex : 1
    },
    addProductSubmitView :
    {
        justifyContent : 'center',
        alignItems : 'center',
        bottom : 0,
        left : 0,
        right : 0,
    },
    inputContainer : 
    {
        borderRadius : 0,
        borderWidth : 0,
        borderBottom : 1,
        padding : 0,
    },

    pressable :
    {
        padding : 20,
        width : '100%'
    },
    text :
    {
        fontWeight : 'bold',
    },

    picker :
    {
        height: 50,
        width: 300,
    },
    deliveryDate :
    {
        padding : 10,
        borderRadius : 2
    },
    

})