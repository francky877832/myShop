const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const prodCtrl = require('../controllers/productController');

router.get('/', prodCtrl.getAllProduct);
router.post('/', prodCtrl.createProduct);
router.get('/:id', prodCtrl.getOneProduct);
router.put('/:id', prodCtrl.modifyProduct);
router.delete('/:id', prodCtrl.deleteProduct);
/*
router.get('/', auth, prodCtrl.getAllStuff);
router.post('/', auth, prodCtrl.createThing);
router.get('/:id', auth, prodCtrl.getOneThing);
router.put('/:id', auth, prodCtrl.modifyThing);
router.delete('/:id', auth, prodCtrl.deleteThing);
*/
module.exports = router;