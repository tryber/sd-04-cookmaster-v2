const connection = require('./connection');

// const { ObjectId } = require('mongodb');

const addUser = async (name, email, password, role) =>
  connection()
    .then((db) => db.collection('users').insertOne({ name, email, password, role }))
    .then((result) => ({ name, email, role, _id: result.insertedId }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

/**
 * Busca um usuário através do seu email e, se encontrado, retorna-o.
 * @param {string} email Email do usuário a ser encontrado
 */
const findByEmail = async (email) =>
  connection()
    .then((db) => db.collection('users').findOne({ email }))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

// /**
//  * Busca um usuário através do seu ID
//  * @param {string} idParam ID do usuário
//  */
// const findById = async (idParam) => {
//   const db = await connection();
//   const table = await db.getTable('users');
//   const result = await table.select([])
//.where('id = :param_id').bind('param_id', idParam).execute();
//   const user = result.fetchOne();
//   const [id, email, password, firstName, lastName] = user;
//   return { id, email, password, firstName, lastName };
// };
// /**
//  * Adiciona um usuário
//  * @param {string} email Email do usuário
//  * @param {string} password Password do usuário
//  * @param {string} firstName Primeiro nome do usuário
//  * @param {string} lastName Sobrenome do usuário
//  */

// /**
//  * Deleta um usuário através do seu ID
//  * @param {string} idParam ID do usuário
//  */
// const deleteUser = async (idParam) => {
//   const db = await connection();
//   const table = await db.getTable('users');
//   const result = await table.delete()
//.where('id = :param_id').bind('param_id', idParam).execute();
//   return result.getWarningsCount();
// };

// const updateUser = async (id, email, password, firstName, lastName) => {
//   const db = await connection();
//   const table = await db.getTable('users');
//   const result = await table
//     .update()
//     .set('first_name', firstName)
//     .set('last_name', lastName)
//     .set('email', email)
//     .set('password', password)
//     .where('id = :param_id')
//     .bind('param_id', id)
//     .execute();
//   return result.getWarningsCount();
// };

module.exports = {
  addUser,
  findByEmail,
  // findById,
  // deleteUser,
  // updateUser,
};
