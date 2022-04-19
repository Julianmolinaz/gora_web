const main = require("../conexiones/main");
const { getEnum } = require("./../../helpers/getters");

class ClientesRepository {
  static getEnumValues(campo) {
    return new Promise((resolve, reject) => {
      const query = `
        SHOW COLUMNS FROM clientes
        WHERE field='${campo}';
      `;
      main.query(query, (error, result) => {
        if (error) reject(error);
        resolve(getEnum(result[0].Type));
      });
    });  
  }  
}

module.exports = ClientesRepository;
