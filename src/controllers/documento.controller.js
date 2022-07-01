
class DocumentoController {
  static create(req, res) {
    const solicitudId = req.params.solicitudId;
    return res.render("documentos/create.html", {
      solicitudId
    });
  } 

  static async upload(req, res) {
    return res.json(req.body);
  }
}

module.exports = DocumentoController;
