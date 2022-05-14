const bcrypt = require("bcrypt");

function encriptar(value) {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(value, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

function comparar(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}; 

module.exports = {
  encriptar,
  comparar,
}
