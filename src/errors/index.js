class Error {
  constructor(message = "") {
    this.message = message;
    this.name = "Error";
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class uniqueError extends Error {
  constructor(message) {
    super(message);
    this.name = "UniqueError";
  } 
}

module.exports = {
  ValidationError,
  UniqueError,
}
