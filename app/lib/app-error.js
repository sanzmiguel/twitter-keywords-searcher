class AppError extends Error {
  constructor (message, code, status, data) {
    super(message);
    this.message = message;
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

module.exports = AppError;
