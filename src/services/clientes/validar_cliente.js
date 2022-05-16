const ClientesRepository = require("./../../database/repositories/clientes.repository");
const ValidadorHp = require("./../../helpers/validador"); 
const validator = require("validator");

class ValidarCliente {
  constructor(data, modo) {
    this.data = data;
    this.modo = modo;
    this.errors = [];
  }

  async exec() {
    try {
      this.validarPrimerNombre(); 
      this.validarSegundoNombre();
      this.validarPrimerApellido();
      this.validarSegundoApellido();
      this.validarTipoDoc();
      await this.validarNumDoc();
      this.validarMovil();
      this.validarFechaNacimiento();
    } catch (error) {
      throw error;
    }
  }

  fails() {
    return (this.errors.length > 0) ? true : false;
  }

  validarPrimerNombre() {
    if (validator.isEmpty(this.data.primer_nombre)) {
      this.errors.push(["El primer nombre es requerido"]);
    } else {
      if (!validator.isAlpha(this.data.primer_nombre)) {
        this.errors.push(["El primer nombre debe ser alfanumérico"]);
      }
    }
  } 

  validarSegundoNombre() {
    if (this.data.segundo_nombre && !validator.isAlpha(this.data.segundo_nombre)) {
      this.errors.push(["El segunfo nombre debe ser alfanumérico"]);
    }
  } 

  validarPrimerApellido() {
    if (validator.isEmpty(this.data.primer_apellido)) {
      this.errors.push(["El primer apellido es requerido"]);
    } else {
      if (!validator.isAlpha(this.data.primer_apellido)) {
        this.errors.push(["El primer apellido debe ser alfanumérico"]);
      }
    }
  } 

  validarSegundoApellido() {
    if (this.data.segundo_apellido && !validator.isAlpha(this.data.segundo_apellido)) {
      this.errors.push(["El segundo apellido debe ser alfanumérico"]);
    }
  } 

  validarTipoDoc() {
    if (ValidadorHp.isEmpty(this.data.tipo_doc)) {
      this.errors.push(["El tipo de documento es requerido"]);
    }
  } 

  async validarNumDoc() {
    if (ValidadorHp.isEmpty(this.data.num_doc)) {
      this.errors.push(["El número de documento es requerido"]);
    } else {
      if (await this.existeCliente()) {
        this.errors.push(["Ya existe un cliente registrado"])
      }
    }
  } 

  async existeCliente() {
    const cliente = await ClientesRepository.findSome({
      num_doc: this.data.num_doc
    });
    if (cliente.length) return true;
    return false;
  }

  validarMovil() {
    if (validator.isEmpty(this.data.movil)) {
      this.errors.push(["El número celular es requerido"]);
    } else {
      if (! validator.isMobilePhone(this.data.movil, "es-CO")) {
        this.errors.push(["El celular no es válido"]);
      }
    }
  } 

  validarEmail() {
    if (validator.isEmpty(this.data.email)) {
      this.errors.push(["El correo electrónico es requerido"]);
    } else {
      if (validator.isEmail(this.data.email)) {
        this.errors.push("El correo no tiene el formato correcto");
      }
    }
  } 

  validarFechaNacimiento() {
    if (ValidadorHp.isEmpty(this.data.fecha_nacimiento)) {
      this.errors.push(["La fecha de nacimiento es requerida"]);
    } else {
      if (!validator.isDate(this.data.fecha_nacimiento)) {
        this.errors.push(["La fecha de nacimiento no es una fecha válida"]);
      }
    }
  } 

  validarDireccion() {
    if (validator.isEmpty(this.data.direccion)) {
      this.errors.push(["La dirección es requerida"]);
    } else {
      if (validator.isAlpha(this.data.direccion)) {
        this.errors.push(["La dirección debe contener letras y/o números"]);
      }
    }
  } 

  validarBarrio() {
      if (this.data.barrio && validator.isAlpha(this.data.direccion)) {
        this.errors.push(["El barrio debe contener letras y/o números"]);
      }
  } 

