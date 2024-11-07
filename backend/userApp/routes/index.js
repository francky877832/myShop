const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const productRoutes = require('./productRoutes');
const commentRoutes = require('./commentRoutes');
const offerRoutes = require('./offerRoutes');
const preferenceRoutes = require('./preferenceRoutes');
const favouritesRoutes = require('./favouritesRoutes');
const complaintRoutes = require('./complaintRoutes');
const notificaitonRoutes = require('./notificaitonRoutes');
const basketRoutes = require('./basketRoutes');
const searchRoutes = require('./searchRoutes');
const orderRoutes = require('./orderRoutes');
const categoryRoutes = require('./categoryRoutes');
const brandRoutes = require('./brandRoutes');
const pointsRoutes = require('./pointsHistoryRoutes')
const giftHistoryRoutes = require('./giftHistoryRoutes')

//router.use('/products', auth,  productRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
router.use('/offers', offerRoutes);
router.use('/preferences', preferenceRoutes);
router.use('/favourites', favouritesRoutes);
router.use('/complaints', complaintRoutes);
router.use('/notifications', notificaitonRoutes);
router.use('/basket', basketRoutes);
router.use('/search', searchRoutes);
router.use('/orders', orderRoutes);
router.use('/points', pointsRoutes);
router.use('/gift', giftHistoryRoutes);


module.exports = router;


