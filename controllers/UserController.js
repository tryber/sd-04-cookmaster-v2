const userModel = require('../model/UserModel');

const create = async (request, response) => {
  console.log("felipe");
  const { name, email, password } = request.body;
  const emailR = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const testRegex = emailR.test(email);
  console.log("felipe");
  if (!name || !email || !password || !testRegex) {
    return response.status(400).send({ message: 'Invalid entries. Try again.' });
  }

  userModel
    .create({ name, email, password, role: "user" })
    .then((result) => response.status(201).send({user: result}))
    .catch((err) =>
      response.status(409).send({ message: err.message }));
};

module.exports = { create };
