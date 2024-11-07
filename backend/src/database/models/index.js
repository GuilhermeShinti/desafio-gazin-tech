const { sequelize, DataTypes } = require('../index');
const Nivel = require('./nivel')(sequelize, DataTypes);
const Desenvolvedor = require('./desenvolvedor')(sequelize, DataTypes);

const models = {
  Nivel,
  Desenvolvedor
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

module.exports = models;