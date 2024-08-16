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
            notificaitons[0].notifications.unshift(notificaiton)
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
    console.log(req.params)
    Notification.find({ user : req.params.user })
    .then( (notifications) => {
        if(notifications.length > 0)
        {
           
            notifications[0].notifications.forEach((val, i, arr)=> {
                if(val._id==req.params.id)
                    arr[i].read=1
            })
           
            Notification.updateOne({ user : req.params.user }, ({ notifications :  notifications[0].notifications}))
            .then( () => {
                res.status(200).json({ message : "Notification Ajoutée." });
            })
            .catch( (error) => {
                console(error)
                res.status(400).json({ error: error });
            });
        }
        else
        { //console.log("OK")
            res.status(400).json({ error: "not-notif-found-for-this-user" });
        }
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });  
};


exports.getUserNotifications = (req, res, next) => {
    console.log("notification")
    const page = parseInt(req.query.page) || 1; // Page actuelle, par défaut 1
    const limit = parseInt(req.query.limit) || 3; // Nombre d'éléments par page, par défaut 20
    const skip = (page - 1) * limit;

    Notification.find({ user : req.params.user }).sort({_id:-1}).exec()
    .then(async (notifications) => {
        console.log(notifications)
        const totalDatas = await Notification.countDocuments({ user : req.params.user }).exec();
        const totalPages = Math.ceil(totalDatas / limit);
        res.status(200).json({notifications:notifications[0].notifications.slice(skip, skip+limit), page:page,totalPages:totalPages,totalDatas:totalDatas});
    })
    .catch( (error) => {
        console.log(error)
        res.status(400).json({ error: error });
    });
};




