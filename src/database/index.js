const MongoClient = require("mongodb").MongoClient;
const url = "";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { client };
