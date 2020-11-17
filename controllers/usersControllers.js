const express = require('express');
const crudModel = require('../models/crudModel');
const validations = require('../middlewares/validateUsers');
const auth = require('../middlewares/JWT');

const userRouter = express.Router();

userRouter.post(
  '/',
  validations.verifyEntries,
  validations.validateEmail,
  validations.verifyIfUserExistsByEmail,
  async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    const user = await crudModel.createOne('users', { name, email, password, role });
    res.status(201).json({ user });
  },
);

userRouter.post(
  '/admin',
  auth.validateLogin,
  auth.validateJWT(),
  validations.validateAdmin,
  validations.verifyEntries,
  validations.validateEmail,
  validations.verifyIfUserExistsByEmail,
  async (req, res) => {
    const { body } = req;
    body.role = 'admin';
    const user = await crudModel.createOne('users', body);
    res.status(201).json({ user });
  },
);

module.exports = userRouter;
