const conexion = require("../conexiones/local");
const { capitalizar } = require("./../../helpers/getters"); 
const { encriptar } = require("./../../helpers/setters"); 

class UsuariosRepository {
  static findNumDoc(numDoc) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM usuarios
        WHERE num_doc = ${numDoc}
        LIMIT 1;
      `;
      conexion.query(query, (error, result) => {
        if (error) reject(error);
        if (result.length) resolve(result[0]);
        else resolve({});
      });
    });  
  }

  static async save(data) {
    let nombreCompleto = ""; 
    const nombre = [];
    nombre.push(capitalizar(data.primer_nombre.trim()));
    nombre.push(capitalizar(data.segundo_nombre.trim()));
    nombre.push(capitalizar(data.primer_apellido.trim()));
    nombre.push(capitalizar(data.segundo_apellido.trim()));
    
    for (let i=0; i < nombre.length; i++) {
      let espacio = (i !== 3) ? " " : "";
      nombreCompleto += nombre[i] + espacio;
    }

    const passEncriptado = await encriptar(data.password.trim());

    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO usuarios 
        VALUES
          (
            NULL, 
            '${data.tipo_doc.trim()}',
            '${data.num_doc.trim()}',
            '${nombreCompleto}',
            '${data.movil.trim()}',
            '${data.email.trim()}',
            '${passEncriptado}',
            NOW(),
            NOW()
          );
      `;
      conexion.query(sql, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  }

}

module.exports = UsuariosRepository;
