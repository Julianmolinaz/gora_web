const GetInsumosVistaContacto = require("../services/contacto/get_insumos_vista_contacto");
const GetCiudadesPorDepartamento = require("../services/contacto/get_ciudades_por_departamento");
const GetContactosPorCiudad = require("../services/contacto/get_contactos_por_ciudad");

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

  static async getContactos(req, res) {
    const ciudadId = req.params.ciudadId;
    const useCase = new GetContactosPorCiudad(ciudadId);
    await useCase.execute();
    const contactos = useCase.contactos;
    return res.json({ contactos });
  }
}

module.exports = ContactoController;
