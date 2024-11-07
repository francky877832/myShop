const express = require('express');
const router = express.Router();

const favCtrl = require('../controllers/favouriteController');


const rateLimit = require('express-rate-limit');

const likeLimiter = rateLimit({
    windowMs: 1000, // 10 seconds
    max: 2, // Limit each user to 1 like/unlike request per windowMs
    message: "Trop de demandes de like/délike, veuillez réessayer plus tard."
});

//app.post('/api/products/:id/like', likeLimiter, updateProductNumLikes);


//Favourite route
router.get('/get/:user', favCtrl.getUserLikedProducts);
//router.post('/add/:user', favCtrl.addUserLikedProducts);
router.post('/update/:user', likeLimiter, favCtrl.updateUserLikedProducts);
router.put('/remove/:user', likeLimiter,  favCtrl.removeUserLikesProduct);

module.exports = router;