const VariablesRepository = require("../../database/repositories/variables.repository");
const DepartamentosRepository = require("../../database/repositories/departamentos.repository");

class GetInsumosVistaContacto {
  async execute() {
    const obj = this.struct();
    obj.empresa = await this.getEmpresa();
    obj.departamentos = await this.getDepartamentos();
    return obj;
  }

  async getDepartamentos() {
    const departamentos = await DepartamentosRepository.listDepartamentos();
    return departamentos;
  }

  async getEmpresa() {
    const empresa = await VariablesRepository.getEmpresa();
    return empresa;
  }

  struct() {
    return {
      departamentos: null,
      empresa: null
    }
  }
}

module.exports = GetInsumosVistaContacto;
