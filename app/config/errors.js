const httpStatus = require('http-status');

const PREFIX = 'TWITTER-KEYWORDS';

const errorBuilder = () => {
  const getCode = (status) => `${PREFIX}-${status}`;
  const messageKey = (statusCode) => `${statusCode}_MESSAGE`;

  const errors = {
    BAD_REQUEST: {
      code: getCode(httpStatus.BAD_REQUEST),
      status: httpStatus.BAD_REQUEST,
      message: httpStatus[messageKey(httpStatus.BAD_REQUEST)]
    },
    INTERNAL_SERVER_ERROR: {
      code: getCode(httpStatus.INTERNAL_SERVER_ERROR),
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: httpStatus[messageKey(httpStatus.INTERNAL_SERVER_ERROR)]
    }
  };

  return errors;
};

const errors = errorBuilder();

module.exports = errors;
