const { client } = require("../index");
const database = "PruebaMongo";
const collection = "Users";

let controller = {};

controller.create = async (user) => {
  await client.connect();

  const collectionResult = client.db(database).collection(collection);

  console.log("prueba");
  await collectionResult.insertOne(user);
};

controller.activate = async (email) => {
  await client.connect();

  const collectionResult = client.db(database).collection(collection);

  await collectionResult.updateOne(
    {
      email: email,
    },
    { $set: { status: 1 } }
  );
};

module.exports = controller;
