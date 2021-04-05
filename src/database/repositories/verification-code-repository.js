const { client } = require("../index");
const database = "PruebaMongo";
const collection = "VerificationCodes";

const create = (verificationCode) => {
  client.connect(async (err) => {
    const collectionResult = client.db(database).collection(collection);

    await collectionResult.insertOne(verificationCode);
  });
};

const find = async (verificationNumber) => {
  await client.connect();

  const collectionResult = client.db(database).collection(collection);

  return await collectionResult.findOne({
    verificationNumber: +verificationNumber,
  });
};

const inactivate = async (verificationCode) => {
  await client.connect();

  const collectionResult = client.db(database).collection(collection);

  await collectionResult.updateOne(
    {
      verificationNumber: +verificationCode,
    },
    { $set: { status: 2 } }
  );
};

module.exports = { create, find, inactivate };
