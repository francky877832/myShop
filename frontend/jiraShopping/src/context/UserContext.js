import { API_BACKEND } from '@env';

import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native';
import { serialize } from '../utils/commonAppFonctions'
import { server } from '../remote/server'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';


const UserContext = createContext()
const UserProvider = ({children}) => {
//    const navigation = useNavigation()
    const [refreshComponent, setRefreshComponent] = useState(false)
//IsAuthentiate doit suivre l'evolution de user
    const [user, setUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [temporaryAddress, setTemporaryAddress] = useState({})

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


      const loginUserWithEmailAndPassword = async (email, username, password) => {
        const user = {
            email : "francky877832@gmail.com",
            username : "francky877832",
            password : "0000000",
        }
    // console.log(JSON.stringify(user))
        try
        {
            console.log(server)
            const response = await fetch(`${server}/api/auth/login?${serialize(user)}`, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                },
            })
            
            //console.log("jj")
            if(response.ok)
            {
                const loggedUser = await response.json()
                const token = loggedUser.token
                const user = loggedUser.user
                //Mis a jour de async storage
                await SecureStore.setItemAsync('authToken', token);
                await SecureStore.setItemAsync('user', JSON.stringify({email:user.email, username:user.username,password:user.password}));
                //console.log(loggedUser.user.email)
                
                //Mis a jour du contexte User
                setUser(user)
                setTemporaryAddress({address:user.address, phone:user.phone})
                setIsAuthenticated(true);

            }
            else
            {
                throw new Error((await response.json()).error)
                //throw new Error("await response.json()")
            }
        
            //Alert.alert("Signed In")
        }
        catch(error)
        {
            console.log(error)
            Alert.alert("Une erreur est survenue", `${error.message} => Verifier votre connexion Internet.`)
            setIsAuthenticated(false);
        }
    }


   const  updateUser = async (userId, updatedFormData) => {
    try {
            const response = await fetch(`${server}/api/auth/users/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: updatedFormData,  // Convertit les données mises à jour en FormData
            });
    
            // Vérification si la requête a réussi
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erreur lors de la mise à jour de l\'utilisateur:', errorData.message);
                return;
            }
    
            const responseData = await response.json();
            console.log('Réponse du serveur:', responseData);
    
            if (responseData.success) {
                console.log('Informations mises à jour avec succès:', responseData.data);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    }

    

    
    

    const filterStateVars = {temporaryAddress, refreshComponent, email, username, password, user, isAuthenticated }
    const filterStateSetters = {setTemporaryAddress, setRefreshComponent, setEmail, setUsername, setPassword, setUser, setIsAuthenticated}
    const utilsFunctions = { updateUser, checkEmail, checkPassword, checkUsername, loginUserWithEmailAndPassword}
    return (
        <UserContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }