
class ValidatorHp {
  static isEmpty(param) {
    if (param === undefined || param == "" || param == null) {
      return true;
    }
    return false;
  }
}

module.exports = ValidatorHp;
