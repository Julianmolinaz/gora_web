const Mailer = require("../../libs/mailer");

class SendMensaje {
  constructor(payload) {
    this.setData(payload);
  }

  async execute() {
    const result = await Mailer.send(
      this.email,
      "test.free.pablo@gmail.com",
      `Mensaje desde la web ${this.nombre}`,
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
