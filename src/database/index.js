const MongoClient = require("mongodb").MongoClient;
const url = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@mongocluster.mf2df.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { client };
