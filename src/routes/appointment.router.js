const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

router 
    .get('/', appointmentController.get)
    .get('/validate/:token', appointmentController.validate)
    .post('/', appointmentController.create)
    .delete('/:token', appointmentController._delete);
 

module.exports = router;