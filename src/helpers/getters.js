const jwt = require("jsonwebtoken");
const moment = require("moment");

function getEnum(value) {
  let str = value.substr(5);
  let str_ = str.substr(0, str.length - 1).replace(/['']/g, "");
  
  let arr = str_.split(",");
  
  return arr; 
}

function currency(amount) {
  const numberFormat = new Intl.NumberFormat(process.env.LOCALE);
  return `$${numberFormat.format(amount)}`;
}

function capitalizar(value) {
  if (value.length > 0) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return value;
}

function ddmmyyyy(date) {
  return moment(date).format('DD-MM-YYYY');
}

function generarCodigo(digitos) {
  let codigo = "";
  for (let i = 0; i < digitos; i++) {
    let digito = Math.floor(Math.random() * 10);
    if (i == 0 && digito == 0) digito = 1; 
    codigo += `${digito}`;
  }
  //console.log({ codigo });
  return codigo;
}
  
async function getAccessToken(usuarioId, nombre, clienteId, add = null) {
  const data = {
    nombre,
    id: usuarioId,
    ref: clienteId,
    exp: Math.floor(Date.now() / 1000) + (60 * process.env.MY_SEC_EXP_ACCESS_TOKEN),
    add
  }; 
  const token = await jwt.sign(
    data,
    process.env.TOKEN_SECRET,
  );

  return token;
}

module.exports = {
  getEnum,
  capitalizar,
  currency,
  ddmmyyyy,
  generarCodigo,
  getAccessToken,
}
