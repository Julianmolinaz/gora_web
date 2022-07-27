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

class UniqueError extends Error {
  constructor(message) {
    super(message);
    this.name = "UniqueError";
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
