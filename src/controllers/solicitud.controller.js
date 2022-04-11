class SolicitudController {
  static create(req, res) {
    console.log("create");
    return res.render("solicitud/index.html");
  }
}

module.exports = SolicitudController;
