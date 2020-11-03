const connection = require('./connection');

const registerRecipe = async (name, ingredients, preparation) => {
  console.log('here is recipe Model', name, ingredients, preparation);
  const result = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation }),
  );
  return result.ops[0];
};

// const findUser = async (username) =>
//   connection().then((db) => db.collection('users').findOne({ username }));

// const findEmail = async (email) => {
//   console.log('userModel is here', email);
//   const result = await connection().then((db) => db.collection('users').findOne({ email }));
//   console.log('result', result);
//   return result;
// };

module.exports = {
  registerRecipe,
  // findUser, findEmail
};
