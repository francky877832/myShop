import React, { createContext, useState, useEffect } from 'react'

import { serialize } from '../utils/commonAppFonctions'
import { server } from '../remote/server'
import * as SecureStore from 'expo-secure-store';


const UserContext = createContext()
const UserProvider = ({children}) => {

    const [refreshComponent, setRefreshComponent] = useState(false)
//IsAuthentiate doit suivre l'evolution de user
    const [user, setUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    //Controler les datas avec JOI VALIDATION
    const checkEmail = (email) =>{

    }
    const checkPassword = (pwd) =>{

    }
    const checkUsername = (username) =>{

    }

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('user');
            await SecureStore.deleteItemAsync('authToken');
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
          console.error('Error removing token:', error);
        }
      };
    
    useEffect(()=>{
        //getSearchedTextWithFilters("ord")
    })

    const filterStateVars = {refreshComponent, email, username, password, user, isAuthenticated }
    const filterStateSetters = {setRefreshComponent, setEmail, setUsername, setPassword, setUser, setIsAuthenticated}
    const utilsFunctions = { checkEmail, checkPassword, checkUsername }
    return (
        <UserContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }