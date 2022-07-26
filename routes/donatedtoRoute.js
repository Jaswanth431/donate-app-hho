const express = require('express');
const donatedtoController = require('../controllers/donatedtoController');


const router = express.Router();

router.post('/',donatedtoController.addDonatedTo );
router.get('/',donatedtoController.getAllDonatedTo);



module.exports = router;