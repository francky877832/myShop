import React, { createContext, useState } from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const GeneralContext = createContext()

const GeneralProvider = ({children}) => {
  
    

    const filterStateVars = {}
    const filterStateSetters = {}
    const utilsFunctions = {  }
    return (
        <GeneralContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </GeneralContext.Provider>
    )
}


export { GeneralContext, GeneralProvider }

