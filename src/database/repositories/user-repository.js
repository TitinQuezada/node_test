const { client } = require("../index");
const collection = "Users";

const controller = {};

controller.create = async (user) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  await collectionResult.insertOne(user);
};

controller.activate = async (email) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  await collectionResult.updateOne(
    {
      email: email,
    },
    { $set: { status: 1 } }
  );
};

controller.find = async (email) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  return await collectionResult.findOne({
    email,
  });
};

module.exports = controller;
