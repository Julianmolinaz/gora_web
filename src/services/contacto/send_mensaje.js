const Mailer = require("../../libs/mailer");

class SendMensaje {
  constructor(payload) {
    this.setData(payload);
  }

  async execute() {
    const mailer = new Mailer({
      host: process.env.CONTACT_EMAIL_HOST,
      port: process.env.CONTACT_EMAIL_PORT,
      secure: process.env.CONTACT_EMAIL_SECURE,
      auth: {
        user: process.env.CONTACT_EMAIL_USER,
        pass: process.env.CONTACT_EMAIL_PASSWORD
      }
    });

    await mailer.send(
      this.email,
      process.env.CONTACT_EMAIL_USER,
      `Msg-Web ${this.nombre}`,
      this.getMensaje()
    );
  }

  getMensaje() {
    const mensaje = this.contenido + "\n\n" +
    "Nombre remitente: " + this.nombre + "\n" +
    "Correo remitente: " + this.email;
    return mensaje;
  }

  setData(payload) {
    let errores = "";
    if (!payload.email) errores += "El email es requerido \n";
    if (!payload.nombre) errores += "El nombre es requerido \n";
    if (!payload.contenido) errores += "El contenido del mensaje es requerido \n";

    if (errores) throw errores; 

    this.email = payload.email;
    this.nombre = payload.nombre;
    this.contenido = payload.contenido;
  }
}

module.exports = SendMensaje; 
