const express = require('express');
const router = express.Router();

const notificaitonCtrl = require('../controllers/notificationController');


//Notification route
router.get('/get', notificaitonCtrl.getUserNotifications);
router.post('/add', notificaitonCtrl.addUserNotification);
router.put('/read/:id', notificaitonCtrl.updateUserNotificationRead);

module.exports = router;