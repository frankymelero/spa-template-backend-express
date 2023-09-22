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
        const { validated, ...restOfData } = data;
        const res = await models.Appointment.create(restOfData);
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
            if (model.validated) {
              // Si el campo 'validated' es true, significa que la cita ya ha sido validada anteriormente
              return { status: 404 , success: false, message: "Cita ya validada anteriormente." };
            } else {
              // Obtén los detalles de la cita desde la base de datos
              const { date, hour, name, email } = model.dataValues;
      
              // Actualiza el campo validated a true
              await model.update({ validated: true });
              
              return { status: 200, success: true, message: "Cita validada exitosamente." };
            }
          } else {
            return { status: 404, success: false, message: "No se encontró una cita con el token proporcionado." };
          }
        } catch (error) {
          console.error('Error al validar cita por token:', error);
          throw error;
        }
      }
}

module.exports = AppointmentService;