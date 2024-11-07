class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ValidationError';
      this.status = 400;
    }
}
  
class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
      this.status = 404;
    }
}

class ConflitError extends Error {
    constructor(message) {
      super(message);
      this.name = 'ConflitError';
      this.status = 409;
    }
}
  
module.exports = {
    ValidationError,
    NotFoundError,
    ConflitError
};