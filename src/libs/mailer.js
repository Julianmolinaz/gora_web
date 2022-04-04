const nodemailer = require("nodemailer");

const config = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "test.free.pablo@gmail.com",
    pass: "ssoluupuqyshgmib",
  }
}

class Mailer {
  static async send(from, to, subject, text, html = null) {
    let transporter = nodemailer.createTransport(config);

    let info = await transporter.sendMail({
      from, to, subject, text, html
    });
  }
}

module.exports = Mailer;
