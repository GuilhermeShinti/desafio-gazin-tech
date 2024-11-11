const DesenvolvedorRepository = require('../database/repositories/desenvolvedorRepository');
const { SuccessfulPagedResponse, SuccessResponse, NotFoundResponse, NoContentResponse } = require('./responses');

const list = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const { ...filter } = req.query;
        const result = await DesenvolvedorRepository.findAll(page, perPage, filter);   
        
        if (result.count === 0) {
            return NotFoundResponse(res, 'Nenhum desenvolvedor encontrado.');
        }

        return SuccessfulPagedResponse(res, result, page, perPage);      
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