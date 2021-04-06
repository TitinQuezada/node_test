const encriptService = require("../services/encript-service");
const emailService = require("../services/email-service");
const statuses = require("../enums/statuses");

const userRepository = require("../database/repositories/user-repository");
const verificationCodeRepository = require("../database/repositories/verification-code-repository");
const generator = require("../utils/generator");
const operationResult = require("../utils/operation-result");

const add = async (user) => {
  try {
    const userToCreate = {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      sex: user.sex,
      birtday: user.birtday,
      password: encriptService.encript(user.password),
      rolId: user.rolId,
      status: statuses.inactive,
    };

    await userRepository.create(userToCreate);

    const verificationNumber = generator.generateVerificationNumber();

    await emailService.sendVerifyEmail(user.email, verificationNumber);

    await verificationCodeRepository.create({
      email: user.email,
      verificationNumber,
      status: statuses.active,
    });

    return operationResult.ok();
  } catch (error) {
    return operationResult.fail();
  }
};

const activateUser = async (email, verificationNumber) => {
  try {
    const verificationCode = await verificationCodeRepository.find(
      verificationNumber
    );

    if (verificationCode?.status === statuses.active) {
      await verificationCodeRepository.inactivate(verificationNumber);
      await userRepository.activate(email);
      return operationResult.ok();
    } else {
      return operationResult.fail("Este link ha expirado");
    }
  } catch (error) {
    return operationResult.fail();
  }
};

module.exports = {
  add,
  activateUser,
};
