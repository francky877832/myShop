const express = require('express');
const router = express.Router();

const favCtrl = require('../controllers/favouriteController');


//Favourite route
router.get('/get/:user', favCtrl.getUserLikedProducts);
//router.post('/add/:user', favCtrl.addUserLikedProducts);
router.post('/update/:user', favCtrl.updateUserLikedProducts);
router.put('/remove/:user', favCtrl.removeUserLikesProduct);

module.exports = router;