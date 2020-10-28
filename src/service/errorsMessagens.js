const { HTTPStatus } = require('../config');

const errorMessage = (message) => ({ message });

const errorsMessages = (res, message, code) => {
  switch (code) {
    case 'bad_request':
      return res.status(HTTPStatus.BAD_REQUEST).json(errorMessage(message));
    case 'invalid_data':
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(errorMessage(message));
    case 'not_found':
      return res.status(HTTPStatus.NOT_FOUND).json(errorMessage(message));
    default:
      return res
        .status(HTTPStatus.INTERN_ERROR)
        .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERN_ERROR } });
  }
};

module.exports = errorsMessages;
