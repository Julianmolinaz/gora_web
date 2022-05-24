const GetInsumos = require("../services/clientes/get_insumos");

class ClienteController {
  static async create(req, res) {
    console.log("creacion de cliente");
    try {
      const caseInsumos = new GetInsumos();
      const insumos = await caseInsumos.execute();
      return res.json({insumos});
    } catch (error) {
      return res.json({ error });
    }
  }
}

module.exports = ClienteController;
