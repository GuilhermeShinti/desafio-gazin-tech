const { ValidationError } = require('../../utils/errors');

const SequelizeValidationErrorHandler = function (error) {
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        throw new ValidationError(validationErrors);
    }
}

module.exports = SequelizeValidationErrorHandler;