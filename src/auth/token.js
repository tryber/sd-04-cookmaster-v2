const JWT = require('jsonwebtoken');
const { ERR_INVALID_TOKEN } = require('../utils/errorTypes');
const secretKey = require('./secretKey');

const generate = (payload) =>
  new Promise((resolve) => {
    JWT.sign(
      payload,
      secretKey,
      {
        algorithm: 'HS256',
      },
      (err, token) => {
        if (err) {
          throw new Error(ERR_INVALID_TOKEN);
        }

        resolve(token);
      },
    );
  });

module.exports = {
  generate,
};
