const SubirDocumento = require("../services/documentos/subir_documento");

class DocumentoController {
  static create(req, res) {
    const solicitudId = req.params.solicitudId;
    return res.render("documentos/create.html", {
      solicitudId
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
}

module.exports = DocumentoController;
