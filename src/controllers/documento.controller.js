const SubirDocumento = require("../services/documentos/subir_documento");
const ShowDocumentos = require("../services/documentos/show_documentos");

class DocumentoController {
  static create(req, res) {
    const solicitudId = req.params.solicitudId;
    return res.render("documentos/create.html", {
      modo: "creacion",
      solicitudId,
      urls: null
    });
  } 

  static async upload(req, res) {
    try {
      const solicitudId = req.params.solicitudId;
      const doc = req.body;

      const subirDocumento = new SubirDocumento(
        solicitudId, doc.base64, doc.nombre
      );
      await subirDocumento.exec();
      return res.json(req.body);
    } catch (err) {
      console.error(err);
    }
  }

  static async edit(req, res) {
    try {
      const { solicitudId } = req.params;
      const showDocumentos = new ShowDocumentos(solicitudId);
      const urls = await showDocumentos.exec();

      return res.render("documentos/create.html", {
        modo: "edicion",
        urls,
        solicitudId
      });
    } catch (error) {
      console.error(error); 
    }
  }
}

module.exports = DocumentoController;
