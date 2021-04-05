const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey("");
const senderEmail = "joanmanueltitin@gmail.com";

const sendVerifyEmail = async (email, verifyCode) => {
  const msg = {
    to: email,
    from: senderEmail,
    subject: "Verificacion de correo electronico",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>verification code ${verifyCode}</strong>`,
  };

  await sendGrid.send(msg);
};

module.exports = {
  sendVerifyEmail,
};
