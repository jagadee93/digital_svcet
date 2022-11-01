const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
console.log("hey im here ")
router.post('/', authController.handleLogin);

module.exports = router;