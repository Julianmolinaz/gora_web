const ClientesRepository = require("../../database/repositories/clientes.repository");
const ReferenciasRepository = require("../../database/repositories/referencias.repository");
const DepartamentosRepository = require("../../database/repositories/departamentos.repository");
const OficiosRepository = require("../../database/repositories/oficios.repository");

class GetInsumos {
  async execute() {
    return {
      listTipoDoc: await this.listTipoDoc(),
      listDepartamentos: await this.listDepartamentos(),
      listOficios: await this.listOficios(),
      listTipoActividad: await this.listTipoActividad(),
      listGenero: await this.listGenero(),
      listEstadoCivil: await this.listEstadoCivil(),
      listNivelEstudios: await this.listNivelEstudios(),
      listEstrato: await this.listEstrato(),
      listTipoVivienda: await this.listTipoVivienda(),
      listTipoContrato: await this.listTipoContrato(),
      listParentesco: await this.listParentesco(),
    };
  }

  listTipoDoc() {
    return ClientesRepository.getEnumValues("tipo_doc");
  }

  listDepartamentos() {
    return DepartamentosRepository.listDepartamentos();
  }

  listOficios() {
    return OficiosRepository.listOficios();
  }

  listTipoActividad() {
    return ClientesRepository.getEnumValues("tipo_actividad");
  }

  listGenero() {
    return ClientesRepository.getEnumValues("genero");
  }

  listEstadoCivil() {
    return ClientesRepository.getEnumValues("estado_civil");
  }

  listNivelEstudios() {
    return ClientesRepository.getEnumValues("nivel_estudios");
  }

  listEstrato() {
    return ClientesRepository.getEnumValues("estrato");
  }

  listTipoVivienda() {
    return ClientesRepository.getEnumValues("tipo_vivienda");
  }

  listTipoContrato() {
    return ClientesRepository.getEnumValues("tipo_contrato");
  }

  listParentesco() {
    return ReferenciasRepository.getEnumValues("parentesco");
  }
}

module.exports = GetInsumos;
