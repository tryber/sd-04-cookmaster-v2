const router = require('express').Router();
const crudModel = require('../models/crudModel');
const middlewares = require('../middlewares/validateUsers');
const auth = require('../auth/validateJWT');

router.post('/',
  middlewares.verifyEntries,
  middlewares.validateEmail,
  middlewares.verifyIfUserExistsByEmail,
  async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    const user = await crudModel.createOne('users', { name, email, password, role });
    res.status(201).json({ user });
  });

router.post('/admin',
  auth.validateLogin,
  auth.validateJWT(),
  middlewares.validateAdmin,
  middlewares.verifyEntries,
  middlewares.validateEmail,
  middlewares.verifyIfUserExistsByEmail,
  async (req, res) => {
    const { body } = req;
    body.role = 'admin';
    const user = await crudModel.createOne('users', body);
    res.status(201).json({ user });
  });

module.exports = router;
