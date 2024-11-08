const { findAll, createDesenvolvedor, updateDesenvolvedor, removeDesenvolvedor } = require('../../../../src/database/repositories/desenvolvedorRepository');
const Models = require('../../../../src/database/models');
const { faker } = require('@faker-js/faker');

const newDesenvolvedor = (nivelId) => {
    return {
        nome: faker.person.firstName(),
        sexo: 'M',
        data_nascimento: new Date('1990-01-01'),
        hobby: faker.word.verb(),
        nivel_id: nivelId
    };
}

beforeAll(async () => {
    await Models.sequelize.authenticate();
    await Models.Nivel.sync({ force: true });
    await Models.Desenvolvedor.sync({ force: true });
});

afterAll(async () => {
    await Models.sequelize.close();
});

describe('DesenvolvedorRepository Integration Tests', () => {
    beforeEach(async () => {
        await Models.Desenvolvedor.destroy({ where: {} });
        await Models.Nivel.destroy({ where: {} });
    });

    describe('findAll', () => {
        let desenvolvedor1;
        let desenvolvedor2;
        let desenvolvedor3;

        beforeEach(async () => {
            const nivel = await Models.Nivel.create({ nivel: 'junior' });
            desenvolvedor1 = await createDesenvolvedor(newDesenvolvedor(nivel.id));
            desenvolvedor2 = await createDesenvolvedor(newDesenvolvedor(nivel.id));
            desenvolvedor3 = await createDesenvolvedor(newDesenvolvedor(nivel.id));
        });

        it('should return all desenvolvedores', async () => {
            const result = await findAll();
            expect(result.items.length).toBe(3);
        });
        
        it('should return by id', async () => {
            const expectedId = desenvolvedor2.id;
            const result = await findAll({ id: expectedId });
            expect(result.items[0].id).toBe(expectedId);
        });
        
        it('should return by nome', async () => {
            const expectedNome = desenvolvedor3.nome;
            const result = await findAll({ nome: expectedNome });
            expect(result.items[0].nome).toBe(expectedNome);
        });   
    });

    describe('createDesenvolvedor', () => {
        it('should create a new desenvolvedor', async () => {
            const nivel = await Models.Nivel.create({ nivel: 'junior' });

            const desenvolvedor = newDesenvolvedor(nivel.id);
            const createdDesenvolvedor = await createDesenvolvedor(desenvolvedor);

            expect(createdDesenvolvedor.nome).toBe(desenvolvedor.nome);
        });
    });

    describe('updateDesenvolvedor', () => {
        it('should update an existing desenvolvedor', async () => {
            const nivel = await Models.Nivel.create({ nivel: 'junior' });

            const desenvolvedor = await createDesenvolvedor(newDesenvolvedor(nivel.id));
            const result = await updateDesenvolvedor(desenvolvedor.id, {
                nome: 'Jane Doe',
                sexo: 'F',
                data_nascimento: new Date('1991-01-01'),
                hobby: 'Reading',
                nivel_id: nivel.id
            });

            expect(result.nome).toBe('Jane Doe');
        });

        it('should throw NotFoundError if desenvolvedor does not exist', async () => {
            await expect(updateDesenvolvedor(999, {
                nome: 'Jane Doe',
                sexo: 'F',
                data_nascimento: new Date('1991-01-01'),
                hobby: 'Reading',
                nivel_id: 1
            })).rejects.toThrow('Desenvolvedor não encontrado.');
        });
    });

    describe('removeDesenvolvedor', () => {
        it('should delete an existing desenvolvedor', async () => {
            const nivel = await Models.Nivel.create({ nivel: 'junior' });

            const desenvolvedor = await createDesenvolvedor(newDesenvolvedor(nivel.id));
            await removeDesenvolvedor(desenvolvedor.id);
            const desenvolvedores = await findAll({ query: { id: desenvolvedor.id } });

            expect(desenvolvedores.total).toBe(0);
        });

        it('should throw NotFoundError if desenvolvedor does not exist', async () => {
            await expect(removeDesenvolvedor(999)).rejects.toThrow('Desenvolvedor não encontrado.');
        });
    });
});