const { ObjectId } = require('mongodb');
const connection = require('./connection');

const RECIPES = 'recipes';

const adicionarReceita = async (_id, name, ingredients, preparation) => {
  const userId = _id;
  const result = await connection().then((db) =>
    db.collection(RECIPES).insertOne({ userId, name, ingredients, preparation }),
  );

  return result.ops[0];
};

const getAll = async () => connection().then((db) => db.collection(RECIPES).find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error();
  return connection().then((db) => db.collection(RECIPES).findOne(ObjectId(id)));
};

const update = async (id, name, ingredients, preparation) => {
  if (!(await getById(id))) throw new Error();

  await connection().then((db) =>
    db
      .collection(RECIPES)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }),
  );
};

const deleteRecipe = async (id) => {
  if (!(await getById(id))) throw new Error();

  await connection().then((db) => db.collection(RECIPES).deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getById,
  getAll,
  update,
  adicionarReceita,
  deleteRecipe,
};
