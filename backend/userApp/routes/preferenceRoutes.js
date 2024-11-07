const express = require('express');
const router = express.Router();

const prefCtrl = require('../controllers/preferenceController');


//Preferences route
router.get('/get/:id', prefCtrl.getUserPreferences);
router.post('/add', prefCtrl.addUserPreferences);
router.put('/update', prefCtrl.updateUserPreferences);

module.exports = router;