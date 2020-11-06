const express = require('express');
const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userValidation');
const adminAuthorization = require('../middlewares/adminAuthorization');
const tokenAuthorization = require('../middlewares/tokenAuthorization');

const router = express.Router();

router.post('/', userValidation, userController.insertUser);

router.post(
  '/admin',
  tokenAuthorization,
  adminAuthorization,
  userValidation,
  userController.insertUser,
);

module.exports = router;
