import { StyleSheet, } from "react-native";
import { appColors, appFont, screenWidth} from "./commonStyles";


export const searchStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        //backgroundColor : "red",
    },
    searchBar : 
    {
        width : "100%",
        justifyContent : "center",
        alignItems : "center",
    },
    searchBarContainer :
    {
        width : "101%",
        justifyContent : "center",
        alignItems : "center",
    },
    searchBarInput :
    {
        borderWidth : 0,
        width : "100%",
        borderColor: "#fff",
    },

   
    historyContainer :
    {
       flex : 1,
       top : 20, 
    },

    historyLabelContainer:
    {
        alignSelf : "center", 
        width:"100%", 
        flexDirection:"row", 
        justifyContent:"space-between", 
        paddingHorizontal: 20,
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
        flex : 1, 
        backgroundColor : "#fff",
        paddingLeft : 10,
        marginTop : 10,
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

    historiqueLabel:
    {
        
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