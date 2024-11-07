const { findAll, createNivel, updateNivel, removeNivel } = require('../../../../src/database/repositories/nivelRepository');
const { Nivel } = require('../../../../src/database/models');

beforeAll(async () => {
    await Nivel.sequelize.authenticate();
    await Nivel.sync({ force: true });
});

afterAll(async () => {
    await Nivel.sequelize.close();
});

describe('NivelRepository Integration Tests', () => {
    beforeEach(async () => {
        await Nivel.destroy({ where: {} });
    });

    describe('findAll', () => {
        it('should return all levels', async () => {
            await Nivel.create({ nivel: 'junior' });
            const result = await findAll();
            expect(result.items.length).toBe(1);
            expect(result.items[0].nivel).toBe('junior');
        });
    });

    describe('createNivel', () => {
        it('should create a new level', async () => {
            const result = await createNivel({ nivel: 'junior' });
            expect(result.nivel).toBe('junior');
        });
    });

    describe('updateNivel', () => {
        it('should update an existing level', async () => {
            const nivel = await Nivel.create({ nivel: 'junior' });
            const result = await updateNivel(nivel.id, { nivel: 'senior' });
            expect(result.nivel).toBe('senior');
        });

        it('should throw NotFoundError if level does not exist', async () => {
            await expect(updateNivel(999, { nivel: 'senior' })).rejects.toThrow('Nível não encontrado.');
        });
    });

    describe('removeNivel', () => {
        it('should delete an existing level', async () => {
            const nivel = await Nivel.create({ nivel: 'junior' });
            await removeNivel(nivel.id);
            const result = await Nivel.findByPk(nivel.id);
            expect(result).toBeNull();
        });

        it('should throw NotFoundError if level does not exist', async () => {
            await expect(removeNivel(999)).rejects.toThrow('Nível não encontrado.');
        });
    });
});