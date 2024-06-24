import {StyleSheet, Platform } from "react-native";


export const appColors = {
    mainColor : "#F0F0F0",
    secondaryColor1 : "#f27a1a",
    secondaryColor2 : "#fff",
    secondaryColor3 : "ccc",
}

export const appFont = {
    mainFontFamily : Platform.select({
        ios: 'Helvetica', // Use Helvetica on iOS
        android: 'Roboto', // Use Roboto on Android
      }),
}