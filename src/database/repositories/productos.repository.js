const Producto = require("../models/producto.model");

class ProductosRepository {
  static async list() {
    try {
      const productos = await Producto.findAll({
        where: { estado: "Activo" },
        order: ["nombre"]
      });
      return productos;
    }
    catch (error) {
      throw error;
    } 
  }
  
  static async findProducto(productoId) {
    try {
      const producto = await Producto.findByPk(productoId);
      return producto;
    } catch (error) {
      throw error;
    } 
  }
}

module.exports = ProductosRepository;
