const validator = require("validator");
const ValidadorHp = require("../../helpers/validador");

class ValidarSolicitud {
  constructor(data, modo) {
    console.log("Solicitudes@ValidarSolicitud");
    this.data = data;
    this.modo = modo;
    this.errors = [];
  }

  exec() {
    this.validarNumFact();
    this.validarFecha();
    this.validarCarteraId();
    this.validarFuncionarioId();
    this.validarClienteId();
    this.validarVlrFin();
    this.validarPeriodo();
    this.validarMeses();
    this.validarCuotas();
    this.validarVlrCuota();
    this.validarPFecha();
    this.validarSFecha();
    this.validarEstudio();
    this.validarCuotaInicial();
    this.validarAprobado();
    this.validarObservaciones();
    this.validarUserCreateId();
    this.validarUserUpdateId();
  }

  validarNumFact() {
    if (ValidadorHp.isEmpty(this.data.num_fact)) {
      this.errors.push(["El consecutivo es requerido"]);
    }
  }

  validarFecha() {
    if (ValidadorHp.isEmpty(this.data.fecha)) {
      this.errors.push(["La fecha de la solicitud es requerida"]);
    }
  }

  validarCarteraId() {
    if (ValidadorHp.isEmpty(this.data.cartera_id)) {
      this.errors.push(["La cartera es requerida"]);
    }
  }

  validarFuncionarioId() {
    if (ValidadorHp.isEmpty(this.data.funcionario_id)) {
      this.errors.push(["El funcionario es requerido"]);
    }
  }

  validarClienteId() {
    if (ValidadorHp.isEmpty(this.data.cliente_id)) {
      this.errors.push(["El cliente es requerido"]);
    }
  }

  validarVlrFin() {
    if (ValidadorHp.isEmpty(this.data.vlr_fin)) {
      this.errors.push(["El costo del crédito es requerido"]);
    }
  }

  validarPeriodo() {
    if (ValidadorHp.isEmpty(this.data.periodo)) {
      this.errors.push(["El periodo es requerido"]);
    }
  }

  validarMeses() {
    if (ValidadorHp.isEmpty(this.data.meses)) {
      this.errors.push(["Los número meses son requeridos"]);
    }
  }

  validarCuotas() {
    if (ValidadorHp.isEmpty(this.data.cuotas)) {
      this.errors.push(["El número de cuotas es requerido"]);
    }
  }

  validarVlrCuota() {
    if (ValidadorHp.isEmpty(this.data.vlr_cuota)) {
      this.errors.push(["El valor de la cuota es requerida"]);
    }
  }

  validarPFecha() {
    if (ValidadorHp.isEmpty(this.data.p_fecha)) {
      this.errors.push(["La primera fecha es requerida"]);
    }
  }

  validarSFecha() {
    if (ValidadorHp.isEmpty(this.data.s_fecha)) {
      this.errors.push(["La segunda fecha es requerida"]);
    }
  }

  validarEstudio() {
    if (ValidadorHp.isEmpty(this.data.p_fecha)) {
      this.errors.push(["El tipo de estudio es requerido"]);
    }
  }

  validarCuotaInicial() {
    if (ValidadorHp.isEmpty(this.data.s_fecha)) {
      this.errors.push(["La cuota inicial es requerida"]);
    }
  }

  validarAprobado() {
    if (ValidadorHp.isEmpty(this.data.aprobado)) {
      this.errors.push(["El estado de aprobación es requerido"]);
    }
  }

  validarObservaciones() {
    //
  }

  validarUserCreateId() {
    if (this.modo === "creacion" && ValidadorHp.isEmpty(this.data.user_create_id)) {
      this.errors.push(["El usuario que creó la solicitud es requerido"]);
    }
  }

  validarUserUpdateId() {
    if (this.modo === "edicion" && ValidadorHp.isEmpty(this.data.user_create_id)) {
      this.errors.push(["El usuario que editó la solicitud es requerido"]);
    }
  }

  validarCreatedAt() {
    if (this.modo === "creacion" && ValidadorHp.isEmpty(this.data.created_at)) {
      this.errors.push(["La fecha de creación es requerida"]);
    }
  }

  validarUpdatedAt() {
    if (this.modo === "edicion" && ValidadorHp.isEmpty(this.data.updated_at)) {
      this.errors.push(["La fecha de actualización es requerida"]);
    }
  }

  fails() {
    return this.errors.length > 0 ? true : false;
  }
}

module.exports = ValidarSolicitud; 
