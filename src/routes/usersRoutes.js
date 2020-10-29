const express = require('express');
const usersController = require('../controllers/usersController');
const userValidations = require('../middlewares/userValidations');

const router = express.Router();

router.post(
  '/',
  userValidations.requiredFieldsExists,
  userValidations.emailIsValid,
  userValidations.userExists,
  usersController.insertUser,
);

module.exports = router;
