import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const preferencesStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : 0,
        backgroundColor : appColors.lightWhite,
    },
    productContainer : 
    {
        //flex : 1,
        //paddingBottom : 2,
    },
    top :
    {
        width : "100%",
        backgroundColor : appColors.white,
        //height : 35,
    },
    flatlist :
    {
        backgroundColor : appColors.lightWhite,
    },


    topAnimationBox :
    {
        flexDirection : 'row',
        alignItems :'center',
        backgroundColor : appColors.lightWhite,
        height : 25,
    },
    topAnimation :
    {
        backgroundColor : 'transparent',
    },
    animatedText :
    {
        color : appColors.black,
        fontWeight : 'bold',
    },
    winkelBox :
    {
        //position : 'absolute',
        width : '100%',
        justifyContent : 'center',
        alignItems : 'center',
        //backgroundColor : appColors.lightOrange3,
        //left : -20, // en rapport VE L'ANNİMATION from
    },
    winkelText :
    {
        color : appColors.white,
        fontWeight : 'bold',
        fontStyle : 'italic',
    }
})