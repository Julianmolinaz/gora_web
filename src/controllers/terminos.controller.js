
class TerminosController {
  static async aceptarTerminosCondiciones(req, res) {
    return res.json({ msg: "aceptar términos y condiciones" });
  }
}

module.exports = TerminosController;
