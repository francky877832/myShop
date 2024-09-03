
const express = require('express');
const router = express.Router();

const pointsCtrl = require('../controllers/pointsHistoryController');

router.get('/user/:userId', pointsCtrl.getUserPointsHistory);
router.get('/leaderboard', pointsCtrl.getMonthlyLeaderboard);
router.post('/add', pointsCtrl.addPointsHistory);



module.exports = router;