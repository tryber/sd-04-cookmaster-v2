const express = require('express');
const validation = require('../middlewares/validation');
const token = require('../auth/token');

const router = express.Router();

router.post(
  '/',
  validation.loginFields,
  validation.login,
  async (req, res) => {
    try {
      const user = req.user;
      const tokenSign = token.signToken(user);

      return res.status(200).json({ token });
    } catch (_e) {
      res.status(501).json({ message: 'Ops, something went worng!' });
    }
  },
);

module.exports = router;
