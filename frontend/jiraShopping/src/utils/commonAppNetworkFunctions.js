import { API_BACKEND } from '@env';

import {Alert} from 'react-native';
import { notifications } from './offersDatas';

exports.sendNotificaitons = async (type) =>{
    const message = notifications[type]
}

exports.getNotifications = async (user) => {

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
