const express = require('express');
const router = express.Router();
const { validateRegistration, validateLogin, handleValidationErrors } = require('../middleware/validationMiddleware.js');
const { register, login , logoutUser , checkExistingUser , otpSender , verifyOtp} = require('../controllers/authController.js');

// Register route
router.post('/register',  register);

// Login route
router.post('/login', login);

router.get('/logout', logoutUser);

// check user's existance
router.post('/checkUser' , checkExistingUser)


router.post('/sendOTP' , otpSender);
router.post('/verifyOTP' , verifyOtp);

module.exports = router;
