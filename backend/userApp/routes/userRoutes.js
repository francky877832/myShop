const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');


//User Route
router.post('/signup', userCtrl.signupUser);
router.get('/login', userCtrl.loginUser);
router.get('/users/get/:id', userCtrl.getUser);
router.post('/users/setFollowers/:user', userCtrl.setUserFollowers);

module.exports = router;