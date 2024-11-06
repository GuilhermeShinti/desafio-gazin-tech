const NivelRepository = require('../database/repositories/nivelRepository');

const list = async (req, res, next) => {
    try {
        const level = await NivelRepository.findAll(req.body);    
        res.status(200).json(level);        
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const level = await NivelRepository.createNivel(req.body);
        res.status(200).json(level);
    } catch (error) {    
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const level = await NivelRepository.updateNivel(id, req.body);
        res.status(200).json(level);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await NivelRepository.removeNivel(id);
        return res.sendStatus(204);
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