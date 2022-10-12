const Mailer = require("../../libs/mailer");

class NotificarSolicitudAnalisis {
  constructor(numDoc) {
    this.numDoc = numDoc; 
    console.log(this.numDoc);
  }

  async execute() {
    try {
      const mailer = new Mailer({
        host: process.env.NOTIFICATION_EMAIL_HOST,
        port: process.env.NOTIFICATION_EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.NOTIFICATION_EMAIL_USER,
          pass: process.env.NOTIFICATION_EMAIL_PASSWORD
        }
      }); 

      mailer.send(
        process.env.NOTIFICATION_EMAIL_USER,
        process.env.NOTIFICATION_EMAIL_USER,
        `Nueva solicitud`,
        `Se ha registrado una nueva solicitud ver doc: ${this.numDoc}`
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = NotificarSolicitudAnalisis;
