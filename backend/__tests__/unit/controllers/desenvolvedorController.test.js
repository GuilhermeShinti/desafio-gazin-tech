const DesenvolvedorRepository = require('../../../src/database/repositories/desenvolvedorRepository');
const { list, create, update, remove } = require('../../../src/controllers/desenvolvedorController');
const { SuccessResponse, NotFoundResponse, NoContentResponse, SuccessfulPagedResponse } = require('../../../src/controllers/responses');

jest.mock('../../../src/database/repositories/desenvolvedorRepository');
jest.mock('../../../src/controllers/responses');

const meta = {
    current_page: 10,
    last_page: 1,
    per_page: 1,
    total: 1,
}

describe('DesenvolvedorController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { params: {}, query: { page: 1, perPage: 10}, body: {} };
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

            expect(NotFoundResponse).toHaveBeenCalledWith(res, 'Nenhum desenvolvedor encontrado.');
        });

        it('should return 200 and desenvolvedores if found', async () => {
            const desenvolvedor = { id: 1, nome: 'John Doe' };
            const result = { count: 1, rows: [desenvolvedor] };
            DesenvolvedorRepository.findAll.mockResolvedValue(result);

            await list(req, res, next);

            expect(SuccessfulPagedResponse).toHaveBeenCalledWith(res, result, 1, 10);
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