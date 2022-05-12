function codigoVerificacion () {
  const digito1 = Math.floor((Math.random() * 9) + 1);
  const digito2 = Math.floor(Math.random() * 10);
  const digito3 = Math.floor(Math.random() * 10);
  const digito4 = Math.floor(Math.random() * 10);

  return `${digito1}${digito2}${digito3}${digito4}`;
}

module.exports = codigoVerificacion;
