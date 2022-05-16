const ClientesRepository = require("../../database/repositories/clientes.repository");
const ReferenciasRepository = require("../../database/repositories/referencias.repository");
const DepartamentosRepository = require("../../database/repositories/departamentos.repository");
const OficiosRepository = require("../../database/repositories/oficios.repository");

class GetInsumos {
  async execute() {
    return {
      listTipoContrato: await this.listTipoContrato(),
      listTipoVivienda: await this.listTipoVivienda(),
      listEstrato: await this.listEstrato(),
      listNivelEstudios: await this.listNivelEstudios(),
      listEstadoCivil: await this.listEstadoCivil(),
      listGenero: await this.listGenero(),
      listTipoActividad: await this.listTipoActividad(),
      listOficios: await this.listOficios(),
      listTipoDoc: await this.listTipoDoc(),
      listDepartamentos: await this.listDepartamentos(),
      listParentesco: await this.listParentesco(),
    };
  }

  async listTipoDoc() {
    return await ClientesRepository.getEnumValues("tipo_doc");
  }

  async listDepartamentos() {
    return await DepartamentosRepository.listDepartamentos();
  }

  async listOficios() {
    return await OficiosRepository.listOficios();
  }

  async listTipoActividad() {
    return await ClientesRepository.getEnumValues("tipo_actividad");
  }

  async listGenero() {
    return await ClientesRepository.getEnumValues("genero");
  }

  async listEstadoCivil() {
    return await ClientesRepository.getEnumValues("estado_civil");
  }

  async listNivelEstudios() {
    return await ClientesRepository.getEnumValues("nivel_estudios");
  }

  async listEstrato() {
    return await ClientesRepository.getEnumValues("estrato");
  }

  async listTipoVivienda() {
    return await ClientesRepository.getEnumValues("tipo_vivienda");
  }

  async listTipoContrato() {
    return await ClientesRepository.getEnumValues("tipo_contrato");
  }

  async listParentesco() {
    return await ReferenciasRepository.getEnumValues("parentesco");
  }
}

module.exports = GetInsumos;
