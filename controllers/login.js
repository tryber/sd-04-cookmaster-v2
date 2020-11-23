const express = require('express');
const validation = require('../middlewares/validations');
const { signToken } = require('../authentication');

const router = express.Router();

router.post(
  '/',
  validation.loginFields,
  validation.login,
  async (req, res) => {
    try {
      const { user } = req;
      const tokenSign = signToken(user);

      return res.status(200).json({ token: tokenSign });
    } catch (_e) {
      res.status(501).json({ message: 'Ops, something went wrong!' });
    }
  },
);

module.exports = router;
