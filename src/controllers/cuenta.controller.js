
class CuentaController {
  static index(req, res) {
    return res.render("cuenta/index.html");
  }

  static show(req, res) {
    return res.render("cuenta/solicitud/show.html");
  }
}

module.exports = CuentaController;
