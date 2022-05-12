const conexion = require("../conexiones/local");
const Contacto = require("../models/contacto.model");

class ContactosRepository {
  static getDepartamentosPresencia() {
    return new Promise((resolve, reject) => {
      const query = `
	SELECT departamentos.*
	FROM contactos
	INNER JOIN municipios ON contactos.municipio_id = municipios.id
	INNER JOIN departamentos ON municipios.departamento_id = departamentos.id
	GROUP BY departamentos.id
	ORDER BY departamentos.nombre
      `;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }

  static getCiudadesConPresencia(departamentoId) {
    return new Promise((resolve, reject) => {
      const query = `
	SELECT municipios.* 
	FROM contactos
	INNER JOIN municipios ON contactos.municipio_id = municipios.id
	INNER JOIN departamentos ON municipios.departamento_id = departamentos.id
	WHERE departamentos.id = ${departamentoId}
	GROUP BY municipios.id
	ORDER BY municipios.nombre
      `;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }

  static getContactosPorCiudad(ciudadId) {
    return new Promise((resolve, reject) => {
      const query = `
	SELECT 
	  contactos.*,
	  municipios.nombre as municipio_nombre,
	  departamentos.id as departamento_id,
	  departamentos.nombre as departamento_nombre
	FROM contactos
	INNER JOIN municipios ON contactos.municipio_id = municipios.id
	INNER JOIN departamentos ON municipios.departamento_id = departamentos.id
	WHERE contactos.municipio_id = ${ciudadId}
	ORDER BY contactos.nombre
      `;
      conexion.query(query, (error, result) => {
	if (error) reject(error);
	resolve(result);
      });
    });
  }
}

module.exports = ContactosRepository;
