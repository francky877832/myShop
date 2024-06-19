const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');


//Basket route
router.get('/get/:user', orderCtrl.getOrderUser);
router.post('/add', orderCtrl.addOrderUser);
router.put('/update/:id', orderCtrl.updateOrderUser);
router.delete('/remove/:id', orderCtrl.removeOrderUser);


module.exports = router;


