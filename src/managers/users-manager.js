const encriptService = require("../services/encript-service");
const emailService = require("../services/email-service");
const statuses = require("../enums/statuses");

const userRepository = require("../database/repositories/user-repository");
const verificationCodeRepository = require("../database/repositories/verification-code-repository");

const add = async ({
  email,
  name,
  lastname,
  sex,
  birtday,
  password,
  rolId,
}) => {
  const userToCreate = {
    email,
    name,
    lastname,
    sex,
    birtday,
    password: encriptService.encript(password),
    rolId,
    status: statuses.inactive,
  };

  userRepository.create(userToCreate);

  const verificationNumber = getVerificationNumber();

  await emailService.sendVerifyEmail(email, verificationNumber);

  verificationCodeRepository.create({
    email,
    verificationNumber,
    status: statuses.active,
  });
};

const getVerificationNumber = () => {
  const maxNumber = 999999;
  const minNumber = 100000;

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};

const activateUser = async (email, verificationNumber) => {
  const verificationCode = await verificationCodeRepository.find(
    verificationNumber
  );

  if (verificationCode?.status === statuses.active) {
    await verificationCodeRepository.inactivate(verificationNumber);
    await userRepository.activate(email);
  }
};

module.exports = {
  add,
  activateUser,
};
