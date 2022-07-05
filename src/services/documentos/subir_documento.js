const StorageDocumentos = require("../storage/storage_documentos");
const DocumentosResporitory = require("./../../database/repositories/documentos.repository");

const AWS_BUCKET_NAME = "gora-web-1656809609249";
const ENCODING = "base64";

class SubirDocumento {
  constructor(solicitudId, base64, nombre) {
    this.solicitudId = solicitudId;
    this.base64 = base64;
    this.nombre = nombre;

    this.tipoDoc = "";
    this.nombreDoc = "";
    this.buffer = "";

    this.storage = new StorageDocumentos();
    this.base = base64.split(',');
  }

  async exec() {
    try {
      this.getTipoDoc();
      this.getNombreDoc();
      this.getBuffer();

      await this.storage.upload(
        this.nombreDoc,
        this.buffer,
        this.tipoDoc
      );
    } catch (err) {
      throw err;
    }
  }

  getNombreDoc() {
    let ext = this.tipoDoc.split("/")[1]; 
    this.nombreDoc = `${this.solicitudId}_${this.nombre}.${ext}`;
  }

  getTipoDoc() {
    this.tipoDoc = this.base[0].split(";")[0].split(':')[1];
  }

  getBuffer() {
    this.buffer = Buffer.from(this.base[1], ENCODING);
  }
}

module.exports = SubirDocumento;
