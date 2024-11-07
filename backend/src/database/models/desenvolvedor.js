const { ValidationError } = require('../../utils/errors');
const { sequelize, DataTypes } = require('../index');

const Desenvolvedor = sequelize.define('Desenvolvedor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nivel_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'niveis',
            key: 'id'
        },
        validate: {
            isInt: true,
            notNull: {
                msg: 'O campo "nivel" não pode ser nulo'
            },
            notEmpty: {
                msg: 'O campo "nivel" não pode ser vazio'
            }
        }
    },
    nome: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
            notNull: {
                msg: 'O campo "nome" não pode ser nulo'
            },
            notEmpty: {
                msg: 'O campo "nome" não pode ser vazio'
            }
        }
    },
    sexo: DataTypes.CHAR(1),
    data_nascimento: DataTypes.DATE,
    hobby: DataTypes.STRING
    }, {
        tableName: 'desenvolvedores',
        timestamps: false,
        hooks: {
            beforeCreate: async (desenvolvedor, _) => ValidateNivel(desenvolvedor.nivel_id),
            beforeUpdate: async (desenvolvedor, _) => ValidateNivel(desenvolvedor.nivel_id),
        }
    }
);

async function ValidateNivel(nivelId) {
    const nivel = await sequelize.models.Nivel.findByPk(nivelId);
    if (!nivel) {
        throw new ValidationError('O campo "nivel" deve referenciar um nível válido');
    }
}

// Desenvolvedor.associate = function(models) {
//     Desenvolvedor.belongsTo(models.Nivel, { foreignKey: 'nivel_id' });
// };
// Desenvolvedor.belongsTo(, { foreignKey: 'nivel_id' });

module.exports = Desenvolvedor;
  