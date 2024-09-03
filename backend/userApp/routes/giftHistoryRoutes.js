
const express = require('express');
const router = express.Router();

const giftHistoryCtrl = require('../controllers/giftHistoryController');


router.get('/user/:userId', giftHistoryCtrl.getUserGiftHistory);

router.post('/user/add', giftHistoryCtrl.addGift);

module.exports = router;