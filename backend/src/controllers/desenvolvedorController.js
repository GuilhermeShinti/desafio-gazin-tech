const DesenvolvedorRepository = require('../database/repositories/desenvolvedorRepository');
const { SuccessResponse, NotFoundResponse, NoContentResponse } = require('./responses');

const list = async (req, res, next) => {
    try {
        const { ...filter } = req.query;
        const result = await DesenvolvedorRepository.findAll(filter);   
        
        if (result.count === 0) {
            return NotFoundResponse(res, 'Não há desenvolvedores cadastrados.');
        }

        SuccessResponse(res, result);        
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const desenvolvedor = await DesenvolvedorRepository.createDesenvolvedor(req.body);
        SuccessResponse(res, desenvolvedor);
    } catch (error) {    
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const desenvolvedor = await DesenvolvedorRepository.updateDesenvolvedor(id, req.body);
        SuccessResponse(res, desenvolvedor);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await DesenvolvedorRepository.removeDesenvolvedor(id);
        return NoContentResponse(res);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    list,
    create,
    update,
    remove
};