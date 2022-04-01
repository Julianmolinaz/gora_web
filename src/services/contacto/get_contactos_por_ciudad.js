const ContactosRepository = require("../../database/repositories/contactos.repository");

class GetContactosPorCiudad {
  constructor(ciudadId) {
    this.setCiudadId(ciudadId);
    this.contactos = [];
  }

  async execute() {
    await this.getSucursales();
  }

  async getSucursales() {
    this.contactos = await ContactosRepository.getContactosPorCiudad(this.ciudadId);
  }

  setCiudadId(ciudadId) {
    if (ciudadId) {
      this.ciudadId = ciudadId;
    } else {
      throw "Se require el id de la ciudad";
    }
  }
}

module.exports = GetContactosPorCiudad;
