const yup = require('yup');

const schemaAdd = yup.object().shape({
  name: yup
    .string()
    .typeError('Invalid entries. Try again.')
    .required('Invalid entries. Try again.'),
  email: yup.string().email('Invalid entries. Try again.').required('Invalid entries. Try again.'),
  password: yup
    .string()
    .typeError('Invalid entries. Try again.')
    .required('Invalid entries. Try again.'),
});

const schemaLogin = yup.object().shape({
  email: yup.string().email('Incorrect username or password').required('All fields must be filled'),
  password: yup
    .string()
    .typeError('Incorrect username or password')
    .required('All fields must be filled'),
});

module.exports = {
  schemaAdd,
  schemaLogin,
};
