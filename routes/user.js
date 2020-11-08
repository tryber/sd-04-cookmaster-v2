/** USER ROUTES */

const express = require('express');

const router = express.Router();

const middlewares = require('../middlewares');
const controllers = require('../controllers');

router.post('/users', middlewares.validateUser.data, controllers.userController.newUser);
router.post('/login', middlewares.validateUser.login, controllers.userController.login);

module.exports = router;
