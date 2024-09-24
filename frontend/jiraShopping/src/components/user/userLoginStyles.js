import { StyleSheet, StatusBar} from "react-native";
import { appColors, appFont, screenWidth, customText, inputTextStyle, screenHeight} from "../../styles/commonStyles";

import { productStyles } from "../../styles/productStyles";

export const userLoginStyles = StyleSheet.create({
    container :
    {
        flex : 1,
        backgroundColor : appColors.lightWhite,
    },


    backgroundImage: 
    {
        flex: 1,
        resizeMode: 'cover', // Ajuste l'image pour couvrir tout l'écran
        //justifyContent: 'center', // Centre le contenu (texte, etc.)
        alignItems : 'center',
    },
    cover : 
    {
        position : 'absolute',
        flex : 1,
        left : 0,
        right : 0,
        top : 0,
        bottom : 0,
        backgroundColor : appColors.transparentBlack,
        zIndex : 99,
    },


    pressable :
    {
        paddingVertical : 15,
        borderRadius : 20,
    },
    infoContainer :
    {
        position : 'absolute',
        left : 0,
        right : 0,
        top : screenHeight/4,
        height : screenHeight/2,
        backgroundColor : appColors.white,
        //borderTopLeftRadius : 30,
        //borderTopRightRadius : 30,
        paddingTop : "15%",
        paddingHorizontal : 30,
        zIndex : 100,
      
         // Ombre sur iOS
        shadowColor: appColors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        // Ombre sur Android
        elevation: 80,
        borderRadius: 10,
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