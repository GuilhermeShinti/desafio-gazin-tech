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
        let nivel1;
        let nivel2;
        let nivel3;

        beforeEach(async () => {
            nivel1 = await createNivel({ nivel: 'junior' });
            nivel2 = await createNivel({ nivel: 'pleno' });
            nivel3 = await createNivel({ nivel: 'senior' });
        });

        it('should return all levels', async () => {
            const result = await findAll();
            expect(result.items.length).toBe(3);
        });

        it('should return by id', async () => {
            const expectedId = nivel2.id;
            const result = await findAll({ id: expectedId });
            expect(result.items[0].id).toBe(expectedId);
        });
        
        it('should return by nivel', async () => {
            const expectedNivel = nivel3.nivel;
            const result = await findAll({ nivel: expectedNivel });
            expect(result.items[0].nivel).toBe(expectedNivel);
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
            const nivel = await Nivel.create({ nivel: 'created' });
            const result = await updateNivel(nivel.id, { nivel: 'updated' });
            expect(result.nivel).toBe('updated');
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