const Joi = require('@hapi/joi');

const addKeywordsSearchValidator = Joi.object().keys({
  keyword: Joi.string().required()
});

module.exports = addKeywordsSearchValidator;
