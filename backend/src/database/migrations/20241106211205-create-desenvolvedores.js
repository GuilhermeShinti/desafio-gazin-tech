'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('desenvolvedores', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nivel_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'niveis',
                    key: 'id'
                }
            },
            nome: {
                allowNull: false,
                type: Sequelize.STRING
            },
            sexo: {
                type: Sequelize.CHAR(1)
            },
            data_nascimento: {
                type: Sequelize.DATE
            },
            hobby: {
                type: Sequelize.STRING
            }
        });
    },

    async down (queryInterface, _) {
        await queryInterface.dropTable('desenvolvedores');
    }
};