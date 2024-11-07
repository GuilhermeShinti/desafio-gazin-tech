'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, _) => {
        await queryInterface.bulkInsert('niveis', [
            { nivel: 'Junior' },
            { nivel: 'Pleno' },
            { nivel: 'Senior' }
        ], {});
    },

    down: async (queryInterface, _) => {
        await queryInterface.bulkDelete('niveis', null, {});
    }
};