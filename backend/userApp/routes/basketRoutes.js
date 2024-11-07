const express = require('express');
const router = express.Router();
const basketCtrl = require('../controllers/basketController');


//Basket route
router.get('/get/:user', basketCtrl.getBasketProducts);
//router.post('/add/:user', basketCtrl.addBasketProduct);
router.post('/update/:user', basketCtrl.updateBasketProduct);
router.put('/remove/:user', basketCtrl.removeBasketProduct);


module.exports = router;