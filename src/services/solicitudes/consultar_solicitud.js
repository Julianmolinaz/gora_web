const {
  VentasRepository,
  ReferenciasRepository,
  SolicitudesRepository,
  CreditosRepository,
  DocumentosRepository,
  VariablesRepository
} = require("../../database/repositories");

class ConsultarSolicitud {
  constructor(solicitudId) {
    this.solicitudId = solicitudId;
    this.data = {
      solicitud: null, // info solicitud
      referencias: [],
      documentos: null,
      credito: null,
      ventas: [],
    };
  }

  async exec() {
    await this.obtenerSolicitud();
    await this.obtenerReferencias();
    await this.revisarDocumentos();
    await this.obtenerCredito();
    await this.obtenerVentas();
  }

  async obtenerReferencias() {
    let referenciasTemp = await ReferenciasRepository.findSolicitud(this.solicitudId); 
    this.data.referencias = referenciasTemp.map((referencia) => {
      return {
        nombre: referencia.nombre,
        parentesco: referencia.parentesco,
        celular: referencia.celular
      }
    });
  }

  async obtenerSolicitud() {
    let solicitudTemp = await SolicitudesRepository.find(this.solicitudId);
    this.data.solicitud = {
      id: solicitudTemp.id,
      aprobado: solicitudTemp.aprobado,
      cuotas: solicitudTemp.cuotas,
      periodo: solicitudTemp.periodo,
      vlr_fin: solicitudTemp.vlr_fin,
      vlr_cuota: solicitudTemp.vlr_cuota,
      observaciones: solicitudTemp.observaciones,
      fecha: solicitudTemp.fecha
    }
  }

  async obtenerCredito() {
    let credito = await CreditosRepository.findBySolicitud(
      this.data.solicitud.id
    );
    this.data.credito = credito;
  }

  async obtenerVentas() {
    let ventas = await VentasRepository.obtenerPorSolicitud(
      this.data.solicitud.id
    );
    for (let venta of ventas) {
      this.data.ventas.push(venta);
    }
  }

  async revisarDocumentos() {
    const docs = await DocumentosRepository.listSome(
      { precredito_id: this.solicitudId }
    );

    const tempListDocs = await VariablesRepository.findByNombre('documentos');
    this.data.documentos = tempListDocs.detalle;

    docs.forEach(doc => {
      let arr = doc.nombre.split("_");
      let size = arr.length;
      let key = "";

      for (let i = 1; i < size; i++) {
        if (i == size - 1) {
          key += arr[i].split(".")[0];
        } else {
          key += arr[i] + "_";
        }
      }
      tempListDocs.detalle[key].completo = true;
    }); 

    this.data.documentos = Object.values(tempListDocs.detalle);
  }
}

module.exports = ConsultarSolicitud;
