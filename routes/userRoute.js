const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/', userController.verifyLogin);
router.get('/authentication', userController.isUserLoggedIn);
router.get('/logout', userController.logout);


module.exports = router; 