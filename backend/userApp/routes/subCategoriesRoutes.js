const express = require('express');
const router = express.Router();

const subCategoriesCtrl = require ('../controllers/subCategoriesController');


// subCategories routes

router.get('/get',subCategoriesCtrl.getSubCategories);
router.post('/add',subCategoriesCtrl.addSubCategories);

module.exports = router ;