const { ObjectId } = require('mongodb');
const connection = require('../database/connection');

const create = (user) => {
  console.log('aquii', user);
  return connection()
  .then(async (schema) => {
    const userResp = await schema.collection('users').findOne({ email: user.email });
    if (userResp){
      console.log("gogog");
     throw new Error('Email already registered');
    }
    return schema.collection('users').insertOne(user);
  })
  .then((result) => {
    console.log("fgffg", result);
    return result.ops[0]});
};

module.exports = { create };
