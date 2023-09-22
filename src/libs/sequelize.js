const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./../db/models');
require('dotenv').config();

import * as pg from 'pg';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialectModule: pg,
    dialect: 'postgres',
  });

sequelize.sync();
setupModels(sequelize);

module.exports = sequelize;