const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./../db/models');
require('dotenv').config();

const pg = require('pg');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialectModule: pg,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
      },
    },
  });

sequelize.sync();
setupModels(sequelize);

module.exports = sequelize;