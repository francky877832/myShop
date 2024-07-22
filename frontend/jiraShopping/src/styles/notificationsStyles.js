import { StyleSheet, StatusBar, Pressable } from "react-native";
import { appColors, appFont } from "./commonStyles";




export const notificationsStyles = StyleSheet.create({
    scene: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : appColors.white,

    },
    item :
    {
        
        paddingHorizontal : 10,
        paddingVertical : 10,
        width : '100%',
        backgroundColor : appColors.lightOrange,
        borderTopWidth : 1,
        borderTopColor : appColors.white,

    },
    itemRead :
    {
        backgroundColor : appColors.white,
    },
    pressable :
    {
        flexDirection : 'row',
        alignItems: 'center',
        width : '100%',
        //backgroundColor : appColors.lightOrange,

    },
    icon :
    {
        justifyContent : 'center',
        alignItems : 'center',
        width : 50,
        height : 50,
        borderRadius : 25,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1,
    },
    content : 
    {
        paddingLeft : 20,
    },
    sinceDate :
    {
        left : 70,
    },
    textDate :
    {   
        color : appColors.secondaryColor4,
        fontSize : 13,
    }

})