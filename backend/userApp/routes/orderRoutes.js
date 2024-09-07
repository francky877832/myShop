const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');


//Basket route
router.get('/get/:user', orderCtrl.getOrdersUser);

router.post('/add', orderCtrl.addOrderUser);
router.put('/update/read/:id', orderCtrl.updateOrderRead);
router.put('/update/status/:id', orderCtrl.updateOrderStatus);

router.delete('/remove/:id', orderCtrl.removeOrderUser);


module.exports = router;


