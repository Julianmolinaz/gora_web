const GetInsumos = require("../services/clientes/get_insumos");

class ClienteController {
  static async create(req, res) {
    const caseInsumos = new GetInsumos();
    const insumos = await caseInsumos.execute();
    return res.json({insumos});
  }
}

module.exports = ClienteController;
