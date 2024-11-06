const { NotFoundError, ValidationError } = require('../../utils/erros');
const Nivel = require('../models/nivel');

const findAll = async (body) => {
    try {
        const niveis = await Nivel.findAll(body);

        if (niveis.length === 0) {
            throw new NotFoundError('Não há níveis cadastrados.');
        }
        
        return niveis;
    } catch (error) {
        throw error;
    }    
};

const createNivel = async (body) => {
    try {
        return await Nivel.create(body);    
    } catch (error) {
        SequelizeValidationErrorHandler(error);
        throw error;
    }    
};

const updateNivel = async (id, body) => {
    try {
        let nivel = await Nivel.findOne({ where: { id } });

        if (!nivel) {
            throw new NotFoundError('Nível não encontrado.');
        }

        nivel.nivel = body.nivel;
        nivel = await nivel.save();       
    } catch (error) {
        SequelizeValidationErrorHandler(error);
        throw error;
    }
};

const removeNivel = async (id) => {
    try {
        let nivel = await Nivel.findOne({ where: { id } });

        if (!nivel) {
            throw new NotFoundError('Nível não encontrado.');
        }

        nivel.destroy();    
    } catch (error) {
        throw error;
    }
    
};

function SequelizeValidationErrorHandler(error) {
    if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map(err => err.message);
        throw new ValidationError(validationErrors);
    }
}

module.exports = {
    findAll,
    createNivel,
    updateNivel,
    removeNivel
}