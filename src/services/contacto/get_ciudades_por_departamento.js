const CiudadesRepository = require("../../database/repositories/ciudades.repository");

class GetCiudadesPorDepartamento {
  constructor(departamentoId) {
    this.setDepartamentoId(departamentoId);
  }

  async execute() {
    const ciudades = await this.getCiudades();
    return ciudades;
  }

  async getCiudades() {
    const ciudades = await CiudadesRepository.getCiudadesPorDepartamento(this.departamentoId);
    return ciudades;
  }

  setDepartamentoId(departamentoId) {
    if (departamentoId) this.departamentoId = departamentoId;
    else throw "Se requiere el id del departamento";
  }
}

module.exports = GetCiudadesPorDepartamento;
