const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://titin:194673852@mongocluster.mf2df.mongodb.net/PruebaMongo?retryWrites=true&w=majority";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { client };
