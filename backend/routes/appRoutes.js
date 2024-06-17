const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const prodCtrl = require('../controllers/productController');
const prefCtrl = require('../controllers/preferenceController');
const favCtrl = require('../controllers/favouriteController');
const searchCtrl = require('../controllers/searchHistoryController');


router.get('/products', prodCtrl.getAllProduct);
router.get('/products/search', prodCtrl.getSearchedProducts);
router.get('/product/likes/get/:id', prodCtrl.getProductNumLikes);
router.get('/categories/products', prodCtrl.getProductsFromCategories);
router.get('/product/:id', prodCtrl.getOneProduct);

router.post('/product', prodCtrl.createProduct);
router.put('/product/:id', prodCtrl.updateProduct);
router.put('/product/likes/update/:id', prodCtrl.updateProductNumLikes);
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
router.post('/preferences/add', prefCtrl.addUserPreferences);
router.put('/preferences/update', prefCtrl.updateUserPreferences);

//Favourite route
router.get('/favourites/get', favCtrl.getUserLikedProducts);
router.post('/favourites/add', favCtrl.addUserLikedProducts);
router.put('/favourites/update', favCtrl.updateUserLikedProducts);
router.put('/favourites/delete', favCtrl.removeUserLikesProduct);

//Search History route
router.post('/search/history/add', searchCtrl.addSimpleSearchHistory);
router.put('/search/history/update', searchCtrl.updateSimpleSearchHistory);
router.put('/search/history/remove', searchCtrl.removeSimpleSearchHistory);

module.exports = router;