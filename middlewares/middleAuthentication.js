const userModel = require('../models/usersModel');
const validation = require('../middlewares/validations');

const userAuthentication = async (req, res, next) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  // console.log(userEmail + '-' + password);
  // Valida os campos email e password do recipes
  const isError = await validation.fieldsLogin.validate({ userEmail, password });

  if (isError.error) {
    return res.status(401).json({ message: isError.error.message });
  }

  // console.log('password' + password);
  // Verifica se o usuário está cadastrodo no banco
  const existEmail = await userModel.findByEmail(userEmail);
  if (!existEmail) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  // Se o usuário está cadastrado
  // Cria novo objeto para montar a chave JWT
  // Obtên os campos _id, email e role do obejto existEmail
  const { _id, email, role } = existEmail;

  // Construindo novo objeto user
  const user = { id: _id, email, role };

  // Faz a linha 25 e 28
  // const {password, ...user} = existEmail;

  // Passando o objeto para próximo midlleware
  req.user = user;
  next();
};

module.exports = { userAuthentication };
