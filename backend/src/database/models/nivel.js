const { sequelize, DataTypes } = require('../index');

const Nivel = sequelize.define('Nivel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nivel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O campo "nivel" não pode ser nulo'
            },
            notEmpty: {
                msg: 'O campo "nivel" não pode ser vazio'
            }
        }
    }
  }, {
    tableName: 'niveis',
    timestamps: false
  }
);

module.exports = Nivel;
  