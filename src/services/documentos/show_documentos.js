const StorageDocumentos = require("../storage/storage_documentos");
const DocumentosRepository = require("../../database/repositories/documentos.repository");

const BUCKET_NAME = "gora-web-1656809609249";

class ShowDocumentos {
  constructor(solicitudId) {
    this.storage = new StorageDocumentos();
    this.solicitudId = solicitudId;
    this.documentos = [];
    this.urls = [];
  }

  async exec() {
    await this.getDocumentos();
    await this.getUrlDocumentos();
    return this.urls;
  }

  async getDocumentos() {
    this.documentos = await DocumentosRepository.listSome({
      precredito_id: this.solicitudId
    }); 
  }

  async getUrlDocumentos() {
    for (let doc of this.documentos) {
      let url = await this.storage.getPublicURL(doc.ruta, BUCKET_NAME);

      let arr = doc.nombre.split("_");
      let size = arr.length;
      let codigo = "";

      for (let i = 1; i < size; i++) {
        if (i == size - 1) {
          codigo += arr[i].split(".")[0];
        } else {
          codigo += arr[i] + "_";
        }
      }
      this.urls.push({ id: doc.id, codigo, url });
    }
  }
}

module.exports = ShowDocumentos;
