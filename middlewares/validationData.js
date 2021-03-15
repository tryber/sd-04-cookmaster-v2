const isEmailFormatValid = (email) => email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const existsField = (arrField) => arrField.every((field) => field && field !== '');

const checkUser = (bodyData) => {
 const { name, email, password } = bodyData;
 return existsField([ name, email, password]) && isEmailFormatValid(email);
};

const checkLogin = (bodyData) => {
  const { email, password } = bodyData;
  return existsField([ email, password]);
};

const checkRecipe = (bodyData) => {
  const { name, ingredients, preparation } = bodyData;
 return existsField([ name, ingredients, preparation]);
};

const validationFields = (req, res, next) => {
  let message = 'Invalid entries. Try again.';
  let statusCode = 400;
  let isValid;

  switch (req.baseUrl) {
    case '/users': isValid = checkUser(req.body); break;
    case '/login':
      isValid = checkLogin(req.body);
      message = 'All fields must be filled';
      statusCode = 401;
    break;
    case '/recipes': isValid = checkRecipe(req.body); break
  };

  if(!isValid) return res.status(statusCode).json({ message });

  return next();
};

module.exports = {
  validationFields,
};
