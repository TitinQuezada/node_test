const sha256 = require("sha256");

const encript = (text) => {
  return sha256(text);
};

module.exports = { encript };
