const { NotFoundError } = require('../../utils/errors');
const { Desenvolvedor, Nivel } = require('../models');
const SequelizeErrorHandler = require('./sequelizeErrorHandler');
const validateFilterFields = require('./validateFilterFieldsHelper');

const findAll = async (page = 1, perPage = 10, filters = {}) => {
    const offset = (page - 1) * perPage;
    const whereClause = validateFilterFields(filters, Desenvolvedor);
    const { count, rows } = await Desenvolvedor.findAndCountAll({
        where: whereClause,
        include: Nivel,
        limit: perPage,
        offset: offset
    });
    
    return {
        rows,
        count
    };
};

const createDesenvolvedor = async (body) => {
    try {
        return await Desenvolvedor.create(body);    
    } catch (error) {
        SequelizeErrorHandler(error);
        throw error;
    }    
};

const updateDesenvolvedor = async (id, body) => {
    try {
        const desenvolvedor = await Desenvolvedor.findOne({ where: { id } });

        if (!desenvolvedor) {
            throw new NotFoundError('Desenvolvedor não encontrado.');
        }
        
        desenvolvedor.nivel_id = body.nivel_id;
        desenvolvedor.nome = body.nome;
        desenvolvedor.sexo = body.sexo;
        desenvolvedor.data_nascimento = body.data_nascimento;
        desenvolvedor.hobby = body.hobby;
        return await desenvolvedor.save();       
    } catch (error) {
        SequelizeErrorHandler(error);
        throw error;
    }
};

const removeDesenvolvedor = async (id) => {
    const desenvolvedor = await Desenvolvedor.findOne({ where: { id } });

    if (!desenvolvedor) {
        throw new NotFoundError('Desenvolvedor não encontrado.');
    }

    await desenvolvedor.destroy();   
};

module.exports = {
    findAll,
    createDesenvolvedor,
    updateDesenvolvedor,
    removeDesenvolvedor
}