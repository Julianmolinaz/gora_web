//const CrearCliente = require("./../services/clientes/crear_cliente");

class SolicitudController {
  static create(req, res) {
    return res.render("solicitud/index.html");
  }
  
  static async store(req, res) {
    //     
  }

  static async storeWithCliente(req, res) {
    try {
      const data = req.body;
      //const crearCliente = new CrearCliente(data);
      //await crearCliente.exec();

      return res.json({ msg: "Todo bien" });
    } catch (error) {
      console.error({ error });
      return res.json({ error }); 
    }
  }
}

module.exports = SolicitudController;
