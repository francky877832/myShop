const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');


//Basket route
router.get('/get/:user', orderCtrl.getUserOrders);
router.get('/admin/get/:orderNo', orderCtrl.getOrderFromAdmin);

router.post('/add', orderCtrl.addUserOrder);
router.put('/update/update-payment-status', orderCtrl.updatePaymentStatus);
router.put('/update/read/:id', orderCtrl.updateOrderRead);
router.put('/update/status/:id', orderCtrl.updateOrderStatus);

router.delete('/remove/:id', orderCtrl.removeOrderUser);


module.exports = router;


