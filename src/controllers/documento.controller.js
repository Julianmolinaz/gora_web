
class DocumentoController {
  static index(req, res) {
    console.log(req);
    return res.render("documentos/index.html");
  } 
}

module.exports = DocumentoController;
