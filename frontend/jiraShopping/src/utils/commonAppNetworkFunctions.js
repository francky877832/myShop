import { API_BACKEND } from '@env';

import {Alert} from 'react-native';
import { notifications } from './offersDatas';
import { server } from '../remote/server';


exports.sendNotifications = async ({user, source, model, type, datas}) => {
    const notif = notifications[model]
    const message = notif[type].message
    const action = notif[type].action
//console.log(notif)
    const notification = {
        user : user,
        source : source,
        type : model.toLowerCase(),
        message : message,
        action : action,
        read : 0,
        datas : datas
    }
    
        console.log(notification.type)
            try{
                //console.log("Ok")
                const response = await fetch(`${server}/api/datas/notifications/update/${user}`, {
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
                console.error("Erreur", "Une erreur est survenue! "+ error,)
                return false
            }
}


exports.getNotifications = async (user, page, limit) => {
    //console.log(username, page, limit)
    try{
        const response = await fetch(`${server}/api/datas/notifications/get/${user}?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
            },});
            
        const datas = await response.json()
        //console.log(datas)
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
           // console.log(datas.notifications)
        return datas.notifications
    }catch(error){
        console.log(error)
        //Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
        return []
    }
}





exports.updateNotificationsRead = async ({user, id}) => {
    //console.log(id)
    try{
        
        const response = await fetch(`${server}/api/datas/notifications/read/${user}/${id}`, {
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
        console.log("Erreur", "Une erreur est survenue! "+ error,)
        return []
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
