const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');


//User Route
router.post('/signup', userCtrl.signupUser);
router.post('/login', userCtrl.loginUser);
router.get('/users/get/:id', userCtrl.getUser);


module.exports = router;