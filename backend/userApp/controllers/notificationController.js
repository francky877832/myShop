const Notification = require('../models/notificationModel');


exports.addUserNotification = (req, res, next) => {
    const notification = new Notification({
        user : req.body.user,
        source : req.body.source,
        type : req.body.type,
        message : req.body.message,
        link : req.body.link,
        read : req.body.read
    })
    notification.save()
    .then( () => {
        res.status(200).json({ message: "Notification ajoutee par plainte" });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};

exports.updateUserNotificationRead = (req, res, next) => {
    Notification.updateOne({ _id : req.params.id }, ({ read : 1 }))
    .then( () => {
        res.status(200).json({ message : "Notification lu." });
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};

exports.getUserNotifications = (req, res, next) => {
    Notification.find({ user : req.body.user })
    .then( (notificaitons) => {
        res.status(200).json(notificaitons);
    })
    .catch( (error) => {
        res.status(400).json({ error: error });
    });
};




