const { Router } = require('express');
const crudModel = require('../models/crudModel');
const validations = require('../middlewares/validateUsers');
const auth = require('../middlewares/JWT');

const userRouter = Router();

userRouter.post('/', validations.validCreateUser, validations.emailValidator, async (req, res) => {
  const data = req.body;
  data.role = 'user';

  const userCreate = await crudModel.createUserModel('user', data);

  return res.status(201).json(userCreate);
});

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
