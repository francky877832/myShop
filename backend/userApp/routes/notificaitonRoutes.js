const express = require('express');
const router = express.Router();

const notificaitonCtrl = require('../controllers/notificationController');


//Notification route
router.get('/get/:user', notificaitonCtrl.getUserNotifications);
//router.post('/add', notificaitonCtrl.addUserNotification);
router.put('/read/:user/:id', notificaitonCtrl.updateUserNotificationRead);
router.put('/update/:user', notificaitonCtrl.updateUserNotifications);


module.exports = router;