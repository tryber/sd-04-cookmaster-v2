const yup = require('yup');

const schemaAdd = yup.object().shape({
  name: yup
    .string()
    .typeError('Invalid entries. Try again.')
    .required('Invalid entries. Try again.'),
  email: yup.string().email('Invalid entries. Try again.').required('Invalid entries. Try again.'),
  password: yup
    .string()
    .required('Invalid entries. Try again.')
    .typeError('Invalid entries. Try again.'),
});

const schemaLogin = yup.object().shape({
  email: yup.string().email('Incorrect username or password').required('All fields must be filled'),
  password: yup
    .string()
    .required('All fields must be filled')
    .typeError('Incorrect username or password'),
});

const schemaRecipe = yup.object().shape({
  name: yup.string().required('Invalid entries. Try again.'),
  ingredients: yup.string().required('Invalid entries. Try again.'),
  preparation: yup.string().required('Invalid entries. Try again.'),
});

module.exports = {
  schemaAdd,
  schemaLogin,
  schemaRecipe,
};
