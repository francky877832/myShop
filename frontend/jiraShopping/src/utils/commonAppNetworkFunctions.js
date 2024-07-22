import { API_BACKEND } from '@env';

import {Alert} from 'react-native';
import { notifications } from './offersDatas';

exports.sendNotificaitons = async ({username, source, model, type}) => {
    const notif = notifications[model]
    const message = notif[type].message
    const action = notif[type].action
console.log(notif)
    const notification = {
        user : username,
        source : source,
        type : 'normal',
        message : message,
        action : action,
        read : 0
    }
    
        //console.log(comment)
            try{
                //console.log("Ok")
                const response = await fetch(`${API_BACKEND}/api/datas/notifications/update/${username}`, {
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
        //console.log("Ok")
            const response = await fetch(`${API_BACKEND}/api/datas/notifications/get/${username}`);            
            const datas = await response.json()
                    //console.log(datas)
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
                //console.log(datas)
            return datas[0]?.notifications
    }catch(error){
        Alert.alert("Erreur", "Une erreur est survenue! "+ error,)
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
