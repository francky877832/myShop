const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryController');


//Category route
router.get('/get', categoryCtrl.getCategories);
router.post('/add', categoryCtrl.addCategory);
router.post('/addMultiple', categoryCtrl.addMultipleCategories);
router.put('/update/:user', categoryCtrl.updateCategory);
router.put('/remove/:user', categoryCtrl.removeCategory);


module.exports = router;