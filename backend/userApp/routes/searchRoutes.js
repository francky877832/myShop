const express = require('express');
const router = express.Router();

const searchCtrl = require('../controllers/searchHistoryController');



//Search History route
//router.post('/history/add/:user', searchCtrl.addSimpleSearchHistory);
router.get('/history/get/:user', searchCtrl.getSimpleSearchHistory);
router.post('/history/update/:user', searchCtrl.updateSimpleSearchHistory);
router.put('/history/remove/:user', searchCtrl.removeSimpleSearchHistory);
router.put('/history/removeAll/:user', searchCtrl.removeAllSimpleSearchHistory);

module.exports = router;