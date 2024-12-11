import React, { createContext, useState } from "react";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SoftBarContext = createContext();

const SoftBarProvider = ({ children }) => {
  const insets = useSafeAreaInsets();
  const WINDOW_HEIGHT = Dimensions.get("window").height;
  // Calculez la hauteur de la barre de navigation virtuelle
  const BOTTOM_NAV_BAR_HEIGHT =
    WINDOW_HEIGHT -
    (Dimensions.get("screen").height -
      insets.bottom -
      (StatusBar.currentHeight || 0));

  const filterStateVars = { BOTTOM_NAV_BAR_HEIGHT };
  const filterStateSetters = {};
  const utilsFunctions = {};
  return (
    <SoftBarContext.Provider
      value={{ ...filterStateVars, ...filterStateSetters, ...utilsFunctions }}
    >
      {children}
    </SoftBarContext.Provider>
  );
};

export { SoftBarContext, SoftBarProvider };
