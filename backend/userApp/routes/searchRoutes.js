const express = require('express');
const router = express.Router();

const searchCtrl = require('../controllers/searchHistoryController');



//Search History route
router.post('/history/add', searchCtrl.addSimpleSearchHistory);
router.put('/history/update', searchCtrl.updateSimpleSearchHistory);
router.put('/history/remove', searchCtrl.removeSimpleSearchHistory);

module.exports = router;