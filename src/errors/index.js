class Error {
  constructor(message = "") {
    this.message = message;
    this.name = "Error";
    this.status = 500;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.status = 404;
  }
}

class UniqueError extends Error {
  constructor(message) {
    super(message);
    this.name = "UniqueError";
    this.status = 404;
  } 
}

class SimpleError extends Error {
  constructor(message) {
    super(message);
    this.name = "SimpleError";
  }
}

module.exports = {
  Error,
  ValidationError,
  UniqueError,
  SimpleError
}
