/**
 * Crear referencias solicitud
 * Se crean las referencias a partir de un array donde 
 * cada elemento contiene la data de una referencia 
 **/

// Persistencia
const mainConexion = require("../../database/conexiones/main.conexion");
const ReferenciasRepository = require("../../database/repositories/referencias.repository");

// Librerias
const validator = require("validator");
const ValidadorHp = require("../../helpers/validador");

const NUM_REFS = 2;

class CrearReferencias {
  constructor(arrReferencias, clienteId, solicitudId) {
    this.setReferencias(arrReferencias);
    this.clienteId = clienteId;
    this.solicitudId = solicitudId;
    this.errors = []; 
    this.refs = [];
    this.transaction = null;
  }

  async exec() {
    this.transaction = await mainConexion.transaction(); 
    try {
      let count = 1;
      for (let ref of this.arrRef) {
        this.validarRef(ref, count);  
        count++;
      }

      if (this.errors.length) throw errors;
    
      for (let ref of this.arrRef) {
        await this.crearRef(ref);
      }
      this.transaction.commit();
    } catch (error) {
      this.transaction.rollback();
      throw error;
    }
  }

  setReferencias(arrReferencias) {
    if (arrReferencias.length == NUM_REFS) {
      this.arrRef = arrReferencias;  
    } else {
      throw `Se requieren ${NUM_REFS} referencias`;
    }
  }

  validarRef(ref, index) {
    if (ValidadorHp.isEmpty(ref.parentesco)) {
      this.errors.push([`El parentesco de la referencia ${index} es requerido`]);
    }
    if (ValidadorHp.isEmpty(ref.nombre)) {
      this.errors.push([`El nombre de la referencia ${index} es requerido`]); 
    }
    if (ValidadorHp.isEmpty(ref.celular)) {
      this.errors.push([`El celular de la referencia ${index} es requerido`]);
    }
  }

  castReferencia(ref) {
    return {
      nombre: ref.nombre, 
      parentesco: ref.parentesco,
      celular: ref.celular,
      precredito_id: this.solicitudId,
      cliente_id: this.clienteId,
      created_by: process.env.USER_ID_DEFAULT,
    };
  }

  async crearRef(ref) {
    const castRef = this.castReferencia(ref);
    const newRef = await ReferenciasRepository.crear(
      castRef,
      this.transaction
    );
    this.refs.push(newRef);
  }
}

module.exports = CrearReferencias;
