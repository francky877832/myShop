const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentController');



//Comment route
router.get('/get/:id', commentCtrl.getProductComments);
router.post('/add/:product', commentCtrl.addProductComment);
router.put('/validate/:id', commentCtrl.validateProductComment);
router.delete('/remove/:id', commentCtrl.removeProductComment);

module.exports = router;