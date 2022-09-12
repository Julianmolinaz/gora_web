const { GenerarCodigo } = require("../services/terminos"); 

class TerminosController {
  static async generarCodigo(req, res) {
    try {
      const dataUsuario = req.body;
      const useCase = new GenerarCodigo(dataUsuario);
      await useCase.exec();
      return res.json({ message: "ok"});
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error });
    }
  }
}

module.exports = TerminosController;
