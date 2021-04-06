const jsonwebtoken = require("jsonwebtoken");
const httpStatusCodes = require("../enums/http-status-codes");
const tokenPosition = 1;

const authorize = ({ headers }, response, next) => {
  try {
    const token = headers.authorization.split(" ");
    const decoded = jsonwebtoken.verify(
      token[tokenPosition],
      process.env.JWT_SECRET_KEY
    );
    if (decoded) {
      next();
    } else {
      return response
        .status(httpStatusCodes.unauthorize)
        .send("token invalido");
    }
  } catch (error) {
    return response
      .status(httpStatusCodes.unauthorize)
      .send("No se ha encontrado el token del usuario");
  }
};

module.exports = authorize;
