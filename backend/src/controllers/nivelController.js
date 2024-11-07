const NivelRepository = require('../database/repositories/nivelRepository');
const { SuccessResponse, NotFoundResponse, NoContentResponse } = require('./responses');

const list = async (req, res, next) => {
    try {
        const { ...filter } = req.query;
        const result = await NivelRepository.findAll(filter);

        if (result.total === 0) {
            return NotFoundResponse('Não há níveis cadastrados.');
        }

        SuccessResponse(res, result);        
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