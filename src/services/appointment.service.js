const { models } = require('../libs/sequelize');

class AppointmentService {

    constructor(){}

    async findIfValidated(){
        try {
            const res = await models.Appointment.findAll({
              where: {
                validated: true,
              },
              attributes: ['id', 'date', 'hour', 'serviceid', 'duration'],
            });
            return res;
          } catch (error) {
            // Maneja cualquier error que pueda ocurrir durante la consulta a la base de datos
            console.error('Error al buscar citas validadas:', error);
            throw error;
          }
    }

    async findOne(id){
        const res = await models.Appointment.findByPk(id);
        return res;
    }

    async create(data){
        const res = await models.Appointment.create(data);
        return res;
    }

    async update(id, data){
        const model = await this.findOne(id);
        const res = await (model.update(data));
        return res;
    }

    async deleteByToken(token) {
        try {
          const model = await models.Appointment.findOne({
            where: {
              token: token,
            },
          });
      
          if (model) {
            await model.destroy();
            return { deleted: true };
          } else {
            return { deleted: false, message: "No se encontró una cita con el token proporcionado." };
          }
        } catch (error) {
          // Maneja cualquier error que pueda ocurrir durante la consulta a la base de datos
          console.error('Error al eliminar cita por token:', error);
          throw error;
        }
      }

      async validateByToken(token) {
        try {
          const model = await models.Appointment.findOne({
            where: {
              token: token,
            },
          });
      
          if (model) {
            // Actualiza el campo validated a true
            await model.update({ validated: true });
      
            return { success: true, message: "Cita validada exitosamente." };
          } else {
            return { success: false, message: "No se encontró una cita con el token proporcionado." };
          }
        } catch (error) {
          // Maneja cualquier error que pueda ocurrir durante la consulta a la base de datos
          console.error('Error al validar cita por token:', error);
          throw error;
        }
      }
      
}

module.exports = AppointmentService;