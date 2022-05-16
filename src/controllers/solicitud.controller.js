const ValidarCliente = require("./../services/clientes/validar_cliente");

class SolicitudController {
  static create(req, res) {
    return res.render("solicitud/index.html");
  }
  
  static async store(req, res) {
    //     
  }

  static async storeWithCliente(req, res) {
    const data = req.body;
    const validarCliente = new ValidarCliente(data, "creacion");
    await validarCliente.exec();

    return res.json({ result: validarCliente.errors });
  }
}

module.exports = SolicitudController;
