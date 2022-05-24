class ValidadorHp {
  static isEmpty(param = null) {
    if (param == undefined || param === "" || param === null) {
      return true;
    }
    return false;
  }
}

module.exports = ValidadorHp;
