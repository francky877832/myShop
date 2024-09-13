import {StyleSheet, Platform, Dimensions } from "react-native";
export const screen = Dimensions.get("window")
export const screenWidth = screen.width
export const screenHeight = screen.height

export const appColors = {
    mainColor : "#F0F0F0",
    //secondaryColor1 : "#f27a1a",
    secondaryColor1 : "#e52165",
    black : "#0d1137",
    clearBlack : 'rgba(13, 17, 55, 0.7)',
    lightSecondaryColor1 : "rgba(229, 33, 101, 0.1)",
    lightSecondaryColor2 : "rgba(229, 33, 101, 0.04)",
    lightOrange : "rgba(229, 33, 101, 0.1)",
    lightOrange2 : "rgba(229, 33, 101, 0.04)",


    //lightOrange : "rgba(242, 122, 26, 0.1)",
    //lightOrange2 : "rgba(242, 122, 26, 0.04)",
    secondaryColor2 : "#fff",
    secondaryColor3 : "#ccc",
    secondaryColor4 : "#777",
    secondaryColor5 : "#444",
    gray : "gray",
    red : "red",
    blue : "rgb(32, 137, 220)",
    green : "green",
    clearGreen : '#90EE90',
    pink : "pink",
    voilet : "violet",
    orange : "orange",
    white : "#fff",
    yellow : '#FFC107',
    lightBlack : "rgba(0, 0, 0, 0.2)",
    //black : "rgba(0, 0, 0, 0.9)",
    //clearBlack : "rgba(0, 0, 0, 0.7)",
    lightWhite : "rgb(240, 240, 240)",
    //lightWhite2 : "rgba(240, 240, 240, 0.02)",
}

export const appFont = {
    mainFontFamily : Platform.select({
        ios: 'Helvetica',
        android: 'Roboto',
      }),
    secondaryFontFamily1 :  "Arial",
    secondaryFontFamily2 : "Georgia",
    secondaryFontFamily3 : this.mainFontFamily,
    secondaryFontFamily4 : "Courier",

}

export const appFontSize = {
    mainFontSize : 14,

}
export const customText = {
    text :
    {
        fontFamily : appFont.mainFontFamily,
        fontSize : appFontSize.mainFontSize,
        color : appColors.black,
    },
}

export const inputTextStyle = {
    fontSize: 16,
    color: appColors.secondaryColor5,
    fontFamily : appFont.mainFontFamily,
    fontWeight : "bold",

}

export const formErrorStyle = {
    text :
    {
        color : appColors.red,
    }
    
}
