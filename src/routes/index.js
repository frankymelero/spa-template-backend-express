const express = require('express');

const appointmentRouter = require('./appointment.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/appointment', appointmentRouter);
}

module.exports = routerApi;