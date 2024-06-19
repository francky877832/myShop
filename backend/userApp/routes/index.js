const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const productRoutes = require('./productRoutes');
const commentRoutes = require('./commentRoutes');
const offerRoutes = require('./offerRoutes');
const preferenceRoutes = require('./preferenceRoutes');
const favouritesRoutes = require('./favouritesRoutes');
const complaintRoutes = require('./complaintRoutes');
const notificaitonRoutes = require('./notificaitonRoutes');
const basketRoutes = require('./basketRoutes');
const searchRoutes = require('./searchRoutes');


//router.use('/products', auth,  productRoutes);

router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
router.use('/offers', offerRoutes);
router.use('/preferences', preferenceRoutes);
router.use('/favourites', favouritesRoutes);
router.use('/complaints', complaintRoutes);
router.use('/notifications', notificaitonRoutes);
router.use('/basket', basketRoutes);
router.use('/search', searchRoutes);


module.exports = router;


