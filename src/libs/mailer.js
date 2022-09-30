const nodemailer = require("nodemailer");

class Mailer {
  constructor(config) {
    this.config = config;
  }

  async send(from, to, subject, text, html = null) {
    let transporter = nodemailer.createTransport(this.config);

    let info = await transporter.sendMail({
      from, to, subject, text, html
    });
  }
}

module.exports = Mailer;
