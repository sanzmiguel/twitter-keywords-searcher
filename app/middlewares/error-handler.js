const { AppError } = require('../lib');

function errorHandler (error, req, res, next) {
  if (error instanceof AppError) {
    const { status, code, message, data } = error;
    return res.status(status).send({ message, code, status, data });
  }
  next();
}

module.exports = errorHandler;
