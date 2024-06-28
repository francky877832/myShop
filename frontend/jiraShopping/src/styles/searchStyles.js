import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth} from "./commonStyles";

import { customText } from "./commonStyles";

export const searchStyles = StyleSheet.create({
    container : 
    {
        //flex : 1,
        //backgroundColor : "red",
    },
    filter :
    {
       //flex : 1
       backgroundColor : appColors.white,
    },
    searchBar : 
    {
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
    },
//A passer a searchbar
    searchBarContainer :
    {
        width : "101%",
        justifyContent : "center",
        alignItems : "center",
    },
//A passer a searchbar
    searchBarInput :
    {
        borderWidth : 0,
        width : "100%",
        borderColor: appColors.white,
    },

    historyLabelContainer:
    {
        alignSelf : "center", 
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        paddingHorizontal: 20,
    },
    
    historyContainer :
    {
       flex : 1,
       top : 20,
    },
    history:
    {
        flex : 1,
        flexDirection:"row", 
        justifyContent:"flex-start",
        alignItems : "center",
        paddingVertical : 15,
        paddingHorizontal : 10,

    },
    historyFlatlist:
    {
       
        backgroundColor : "#fff",
        paddingLeft : 10,
        marginTop : 10,
        //paddingBottom : 60,
    },
    textHistory :
    {
        color : "#555",
        fontFamily : appFont.secondaryFontFamily3,
        fontWeight : "bold",
        marginLeft : 10,
    },
    historySeparator:
    {
        width:"80%", 
        marginLeft : "10%",
        borderBottomWidth : 1,
        borderBottomColor : appColors.secondaryColor4,
    },

    historyLabel:
    {
        fontWeight : "bold",
    },
    label :
    {
        ...customText.text,
       fontFamily : appFont.secondaryFontFamily3,
       fontWeight : "bold",
       color : appColors.secondaryColor5,
    },
    vider:
    {
        color : appColors.secondaryColor1,
    },
    
    submit:
    {
        width : "100%",
        bottom : 20, 
        flexDirection : "row",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    pressableSubmit:
    {
        flex : 1,
        backgroundColor : appColors.secondaryColor1,
        paddingVertical : 20,
    },
    textSubmit:
    {
        flex : 1,
        color : "#fff",
        textAlign : "center",
    },
    

    

})