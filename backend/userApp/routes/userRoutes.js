const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userController');
const {productsUserApp, userUserApp} = require('../middlewares/multer-config');


//User Route
router.post('/signup', userCtrl.signupUser);
router.get('/login', userCtrl.loginUser);
router.get('/users/get/:id', userCtrl.getUser);
router.get('/users/followers/:id', userCtrl.getUserFollowers);
router.get('/users/referred/:userId', userCtrl.getReferredUsers);

router.put('/users/update/:user', userUserApp.array('profilePicture', 1),  userCtrl.updateUser);
router.post('/users/setFollowers/:user', userCtrl.setUserFollowers);

module.exports = router;