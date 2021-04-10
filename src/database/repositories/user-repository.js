const statuses = require("../../enums/statuses");
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

controller.update = async (user) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  await collectionResult.updateOne(
    {
      email: user.email,
    },
    {
      $set: {
        name: user.name,
        lastname: user.lastname,
        sex: user.sex,
        birtday: user.birtday,
        rolId: user.rolId,
        status: user.status,
      },
    }
  );

  controller.delete = async (email) => {
    await collectionResult.updateOne(
      {
        email: email,
      },
      {
        $set: {
          status: statuses.inactive,
        },
      }
    );
  };
};

module.exports = controller;
