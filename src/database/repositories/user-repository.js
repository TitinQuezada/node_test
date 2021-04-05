const { client } = require("../index");
const database = "PruebaMongo";
const collection = "Users";

const create = (user) => {
  client.connect(async (err) => {
    const collectionResult = client.db(database).collection(collection);

    await collectionResult.insertOne(user);
  });
};

const activate = async (email) => {
  await client.connect();

  const collectionResult = client.db(database).collection(collection);

  await collectionResult.updateOne(
    {
      email: email,
    },
    { $set: { status: 1 } }
  );
};

module.exports = { create, activate };
