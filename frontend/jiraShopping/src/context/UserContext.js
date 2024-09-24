import { API_BACKEND } from '@env';

import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native';
import { serialize, formDataToJSON } from '../utils/commonAppFonctions'
import { server } from '../remote/server'
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { storeCache, getCache } from '../cache/cacheFunctions';

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
            email : email, //"francky877832@gmail.com",
            username : username, //"francky877832",
            password : password, //"0000000",
        }
    //console.log(JSON.stringify(user))
        try
        {
            const params = new URLSearchParams(user);
            const queryString = params.toString();
            //console.log(server)
            //const response = await fetch(`${server}/api/auth/login?${serialize(user)}`, {
            //https://jirashopping-25ee1eaa49ff.herokuapp.com/api/auth/login?email=francky877832%40gmail.com&username=&password=00000000000
            //const response = await fetch(`https://jirashopping-25ee1eaa49ff.herokuapp.com/api/auth/login?email=francky877832%40gmail.com&username=&password=000000000`, {
            const response = await fetch(`${server}/api/auth/login?${queryString}`, {
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
                console.log(user)
                await SecureStore.setItemAsync('authToken', token);
                await SecureStore.setItemAsync('user', JSON.stringify({email:user.email, username:user.username, password:user.password}));
                //console.log(loggedUser)
                
                //Mis a jour du contexte User
                setUser(user)
                setTemporaryAddress({address:user.address, phone:user.phone, name:user.name})
                setIsAuthenticated(true);
                return user
            }
            else
            {
                throw new Error((await response.json()).error)
                //throw new Error("await response.json()")
                //return false
            }
        
            //Alert.alert("Signed In")
        }
        catch(error)
        {
            console.log(error)
            Alert.alert("Une erreur est survenue", `${error.message} => Verifier vos identifiants.`)
            setIsAuthenticated(false);
            return false
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
            //console.log(updatedFormData)
            
            const responseData = await response.json();
            //Mise a jour des donnees locales
           // const newDatas = formDataToJSON(updatedFormData)
            

            //console.log('Réponse du serveur:', responseData);
    
            if (responseData.success) {
                //console.log('Informations mises à jour avec succès:', responseData.user);
            }
            return responseData.user
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    }

    const getUser = async (email) => {
        try
        {
            const response = await fetch(`${server}/api/auth/users/get/${encodeURI(email)}`, {
                method: 'GET',
                headers : {
                    'Content-Type': 'application/json',
                },
            })

            if(!response)
            {
                throw new Error("Cet email ne'existe pas " + await response.text())
            }
            
            const data = await response.json()
            //console.log(data)
            return true
        }
        catch(error)
        {
            console.log(error)
            return false
        }

    }

    

    
    

    const filterStateVars = {temporaryAddress, refreshComponent, email, username, password, user, isAuthenticated }
    const filterStateSetters = {setTemporaryAddress, setRefreshComponent, setEmail, setUsername, setPassword, setUser, setIsAuthenticated}
    const utilsFunctions = { getUser, updateUser, checkEmail, checkPassword, checkUsername, loginUserWithEmailAndPassword}
    return (
        <UserContext.Provider value={{...filterStateVars, ...filterStateSetters, ...utilsFunctions}}>
            {children}
        </UserContext.Provider>
    )
}


export { UserContext, UserProvider }