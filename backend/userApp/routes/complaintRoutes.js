const express = require('express');
const router = express.Router();

const complaintCtrl = require('../controllers/complaintController');


//Complaint route
router.post('/add', complaintCtrl.addUserComplaint);
router.get('/get', complaintCtrl.getUserComplaints);

module.exports = router;