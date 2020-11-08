const router = require('express').Router();
const crudModel = require('../models/crudModel');
const middlewares = require('../middlewares/validateUsers');

router.post('/',
  middlewares.verifyEntries,
  middlewares.validateEmail,
  middlewares.verifyIfUserExistsByEmail,
  async (req, res) => {
    const { name, email, password, role = 'user' } = req.body;
    const user = await crudModel.createOne('users', { name, email, password, role });
    res.status(201).json({ user });
  });

module.exports = router;
