const VentasRepository = require("../../database/repositories/ventas.repository");
const SolicitudesRepository = require("../../database/repositories/solicitudes.repository");
const CreditosRepository = require("../../database/repositories/creditos.repository");
const DocumentosRepository = require("../../database/repositories/documentos.repository");
const VariablesRepository = require("../../database/repositories/variables.repository");

class ConsultarSolicitud {
  constructor(solicitudId) {
    this.solicitudId = solicitudId;
    this.data = {
      solicitud: null, // info solicitud
      documentos: null,
      credito: null,
      ventas: [],
    };
  }

  async exec() {
    await this.obtenerSolicitud();
    await this.revisarDocumentos();
    await this.obtenerCredito();
    await this.obtenerVentas();
    console.log(this.data);
  }

  async obtenerSolicitud() {
    let solicitudTemp = await SolicitudesRepository.find(this.solicitudId);
    this.data.solicitud = {
      id: solicitudTemp.id,
      aprobado: solicitudTemp.aprobado,
      cuotas: solicitudTemp.cuotas,
      periodo: solicitudTemp.periodo,
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
      let key = arr[1] + '_' + arr[2].split(".")[0];

      this.data.documentos[key].completo = true;
    }); 
  }
}

module.exports = ConsultarSolicitud;
