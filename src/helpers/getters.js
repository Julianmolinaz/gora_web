function getEnum(value) {
  let str = value.substr(5);
  let str_ = str.substr(0, str.length - 1).replace(/['']/g, "");
  
  let arr = str_.split(",");
  
  return arr; 
}

function capitalizar(value) {
  if (value.length > 0) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return value;
}

function generarCodigo(digitos) {
  let codigo = "";
  for (let i = 0; i < digitos; i++) {
    let digito = Math.floor(Math.random() * 10);
    codigo += `${digito}`;
  }
  console.log({codigo});
  return codigo;
}

module.exports = {
  getEnum,
  capitalizar,
  generarCodigo,
}
