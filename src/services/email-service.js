const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SEND_GRID_API_KEY);
const senderEmail = process.env.SEND_GRID_SENDER_EMAIL;

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
