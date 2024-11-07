const { ValidationError, ConflitError } = require('../../utils/errors');

const SequelizeErrorHandler = function (error, model) {
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        throw new ValidationError(validationErrors);
    }

    if (error.name === 'SequelizeForeignKeyConstraintError') {
        const associatedTable = Object.values(model.associations)[0].target.tableName;
        const message = `Não é possível excluir o registro, pois ele está associado a um ou mais registros em ${associatedTable}.`;
        throw new ConflitError(message);
    }
}

module.exports = SequelizeErrorHandler;