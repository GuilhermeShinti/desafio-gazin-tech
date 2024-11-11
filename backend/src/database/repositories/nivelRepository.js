const { NotFoundError } = require('../../utils/errors');
const { Nivel } = require('../models');
const SequelizeErrorHandler = require('./sequelizeErrorHandler');
const validateFilterFields = require('./validateFilterFieldsHelper');

const findAll = async (page = 1, perPage = 10, filters = {}) => {
    const offset = (page - 1) * perPage;
    const whereClause = validateFilterFields(filters, Nivel);
    const { count, rows } = await Nivel.findAndCountAll({
        where: whereClause,
        limit: perPage,
        offset: offset
    });
    
    return {
        rows,
        count
    }; 
};

const createNivel = async (body) => {
    try {
        return await Nivel.create(body);    
    } catch (error) {
        SequelizeErrorHandler(error);
        throw error;
    }    
};

const updateNivel = async (id, body) => {
    try {
        const nivel = await Nivel.findOne({ where: { id } });

        if (!nivel) {
            throw new NotFoundError('Nível não encontrado.');
        }

        nivel.nivel = body.nivel;
        return await nivel.save();       
    } catch (error) {
        SequelizeErrorHandler(error);
        throw error;
    }
};

const removeNivel = async (id) => {
    try {
        const nivel = await Nivel.findOne({ where: { id } });

        if (!nivel) {
            throw new NotFoundError('Nível não encontrado.');
        }

        await nivel.destroy();    
    } catch (error) {
        SequelizeErrorHandler(error, Nivel);
        throw error;
    }

};

module.exports = {
    findAll,
    createNivel,
    updateNivel,
    removeNivel
}