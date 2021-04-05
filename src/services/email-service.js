const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(
  "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"
);
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
