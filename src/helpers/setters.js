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

module.exports = {
  encriptar,
}