  validarMunicipioId() {
    if (ValidadorHp.isEmpty(this.data.municipio_id)) {
      this.errors.push(["La ciudad/municipio es requerida"]);
    }
  } 

  validarFijo() {

  } 

  validarOcupacion() {
    if (ValidadorHp.isEmpty(this.data.ocupacion)) {
      this.errors.push(["La ocupación es requerida"]);
    }
  } 

  validarEmpresa() {
    if (ValidadorHp.isEmpty(this.data.empresa)) {
      this.errors.push(["El nombre de la empresa es requerida"]);
    }
  } 

  validarDocEmpresa() {
    if (ValidadorHp.isEmpty(this.data.doc_empresa)) {
      this.errors.push(["El documento de la empresa es requerido"]);
    }
  } 

  validarTipoActividad() {
    if (ValidadorHp.isEmpty(this.data.tipo_actividad)) {
      this.errors.push(["El tipo de actividad es requerido"]);
    }
  } 

  validarDirEmpresa() {
    if (ValidadorHp.isEmpty(this.data.dir_empresa)) {
      this.errors.push(["La direccion de la empresa es requerida"]);
    }
  } 

  validarTelEmpresa() {
    if (ValidadorHp.isEmpty(this.data.tel_empresa)) {
      this.errors.push(["El teléfono de la empresa es requerida"]);
    }
  } 

  validarGenero() {
    if (ValidadorHp.isEmpty(this.data.genero)) {
      this.errors.push(["El genero es requerido"]);
    }
  } 

  validarEstadoCivil() {
    if (ValidadorHp.isEmpty(this.data.estado_civil)) {
      this.errors.push(["El estado civil es requerido"]);
    }
  } 

  validarFechaExp() {
    if (ValidadorHp.isEmpty(this.data.fecha_exp)) {
      this.errors.push(["La fecha de expedición del documento es requerida"]);
    }
  } 

  validarLugarExp() {
    if (ValidadorHp.isEmpty(this.data.lugar_exp)) {
      this.errors.push(["El lugar de expedición del documento es requerida"]);
    }
  } 

  validarLugarNacimiento() {
    if (ValidadorHp.isEmpty(this.data.lugar_nacimiento)) {
      this.errors.push(["El lugar de nacimiento es requerido"]);
    }
  } 

  validarNivelEstudios() {
    if (ValidadorHp.isEmpty(this.data.nivel_estudios)) {
      this.errors.push(["El nivel de estudios es requerido"]);
    }
  } 

  validarAnosResidencia() {

  } 

  validarMesesResidencia() {
    if (ValidadorHp.isEmpty(this.data.meses_residencia)) {
      this.errors.push(["El número de meses en residencia es requerido"]);
    }
  } 

  validarEstrato() {
    if (ValidadorHp.isEmpty(this.data.estrato)) {
      this.errors.push(["El estrato es requerido"]);
    }
  } 

  validarTipoVivienda() {
    if (ValidadorHp.isEmpty(this.data.tipo_vivienda)) {
      this.errors.push(["El tipo de vivienda es requerido"]);
    }
  } 

  validarCargo() {
    if (ValidadorHp.isEmpty(this.data.cargo)) {
      this.errors.push(["El cargo es requerido"]);
    }
  } 

  validarDescripcionActividad() {
    if (ValidadorHp.isEmpty(this.data.descripcion_actividad)) {
      this.errors.push(["La descripción de la actividad es requerida"]);
    }
  } 

  validarFechaVinculacion() {
    if (ValidadorHp.isEmpty(this.data.fecha_vinculacion)) {
      this.errors.push(["La fecha de vinculación es requerida"]);
    }
  } 

  validarTipoContrato() {
    if (ValidadorHp.isEmpty(this.data.tipo_contrato)) {
      this.errors.push(["El tipo de contrato es requerido"]);
    }
  } 

}

module.exports = ValidarCliente;
