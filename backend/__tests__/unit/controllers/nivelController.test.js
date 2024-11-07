const { list, create, update, remove } = require('../../../src/controllers/nivelController');
const NivelRepository = require('../../../src/database/repositories/nivelRepository');
const { ValidationError, ConflitError } = require('../../../src/utils/errors');

jest.mock('../../../src/database/repositories/nivelRepository');

describe('NivelController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { body: {}, query: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });    
    
    
    describe('list', () => {
        it('should return 404 if no levels are found', async () => {
            NivelRepository.findAll.mockResolvedValue({ items: [], total: 0 });

            await list(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Não há níveis cadastrados.' });
        });

        it('should return 200 and levels if found', async () => {
            const niveis = [{ id: 1, nivel: 'junior' }];
            NivelRepository.findAll.mockResolvedValue(niveis);

            await list(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(niveis);
        });
    });

    describe('create', () => {
        it('should return 400 if validation error occurs', async () => {
            const error = new ValidationError('Validation error');
            NivelRepository.createNivel.mockRejectedValue(error);

            await create(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });

        it('should return 200 and created level', async () => {
            const nivel = { id: 1, nivel: 'junior' };
            NivelRepository.createNivel.mockResolvedValue(nivel);

            await create(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(nivel);
        });
    });

    describe('update', () => {
        it('should return 200 and updated level', async () => {
            const updatedNivel = { id: 1, nivel: 'senior' };
            req.params.id = 1;
            req.body = { nivel: 'senior' };
            NivelRepository.updateNivel.mockResolvedValue(updatedNivel);

            await update(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedNivel);
        });

        it('should return 400 if validation error occurs', async () => {
            const error = new ValidationError('Validation error');
            req.params.id = 1;
            req.body = { nivel: 'senior' };
            NivelRepository.updateNivel.mockRejectedValue(error);

            await update(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('remove', () => {
        it('should return 204 if level is deleted', async () => {
            req.params.id = 1;
            NivelRepository.removeNivel.mockResolvedValue();

            await remove(req, res, next);

            expect(res.status).toHaveBeenCalledWith(204);
        });

        it('should return 400 if foreign key constraint error occurs', async () => {
            const error = new ConflitError('Foreign key constraint error');
            req.params.id = 1;
            NivelRepository.removeNivel.mockRejectedValue(error);

            await remove(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });    
});