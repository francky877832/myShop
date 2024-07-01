const express = require('express');
const router = express.Router();

//apres le middleware auth
const auth = require('../middlewares/auth');
const Seeder = require('../seed/seedProducts')


router.get('/seedProduct',Seeder.seedProducts)

module.exports = router;
