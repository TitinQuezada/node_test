const { client } = require("../index");
const collection = "VerificationCodes";

const create = async (verificationCode) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  await collectionResult.insertOne(verificationCode);
};

const find = async (verificationNumber) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  return await collectionResult.findOne({
    verificationNumber: +verificationNumber,
  });
};

const inactivate = async (verificationCode) => {
  await client.connect();

  const collectionResult = client
    .db(process.env.DATABASE)
    .collection(collection);

  await collectionResult.updateOne(
    {
      verificationNumber: +verificationCode,
    },
    { $set: { status: 2 } }
  );
};

module.exports = { create, find, inactivate };
