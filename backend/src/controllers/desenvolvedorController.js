const DesenvolvedorRepository = require('../database/repositories/desenvolvedorRepository');

const list = async (req, res, next) => {
    try {
        const desenvolvedor = await DesenvolvedorRepository.findAll();    
        res.status(200).json(desenvolvedor);        
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const desenvolvedor = await DesenvolvedorRepository.createDesenvolvedor(req.body);
        res.status(200).json(desenvolvedor);
    } catch (error) {    
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const desenvolvedor = await DesenvolvedorRepository.updateDesenvolvedor(id, req.body);
        res.status(200).json(desenvolvedor);
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await DesenvolvedorRepository.removeDesenvolvedor(id);
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