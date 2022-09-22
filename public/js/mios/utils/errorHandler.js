/**
 * Convierte un arra de errores es un string
 * @params {Array} arrErrors
 * @params {string} separator ej "<br>" "\n"
 */

function errorArrayToString (arrErrors, separator) {
  let str = "";
  arrErrors.forEach(err => {
    str += err + separator;
  });
  return str;
}

function errorHandler(err) {
  if (err && err.response) {
    const myError = err.response.data;
    console.log({ myError });
    if (myError.body.name === 'ValidationError') {
      alertify.alert("Erro de validación", errorArrayToString(myError.body.message, "<br>"), () => {});
    } else if (myError.body.name === 'SimpleError'){
      alertify.alert('Error', myError.body.message, () => {});
    } else {
      alertify.alert('Error', 'Ocurrió un error, comuniquese con un asesor.');
    }
  } 
  else if (err.name === "SimpleError") {
    alertify.alert('Error', err.message, () => {});
  }
  else {
    console.log("else", err);
    alertify.alert('Error', err);
  }
}

