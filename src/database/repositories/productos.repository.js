const conexion = require("../conexiones/local");

class ProductosRepository {
  static list() {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM productos";
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }
  
  static findProducto(productoId) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM productos WHERE id=${productoId} LIMIT 1`;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	if (result) resolve(result[0]);
	resolve(result);
      });
    });
  }
}

module.exports = ProductosRepository;
