const express = require('express');
const router = express.Router();
const prodCtrl = require('../controllers/productController');



router.get('/get', prodCtrl.getProducts);
router.get('/search', prodCtrl.getSearchedProducts);
router.get('/likes/get/:id', prodCtrl.getProductNumLikes);
router.get('/categories', prodCtrl.getProductsFromCategories);
router.get('/:id', prodCtrl.getProduct);

router.post('/add', prodCtrl.createProduct);
router.put('/update/:id', prodCtrl.updateProduct);
router.put('/likes/update/:id', prodCtrl.updateProductNumLikes);
router.delete('/remove/:id', prodCtrl.removeProduct);

module.exports = router;