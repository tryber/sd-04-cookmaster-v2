const userServices = require('../services/userServices');

// const SERVER_ERR_MESSAGE = { message: 'Server error. Sorry!' };

const isError = (object, text) => object && object.includes(text);

const loginMiddleware = async (req, res, _next) => {
  try {
    const loginResult = await userServices.loginOperation(req.body);
    const message = (loginResult && loginResult.message) ? loginResult.message : null;
    if (isError(message, 'All fields') || isError(message, 'Incorrect')) {
      return res.status(401).json(loginResult);
    }
    const token = await userServices.searchUserAndGenerateToken(req.body.email);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newUserMiddleware = async (req, res, _next) => {
  try {
    const resultOfInsertion = await userServices.inserNewUser(req.body);
    const { message } = resultOfInsertion;

    if (isError(message, 'Invalid')) {
      return res.status(400).json(resultOfInsertion);
    }
    if (isError(message, 'already')) {
      return res.status(409).json(resultOfInsertion);
    }

    res.status(201).json(resultOfInsertion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  loginMiddleware,
  newUserMiddleware,
};
