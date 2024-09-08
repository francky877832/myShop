import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth } from "./commonStyles";



export const verifyInfosStyles = StyleSheet.create({
    container : 
    {
        borderColor : appColors.lightWhite,
    },

    acheter :
    {
        flex : 1,
        borderRadius : 5,
    },
    button:
    {
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
        //flexWrap : 'wrap',
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'space-evenly',
        paddingHorizontal : 5,
        //backgroundColor:'red',
    },


})