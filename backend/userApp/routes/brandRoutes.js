const express = require('express');
const router = express.Router();

//apres le middleware auth
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const brandCtrl = require('../controllers/brandController');



router.get('/get', brandCtrl.getBrands);

module.exports = router;