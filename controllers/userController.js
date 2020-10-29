const userServices = require('../services/userServices');

const newUserMiddleware = async (req, res, _next) => {
  try {
    const resultOfInsertion = await userServices.inserNewUser(req.body);
    const { message } = resultOfInsertion;

    if (message && message.includes('Invalid')) {
      return res.status(400).json(resultOfInsertion);
    }
    if (message && message.includes('already')) {
      return res.status(409).json(resultOfInsertion);
    }

    res.status(201).json(resultOfInsertion);
  } catch (error) {
    res.status(500).json({ message: '' });
  }
};

module.exports = {
  newUserMiddleware,
};
