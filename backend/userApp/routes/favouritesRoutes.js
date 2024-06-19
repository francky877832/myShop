const express = require('express');
const router = express.Router();

const favCtrl = require('../controllers/favouriteController');


//Favourite route
router.get('/get', favCtrl.getUserLikedProducts);
router.post('/add', favCtrl.addUserLikedProducts);
router.put('/update', favCtrl.updateUserLikedProducts);
router.put('/remove', favCtrl.removeUserLikesProduct);

module.exports = router;