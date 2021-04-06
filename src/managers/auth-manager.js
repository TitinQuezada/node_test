const userRpository = require("../database/repositories/user-repository");
const encriptService = require("../services/encript-service");
const operationResult = require("../utils/operation-result");
const jwt = require("jsonwebtoken");

const auth = async (email, password) => {
  const user = await userRpository.find(email);

  if (user?.password === encriptService.encript(password)) {
    const token = buildToken(user);
    return operationResult.ok(token);
  }

  return operationResult.fail("Correo electronico o contraseña incorrecto");
};

const buildToken = (user) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
      data: { email: user.email, rolId: user.rolId },
    },
    process.env.JWT_SECRET_KEY
  );
};

module.exports = { auth };
