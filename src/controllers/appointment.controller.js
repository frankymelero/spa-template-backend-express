const AppointmentService = require('../services/appointment.service');
const service = new AppointmentService();

const create = async (req, res) =>{
    try {
        const response = await service.create(req.body);
        res.json({success: true, data: response});
    } catch (err){
        res.status(500).send({sucess: false, message: err.message});

    }
}

const get = async (req, res) => {
    try{
        const response = await service.findIfValidated();
        res.json({success: true, data: response});
    } catch (err){
        res.status(500).send({success: false, message: err.message});
    }
}

const getById = async (req, res) => {
    try{
        const response = await service.findOne();
        res.json({success: true, data: response});
    } catch (err) {
        res.status(500).send({sucess: false, message: err.message});
    }
}

const update = async (req, res) => {
    try{
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
        res.json(response);
    } catch (err) {
        res.status(500).send({success: false, message: err.message});
    }
}

const _delete = async( req, res) => {

    try {
        const { token } = req.params;
        const response = await service.deleteByToken(token);
        res.json(response);
    } catch(err) {
        res.status(500).send({sucess: false, message: err.message});
    }
}


const validate = async (req, res) => {
    try {
      const { token } = req.params;
      const response = await service.validateByToken(token);
      res.json(response);
    } catch (err) {
      res.status(500).send({ success: false, message: err.message });
    }
  }

module.exports = {
    create, get, getById, update, _delete, validate
};