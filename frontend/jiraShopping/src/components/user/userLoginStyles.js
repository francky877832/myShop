import { StyleSheet, StatusBar} from "react-native";
import { appColors, appFont, screenWidth, customText, inputTextStyle, screenHeight} from "../../styles/commonStyles";

import { productStyles } from "../../styles/productStyles";

export const userLoginStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        backgroundColor : appColors.lightWhite,
    },

    pressable :
    {
        paddingVertical : 20,
    },
    infoContainer :
    {
        ...productStyles.card,
        position : 'absolute',
        left : 0,
        right : 0,
        top : screenHeight/4,
        bottom : 0,
        backgroundColor : appColors.white,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        paddingTop : "15%",
        paddingHorizontal : 30
    },
    titleBox :
    {
        left : 20,
        
    },
    title :
    {
        ...customText.text,
        color : appColors.white,
        fontSize : 30,
        fontWeight : "bold",
    },
    credentialContainers :
    {
        
    },
    inputFocused :
    {
        borderColor : appColors.secondaryColor1,
    }

})