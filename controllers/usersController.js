const { Router } = require('express');
const { create } = require('../models');
const {
  verifyRegisterFields, verifyUserByEmail, validateEmail, validateAdminNewRegister,
} = require('../middlewares');
const { verifyToken, validateToken } = require('../auth');

const router = Router();

router.post('/',
  verifyRegisterFields,
  verifyUserByEmail,
  validateEmail,
  async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;

    const user = await create('users', { name, email, password, role });

    res.status(201).json({ user });
  });

router.post('/admin',
  verifyToken,
  validateToken(),
  validateAdminNewRegister,
  verifyRegisterFields,
  verifyUserByEmail,
  validateEmail,
  async (req, res) => {
    const { body } = req;
    console.log('body',body);
    body.role = 'admin';

    const user = await create('users', body);

    res.status(201).json({ user });
  });

module.exports = router;
