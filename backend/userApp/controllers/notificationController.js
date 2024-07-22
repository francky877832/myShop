const Notification = require('../models/notificationModel');
const mongoose = require('../../shared/db').mongoose;
const ObjectId = mongoose.Types.ObjectId;

const addUserNotification = (req, res, next) => {
    const notification = new Notification({
        user : req.body.user,
        notifications : [{
            _id : new ObjectId().toHexString(),
            source : req.body.source,
            type : req.body.type,
            message : req.body.message,
            action : req.body.action,
            read : req.body.read
        }]
    })
    notification.save()
    .then( () => {
        res.status(200).json({ message: "Notification creer" });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};


exports.updateUserNotifications = (req, res, next) => {
   
    const notificaiton = {
        _id : new ObjectId().toHexString(),
        source : req.body.source,
        type : req.body.type,
        message : req.body.message,
        action : req.body.action,
        read : req.body.read
    }
    //console.log(notificaiton)

    Notification.find({ user : req.body.user })
    .then( (notificaitons) => {
        if(notificaitons.length > 0)
        {
            notificaitons[0].notifications.push(notificaiton)
            Notification.updateOne({ user : req.params.user }, ({ notifications : notificaitons[0].notifications}))
            .then( () => {
                res.status(200).json({ message : "Notification Ajoutée." });
            })
            .catch( (error) => {
                res.status(400).json({ error: error });
            });
        }
        else
        {
            addUserNotification(req, res, next)
        }
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};



exports.updateUserNotificationRead = (req, res, next) => {

    Notification.find({ user : req.params.user })
    .then( (notifications) => {
        if(notifications.length > 0)
        {
            notifications[0].notifications.forEach((val, i, arr)=> {
                if(item._id==req.params.id)
                    arr[i].read=1
            })
            Notification.updateOne({ user : req.params.user }, ({ notifications :  notifications[0].notifications}))
            .then( () => {
                res.status(200).json({ message : "Notification Ajoutée." });
            })
            .catch( (error) => {
                res.status(400).json({ error: error });
            });
        }
        else
        {
            res.status(400).json({ error: "not-notif-found-for-this-user" });
        }
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });  
};


exports.getUserNotifications = (req, res, next) => {

    Notification.find({ user : req.params.user })
    .then( (notificaitons) => {
        console.log(notificaitons)
        res.status(200).json(notificaitons);
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });
};




