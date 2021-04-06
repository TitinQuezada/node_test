const generateVerificationNumber = () => {
  const maxNumber = 999999;
  const minNumber = 100000;

  return Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
};

module.exports = { generateVerificationNumber };
