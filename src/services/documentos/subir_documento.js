const StorageDocumentos = require("../storage/storage_documentos");
const DocumentosRepository = require("../../database/repositories/documentos.repository");

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

    this.getTipoDoc();
    this.getNombreDoc();
    this.getBuffer();
  }

  async exec() {
    try {
      await this.cargarDoc();
      await this.salvarDoc();
    } catch (err) {
      throw err;
    }
  }

  async salvarDoc() {
    const doc = await this.consultarDoc();

    const newDoc = {
      nombre: this.nombreDoc,
      ruta: this.nombreDoc,
      precredito_id: this.solicitudId,
      user_create_id: process.env.USER_ID_DEFAULT
    };

    if (doc) {
      await this.sobreescribirDoc(doc.id, newDoc);
    } else {
      await this.crearDoc(newDoc);
    }
  }

  async sobreescribirDoc(docId, dataDoc) {
    await DocumentosRepository.update(
      docId,
      dataDoc
    );
  }

  async crearDoc(doc) {
    await DocumentosRepository.create(doc);
  }

  async consultarDoc() {
    const nombre = this.nombreDoc.split(".")[0];
    return await DocumentosRepository.findByName(nombre);
  }

  async cargarDoc() {
    try {
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
