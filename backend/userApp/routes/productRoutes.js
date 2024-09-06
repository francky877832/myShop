const express = require('express');
const router = express.Router();

//apres le middleware auth
const auth = require('../middlewares/auth');
const {productsUserApp, userUserApp} = require('../middlewares/multer-config');

const prodCtrl = require('../controllers/productController');



router.get('/get', prodCtrl.getProducts);
router.get('/get/user/:user', prodCtrl.getProductsUser);
router.get('/search', prodCtrl.getSearchedProducts);
router.get('/likes/get/:id', prodCtrl.getProductNumLikes);
router.get('/categories', prodCtrl.getProductsFromCategories);
router.get('/get/:id', prodCtrl.getProduct);

router.post('/product-sold', prodCtrl.productHasBeenSold);
router.post('/update-views', prodCtrl.updateProductViews);
router.post('/add', productsUserApp.array('images', 6), prodCtrl.addProductUser);
router.put('/update/:id', productsUserApp.array('imagesToUpload', 6), prodCtrl.updateProduct);
router.put('/likes/update/:id', prodCtrl.updateProductNumLikes);
router.delete('/remove/:id', prodCtrl.removeProduct);

module.exports = router;