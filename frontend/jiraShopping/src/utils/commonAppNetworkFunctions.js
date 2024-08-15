import { API_BACKEND } from '@env';

import {Alert} from 'react-native';
import { notifications } from './offersDatas';
import { server } from '../remote/server';


exports.sendNotificaitons = async ({username, source, model, type, data}) => {
    const notif = notifications[model]
    const message = notif[type].message
    const action = notif[type].action
//console.log(notif)
    const notification = {
        user : username,
        source : source,
        type : 'normal',
        message : message,
        action : action,
        read : 0,
        datas : data
    }
    
        //console.log(comment)
            try{
                //console.log("Ok")
                const response = await fetch(`${server}/api/datas/notifications/update/${username}`, {
                    method: 'PUT',
                    body: JSON.stringify(notification),
                    headers: {
                        'Content-Type': 'application/json',
                    },})
                            //console.log(datas)
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête'+(await response.text()));
                }

                return true

            }catch(error){
                Alert.alert("Erreur", "Une erreur est survenue! "+ error,)

                return false
            }
}


exports.getNotifications = async (username) => {
    try{
        
        const response = await fetch(`${server}/api/datas/notifications/get/${username}`);            
        const datas = await response.json()
                //console.log(datas)
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
            //console.log(datas)
        return datas[0]?.notifications
    }catch(error){
        console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        return []
    }
}

exports.updateNotificationsRead = async ({username, id}) => {
    //console.log(id)
    try{
        
        const response = await fetch(`${server}/api/datas/notifications/read/${username}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
        },})          
        //const datas = await response.json()
                //console.log(datas)
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
            //console.log(datas)
            return true
    }catch(error){
        console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        return false
    }
}

exports.getProductFromNotifications = async (id) => {
    try{
        
        const response = await fetch(`${server}/api/datas/products/get/${id}`);            
        const data = await response.json()
       
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
         //console.log(data)
        return data
    }catch(error){
        //console.log(error)
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        return {}
    }
}


exports.addOder = async (user, product, price) =>{
    
}

exports.getOrders = async (type) => {
    switch(type)
    {
        case "delivered" : //acheve
            break
        case "pending" || "shipped" : //en cours
            break
        case "canceled" : //annulé
            break
        default : break
    }
}
