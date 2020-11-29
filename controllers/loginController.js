const { Router } = require('express');
const { createToken } = require('../auth');
const { verifyLoginFields, validateLogin } = require('../middlewares');

const router = Router();

router.post('/',
  verifyLoginFields,
  validateLogin,
  (req, res) => {
    const user = req.user;
    const token = createToken(user);

    res.status(200).json({ token });
  });

module.exports = router;
