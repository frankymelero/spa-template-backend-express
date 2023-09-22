const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./../db/models');
require('dotenv').config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    ssl: true, // Habilita SSL si es necesario (puede depender de tu configuración de base de datos)
    dialectOptions: {
      ssl: {
        require: true, // Opcional, dependiendo de la configuración de tu base de datos
      },
    },
  });

sequelize.sync();
setupModels(sequelize);

module.exports = sequelize;