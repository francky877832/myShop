const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const prodCtrl = require('../controllers/productController');
const prefCtrl = require('../controllers/preferenceController');

router.get('/products', prodCtrl.getAllProduct);
router.get('/product/:id', prodCtrl.getOneProduct);
router.post('/product', prodCtrl.createProduct);
router.put('/product/:id', prodCtrl.modifyProduct);
router.delete('/product/:id', prodCtrl.deleteProduct);
/*
router.get('/', auth, prodCtrl.getAllStuff);
router.post('/', auth, prodCtrl.createThing);
router.get('/:id', auth, prodCtrl.getOneThing);
router.put('/:id', auth, prodCtrl.modifyThing);
router.delete('/:id', auth, prodCtrl.deleteThing);
*/

//Preferences route
router.get('/preferences/get/:id', prefCtrl.getUserPreferences);
router.post('/preferences/add/:id', prefCtrl.addUserPreferences);
router.put('/preferences/modify/:id', prefCtrl.modifyUserPreferences);


module.exports = router;