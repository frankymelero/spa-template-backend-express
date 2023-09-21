const { models } = require('../libs/sequelize');
const nodemailer = require('nodemailer');

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
            // Obtén los detalles de la cita desde la base de datos
            const { date, hour, name, email, token } = model.dataValues;
      
            // Actualiza el campo validated a true
            await model.update({ validated: true });
      
            // Construye el enlace con el token
            const link = `https://loqueseaq.com/appointment/${token}`;
      
            // Personaliza el mensaje del correo electrónico con los datos de la cita y el enlace
            const message = `La cita para el ${date} a las ${hour} con el nombre ${name} (${email}) y token ${token} se ha validado exitosamente. Puedes acceder a tu cita <a href="${link}">aquí</a>.`;
      
            // Configura el transporte de Nodemailer
            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'franmelerogallardo@gmail.com',
                pass: 'Dioesdiosp6hp1w'
              }
            });
      
            // Define las opciones del correo electrónico
            const mailOptions = {
              from: 'franmelerogallardo@gmail.com',
              to: email, // Utiliza la dirección de correo electrónico obtenida de la base de datos
              subject: 'Validación de Cita',
              html: message, // Usa el mensaje personalizado como HTML
            };
      
            // Envía el correo electrónico
            await transporter.sendMail(mailOptions);
      
            return { success: true, message: "Cita validada exitosamente." };
          } else {
            return { success: false, message: "No se encontró una cita con el token proporcionado." };
          }
        } catch (error) {
          console.error('Error al validar cita por token:', error);
          throw error;
        }
      }
      
}

module.exports = AppointmentService;