const Joi = require('@hapi/joi');

const { errors: errorsList } = require('../config');
const { AppError } = require('../lib');

const schemaValidator = validations => (req, res, next) => {
  validations.forEach(validation => {
    const { schema, path } = validation;
    const errors = getValidationErrors(req[path], schema);
    if (errors) {
      const { message, code, status } = errorsList.BAD_REQUEST;
      next(new AppError(message, code, status, { errors }));
    }
  });
  next();
};

const getValidationErrors = (value, schema) => {
  try {
    Joi.attempt(value, schema);
  } catch (errors) {
    return errors;
  }
};

module.exports = schemaValidator;
