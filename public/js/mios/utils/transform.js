const arrToString = (arr, separador) => {
  let str = "";

  arr.forEach(item => {
    str += item + separador;
  });

  return str;
}
