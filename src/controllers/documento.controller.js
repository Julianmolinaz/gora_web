const {
  EliminarDocumento,
  ShowDocumentos,
  SubirDocumento
} = require("../services/documentos");

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
        solicitudId,
        doc.clienteId_,
        doc.base64,
        doc.nombre
      );
      await subirDocumento.exec();
      return res.json({
        success: true,
        documento: subirDocumento.documento 
      });
    } catch (err) {
      console.error(err);
      return res.json({
        success: false,
        msg: err.message
      });
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

  static async destroy(req, res) {
    try {
      const { documentoId } = req.params;
      const { clienteId_ } = req.body;

      const eliminarDocumento = new EliminarDocumento(
        documentoId, clienteId_
      );
      await eliminarDocumento.exec();
      return res.json(req.params);
    } catch (err) {
      console.error(err);
      return res.json({
        success: false,
        msg: err.message
      });
    } 
  }
}

module.exports = DocumentoController;
