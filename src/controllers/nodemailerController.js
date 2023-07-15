const nodemailer = require("nodemailer");

function sendRegisterMail(req, res) {
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "alexemanuelruiz@gmail.com",
      pass: "ufibxjkqrulqzryj",
    },
  });

  const mailOptions = {
    from: "Epic Games Store",
    to: user.username,
    subject: "enviado desde Epic Games Store.",
    text: "¡Registro exitoso! ¡Bienvenido a Epic Games Store!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).json(req.body);
    }
  });
}

function sendPaymentSuccessMail(req, res) {
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "alexemanuelruiz@gmail.com",
      pass: "ufibxjkqrulqzryj",
    },
  });

  const mailOptions = {
    from: "Epic Games Store",
    to: `${email}`,
    subject: "enviado desde Epic Games Store.",
    text: "¡Pago exitoso! ¡Gracias por tu compra!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).json(req.body);
    }
  });
}

module.exports = {
  sendRegisterMail,
  sendPaymentSuccessMail,
};