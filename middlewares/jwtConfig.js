const tokenConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const secret = 'myProjectSecretPass';

module.exports = {
  tokenConfig,
  secret,
};
