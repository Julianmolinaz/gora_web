function getEnum(value) {
  let str = value.substr(5);
  let str_ = str.substr(0, str.length - 1).replace(/['']/g, "");
  
  let arr = str_.split(",");
  
  return arr; 
}

module.exports = {
  getEnum,
}
