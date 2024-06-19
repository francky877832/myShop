const express = require('express');
const router = express.Router();
const basketCtrl = require('../controllers/basketController');


//Basket route
router.get('/get/:id', basketCtrl.getBasketProducts);
router.post('/add', basketCtrl.addBasketProduct);
router.put('/update/:user', basketCtrl.updateBasketProduct);
router.put('/remove/:user', basketCtrl.removeBasketProduct);


module.exports = router;