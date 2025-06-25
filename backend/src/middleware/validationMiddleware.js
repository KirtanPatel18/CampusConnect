const { body, validationResult } = require('express-validator');

// Validation rules for registration
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('full_name')
    .notEmpty()
    .withMessage('Full name is required')
];

// Validation rules for login
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Middleware to handle validation result
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  handleValidationErrors
};
