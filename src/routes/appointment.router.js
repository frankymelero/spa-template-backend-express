const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

router 
    .get('/', appointmentController.get)
    .post('/', appointmentController.create)
    .put('/:id', appointmentController.update)
    .delete('/:token', appointmentController._delete)
    .get('/validate/:token', appointmentController.validate);

module.exports = router;