const DesenvolvedorRepository = require('../../../src/database/repositories/desenvolvedorRepository');
const { list, create, update, remove } = require('../../../src/controllers/desenvolvedorController');
const { SuccessResponse, NotFoundResponse, NoContentResponse } = require('../../../src/controllers/responses');

jest.mock('../../../src/database/repositories/desenvolvedorRepository');
jest.mock('../../../src/controllers/responses');

describe('DesenvolvedorController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { params: {}, query: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('list', () => {
        it('should return 404 if no desenvolvedores are found', async () => {
            DesenvolvedorRepository.findAll.mockResolvedValue({ count: 0, rows: [] });

            await list(req, res, next);

            expect(NotFoundResponse).toHaveBeenCalledWith(res, 'Não há desenvolvedores cadastrados.');
        });

        it('should return 200 and desenvolvedores if found', async () => {
            const desenvolvedores = { count: 1, rows: [{ id: 1, nome: 'John Doe' }] };
            DesenvolvedorRepository.findAll.mockResolvedValue(desenvolvedores);

            await list(req, res, next);

            expect(SuccessResponse).toHaveBeenCalledWith(res, desenvolvedores);
        });
    });

    describe('create', () => {
        it('should return 200 and created desenvolvedor', async () => {
            const desenvolvedor = { id: 1, nome: 'John Doe' };
            DesenvolvedorRepository.createDesenvolvedor.mockResolvedValue(desenvolvedor);

            await create(req, res, next);

            expect(SuccessResponse).toHaveBeenCalledWith(res, desenvolvedor);
        });
    });

    describe('update', () => {
        it('should return 200 and updated desenvolvedor', async () => {
            const desenvolvedor = { id: 1, nome: 'John Doe' };
            req.params.id = 1;
            DesenvolvedorRepository.updateDesenvolvedor.mockResolvedValue(desenvolvedor);

            await update(req, res, next);

            expect(SuccessResponse).toHaveBeenCalledWith(res, desenvolvedor);
        });
    });

    describe('remove', () => {
        it('should return 204 if desenvolvedor is deleted', async () => {
            req.params.id = 1;
            DesenvolvedorRepository.removeDesenvolvedor.mockResolvedValue();

            await remove(req, res, next);

            expect(NoContentResponse).toHaveBeenCalledWith(res);
        });
    });
});