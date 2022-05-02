class SolicitudController {
  static create(req, res) {
    const { simulador } = req.body;
    return res.render("solicitud/index.html", {
      simulador: JSON.parse(simulador),
    });
  }
}

module.exports = SolicitudController;
