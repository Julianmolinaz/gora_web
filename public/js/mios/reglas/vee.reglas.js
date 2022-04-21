const _required = (value) => {
  if (!value || !value.length) {
    return "El campo es requerido";
  }
}
const _email = (value) => {
  if (!value || !value.length) return true;
  
  if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
    return 'El campo debe ser un email valido';
  }
  return true;
};

const _yyyymmdd = (value) => {
  if (!value || !value.length) return true;

  if (!/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(value)) {
    return 'La fecha es incorrecta';
  }
  return true;
}