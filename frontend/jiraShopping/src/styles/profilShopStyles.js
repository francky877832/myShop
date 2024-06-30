import { StyleSheet, } from "react-native";
import { appColors, appFont } from "./commonStyles";
import SellerBrand from "../components/common/SellerBrand";




export const profilShopStyles = StyleSheet.create({
    container : 
    {
        flex : 1,
        top : 0,
        backgroundColor : appColors.white,
    },
    productContainer : 
    {
        flex : 1,
        paddingBottom : 2,
    },
    topContainer :
    {
        width : "100%",
        backgroundColor : appColors.lightOrange2,
        padding : 10,
       // height : 190,
    },
    flatlist :
    {
        backgroundColor : appColors.lightWhite,
    },

//TOP ELEMENTS
    topTop :
    {
        flexDirection : "row",
        alignItems : "center",
        width : "100%",
    },
    prevButton :
    {
        
    },
    sellerBrand :
    {
        flexDirection : "row",
        width : "70%",
        left : 20,
    },
    sellerBrandImageContainer :
    {
        width : 50,
        height : 50,
        borderRadius : 25,
    },
    sellerBrandImage :
    {
        width : 50,
        height : 50,
        borderRadius : 25,
        borderWidth : 2,
        borderColor : appColors.secondaryColor1,
    },
    sellerBrandName :
    {
        height : 50,
        flexDirection : "column",
        justifyContent : "space-evenly",
        paddingLeft : 10,
    },
    notifParameter :
    {
        flexDirection : "row",
        justifyContent : "space-between"
    },

//follow
    follow : 
    {
        top : 5,
        flexDirection : "row",
        justifyContent : "space-between",
        padding : 10
    },
    followInformations:
    {
        width : "100%",
        flexDirection : "row",
        justifyContent : "space-between",
    },
    followButton:
    {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        paddingHorizontal : 10,
        paddingVertical : 5,
        backgroundColor:appColors.secondaryColor1,
        borderRadius : 5,
    },
    followLeftElements :
    {
        flexDirection : "column",
        justifyContent : "center",
        alignItems : "center",
        paddingRight : 5,
    },
    sold : 
    {
       
    },
    follower : 
    {

    },
    following : 
    {

    },
    favourites :
    {

    },

    followFocused :
    {
        backgroundColor : appColors.white,
        borderWidth : 1,
        borderColor : appColors.secondaryColor1
    }

})