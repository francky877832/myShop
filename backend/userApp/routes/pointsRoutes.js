
const express = require('express');
const router = express.Router();

const pointsCtrl = require('../controllers/pointsController');


router.get('/leaderboard', pointsCtrl.getMonthlyLeaderboard);
router.get('/user/:userId', pointsCtrl.getUserPointsHistory);

router.post('/add', pointsCtrl.addPoints);



module.exports = router;