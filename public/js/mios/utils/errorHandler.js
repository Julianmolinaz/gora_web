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
  console.error(err);
  if (err && err.response) {
    const myError = err.response.data;
    if (myError.body) {
      if (myError.body.name === 'ValidationError') {
        alertify.alert("Erro de validación", errorArrayToString(myError.body.message, "<br>"), () => {});
      } else if (myError.body.name === 'SimpleError'){
        alertify.alert('Error', myError.body.message, () => {});
      } else {
        alertify.alert('Error', 'Ocurrió un error, comuniquese con un asesor.');
      }
    } else {
      alertify.alert('Error', myError);
    }
    
  } 
  else if (err.name === "SimpleError") {
    alertify.alert('Error', err.message, () => {});
  }
  else {
    alertify.alert('Error', err.message ?? err);
  }
}

