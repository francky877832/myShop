const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const prodCtrl = require('../controllers/productController');

router.get('/', auth, prodCtrl.getAllStuff);
router.post('/', auth, prodCtrl.createThing);
router.get('/:id', auth, prodCtrl.getOneThing);
router.put('/:id', auth, prodCtrl.modifyThing);
router.delete('/:id', auth, prodCtrl.deleteThing);

module.exports = router;