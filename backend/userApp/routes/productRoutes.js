const express = require('express');
const router = express.Router();

//apres le middleware auth
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const prodCtrl = require('../controllers/productController');



router.get('/get', prodCtrl.getProducts);
router.get('/get/user/:user', prodCtrl.getProductsUser);
router.get('/search', prodCtrl.getSearchedProducts);
router.get('/likes/get/:id', prodCtrl.getProductNumLikes);
router.get('/categories', prodCtrl.getProductsFromCategories);
router.get('/:id', prodCtrl.getProduct);

router.post('/add', multer.array('images', 6), prodCtrl.addProductUser);
router.put('/update/:id', multer.array('images', 6), prodCtrl.updateProduct);
router.put('/likes/update/:id', prodCtrl.updateProductNumLikes);
router.delete('/remove/:id', prodCtrl.removeProduct);

module.exports = router;