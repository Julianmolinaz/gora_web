const GetInsumosVistaContacto = require("../services/contacto/get_insumos_vista_contacto");
const GetCiudadesPorDepartamento = require("../services/contacto/get_ciudades_por_departamento");

class ContactoController {
  static async index(req, res) {
    const insumosUseCase = new GetInsumosVistaContacto();
    const insumos = await insumosUseCase.execute();
    return res.render("contacto/index.html", { insumos });
  }

  static async getCiudades(req, res) {
    const departamentoId = req.params.departamentoId;
    const ciudadesUseCase = new GetCiudadesPorDepartamento(departamentoId);
    const ciudades = await ciudadesUseCase.execute();    
    return res.json({ciudades});
  }

  static async getSucursalesPorCiudad(req, res) {
    const ciudadId = req.params.ciudadId;
    return res.json({ciudadId});
  }
}

module.exports = ContactoController;
