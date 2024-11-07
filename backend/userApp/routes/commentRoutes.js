const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentController');



//Comment route
router.get('/get/:id', commentCtrl.getProductComments);
router.get('/get/last/:id', commentCtrl.getUserProductLastComment);
router.post('/add/:id?', commentCtrl.updateProductComment);
router.put('/validate/:id', commentCtrl.validateProductComment);
router.delete('/remove/:id', commentCtrl.removeProductComment);

module.exports = router;