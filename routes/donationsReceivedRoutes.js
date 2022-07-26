const express = require('express');
const router = express.Router();
const donationsReceived = require('../controllers/donationsReceivedController');

router.get('/', donationsReceived.getAllReceivedDonations);

module.exports =  router;