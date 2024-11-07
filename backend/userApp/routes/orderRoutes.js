const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderController');


//Basket route
router.get('/get/:user', orderCtrl.getUserOrders);
router.get('/admin/get/:orderNo', orderCtrl.getOrderFromAdmin);

router.post('/add', orderCtrl.addUserOrder);
router.put('/update/update-payment-status', orderCtrl.updatePaymentStatus);
router.put('/update/read', orderCtrl.updateOrderRead);
router.put('/update/status/:id', orderCtrl.updateOrderStatus);
router.put('/admin/update', orderCtrl.updateOrderFromAdmin);


router.delete('/remove/:id', orderCtrl.removeOrderUser);


module.exports = router;


