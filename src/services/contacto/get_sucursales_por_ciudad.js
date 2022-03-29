
class GetSucursalesPorCiudad {
  constructor(ciudadId) {
    this.setCiudadId(ciudadId);
    this.sucursales = [];
  }

  async execute() {
    this.sucursales = await this.getSucursales();
  }

  async getSucursales() {
    const sucursales = await SucursalesRepository.getSucursalesPorCiudad(this.ciudadId);
    return sucursales;
  }

  setCiudadId(ciudadId) {
    if (ciudadId) {
      this.ciudadId = ciudadId;
    } else {
      throw "Se require el id de la ciudad";
    }
  }
}

module.exports = GetSucursalesPorCiudad;
