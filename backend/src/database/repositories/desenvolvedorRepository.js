const { NotFoundError } = require('../../utils/errors');
const { Desenvolvedor, Nivel } = require('../models');
const SequelizeValidationErrorHandler = require('./sequelizeValidationHandler');

const findAll = async () => {
    const niveis = await Desenvolvedor.findAll({include:Nivel});

    if (niveis.length === 0) {
        throw new NotFoundError('Não há desenvolvedores cadastrados.');
    }
    
    return niveis; 
};

const createDesenvolvedor = async (body) => {
    try {
        return await Desenvolvedor.create(body);    
    } catch (error) {
        SequelizeValidationErrorHandler(error);
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
        SequelizeValidationErrorHandler(error);
        throw error;
    }
};

const removeDesenvolvedor = async (id) => {
    const desenvolvedor = await Desenvolvedor.findOne({ where: { id } });

    if (!desenvolvedor) {
        throw new NotFoundError('Desenvolvedor não encontrado.');
    }

    desenvolvedor.destroy();   
};

module.exports = {
    findAll,
    createDesenvolvedor,
    updateDesenvolvedor,
    removeDesenvolvedor
}