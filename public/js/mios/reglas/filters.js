const misFilters = {
  miles(value) {
    if (!value) return 0;
    return new Intl.NumberFormat("es-CO").format(value);
  }
};
