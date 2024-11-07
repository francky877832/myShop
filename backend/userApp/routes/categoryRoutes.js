const express = require('express');
const router = express.Router();

//apres le middleware auth
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const catCtrl = require('../controllers/categoryController');



router.get('/get', catCtrl.getCategories);

module.exports = router;