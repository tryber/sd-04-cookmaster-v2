const express = require('express');
const middlewares = require('../middlewares');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/',
  middlewares.validationData.validationFields,
  middlewares.existsEmail.validationExistsEmail,
  userController.add,
);

router.post('/admin',
  middlewares.auth.validationAuth,
  middlewares.userAdmin.validationIsAdmin,
  userController.add,
);

module.exports = router;
