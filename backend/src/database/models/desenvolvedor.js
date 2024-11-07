const { ValidationError } = require('../../utils/errors');

module.exports = (sequelize, DataTypes) => {
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
                beforeCreate: async (desenvolvedor, _) => ValidateNivel(desenvolvedor),
                beforeUpdate: async (desenvolvedor, _) => ValidateNivel(desenvolvedor),
            }
        }
    );

    Desenvolvedor.associate = function (models) {
        Desenvolvedor.belongsTo(models.Nivel, { foreignKey: 'nivel_id' });
    };

    return Desenvolvedor;
}

async function ValidateNivel(desenvolvedor) {
    const nivel = await desenvolvedor.sequelize.models.Nivel.findByPk(desenvolvedor.nivel_id);
    if (!nivel) {
        throw new ValidationError('O campo "nivel" deve referenciar um nível válido');
    }
}
  