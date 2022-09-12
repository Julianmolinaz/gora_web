const validator = require("validator");

class ValidadorHp {
  static isEmpty(param = null) {
    if (param == undefined || param === "" || param === null) {
      return true;
    }
    return false;
  }

  static mobilePhone(param) {
    return validator.isMobilePhone(param, process.env.LOCALE);
  } 
}

module.exports = ValidadorHp;
