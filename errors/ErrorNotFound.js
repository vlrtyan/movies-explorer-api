class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.statusCode = 404;
  }
}

module.exports = ErrorNotFound;
