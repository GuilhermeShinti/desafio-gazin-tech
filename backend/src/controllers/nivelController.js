const NivelRepository = require('../database/repositories/nivelRepository');
const { SuccessfulPagedResponse, SuccessResponse, NotFoundResponse, NoContentResponse } = require('./responses');

const list = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const { ...filter } = req.query;
        const result = await NivelRepository.findAll(page, perPage, filter);

        if (result.count === 0) {
            return NotFoundResponse(res, 'Nenhum nível encontrado.');
        }

        return SuccessfulPagedResponse(res, result, page, perPage);  
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const level = await NivelRepository.createNivel(req.body);
        SuccessResponse(res, level);
    } catch (error) {    
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const level = await NivelRepository.updateNivel(id, req.body);
        SuccessResponse(res, level);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await NivelRepository.removeNivel(id);
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