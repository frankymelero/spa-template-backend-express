const { Model, DataTypes } = require('sequelize');

const APPOINTMENTS = 'appointments';

class Appointment extends Model {

  static config(sequelize) {

    return {
      sequelize, 
      tablename: APPOINTMENTS,
      modelName: 'Appointment',
      timestamps: false
    }
  }
}

const AppointmentSchema = {
  
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  date: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'date'
  },
  hour: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'hour'
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name'
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'email'
  },
  duration: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'duration'
  },
  token: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'token'
  },
  validated: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'validated'
  },
  serviceid: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'serviceid'
  }
}

module.exports = { Appointment, AppointmentSchema };