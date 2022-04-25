const size = (param) => (value) => {
  if (!value) return true;
  return value.length === param;
}

