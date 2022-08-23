const StorageDocumentos = require("../storage/storage_documentos");
const DocumentosRepository = require("../../database/repositories/documentos.repository");
const mainConexion = require("../../database/conexiones/main.conexion");

class EliminarDocumento {
  constructor(documentoId, clienteId) {
    this.storage = new StorageDocumentos();
    this.documentoId = documentoId;
    this.clienteId = clienteId;
    this.documento = null;
    this.ruta = null;
    this.transaction = null;
  }

  async exec() {
    this.transaction = await mainConexion.transaction(); 
   
    try {
      await this.getDocumento();
      await this.deleteDocumento();
      await this.deleteStorageDocumento();

      this.transaction.commit();
    } catch (err) {
      this.transaction.rollback();
      throw err;
    }
  }

  async getDocumento() {
    this.documento = await DocumentosRepository.findSome({
      id: this.documentoId,
      cliente_id: this.clienteId
    });

    if (this.documento) {
      this.ruta = this.documento.ruta;
    }
  }

  async deleteDocumento() {
    if (!this.documento) throw "El archivo no existe";

    const response = await DocumentosRepository.destroy(this.documentoId);
  }

  async deleteStorageDocumento() {
    const result = await this.storage.destroy(this.ruta); 
  }
}

module.exports = EliminarDocumento;
