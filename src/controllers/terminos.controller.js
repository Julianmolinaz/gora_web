const GenerarCodigoValidacion = require("../services/terminos/generar_codigo_validacion"); 
//const ValidarCodigo = require("../services/terminos/validar_codigo"); 

class TerminosController {
  static async generarCodigo(req, res) {
    try {
      const { usuarioId } = req.params;
      const useCase = new GenerarCodigoValidacion(usuarioId);
      const response = await useCase.exec();
      return res.json({ message: "ok" });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  static async validarCodigo(req, res) {
    try {
      //return res.json({ dat: true, message: "Código correcto" });
      //const { usuarioId, codigo } = req.body;
      //const response = { dat: false, message: "Código incorrecto" };
      //const validarCodigo = new ValidarCodigo(usuarioId, codigo);
      //const result = await validarCodigo.exec();
      //if (result) {
       // response.dat = true;
       // response.message = "Código correcto";
      //}
      //return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Ocurrió un error inesperado"
      });
    }
  }
}

module.exports = TerminosController;
