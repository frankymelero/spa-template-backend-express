const { Appointment, AppointmentSchema } = require('./appointment.model');

function setupModels(sequelize){
    Appointment.init(AppointmentSchema, Appointment.config(sequelize))
}

module.exports = setupModels;