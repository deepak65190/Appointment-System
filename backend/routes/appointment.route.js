const express = require('express');
const { createAppointment, confirmAppointment, getAppointments } = require('../controllers/appointment.controller');
const { protect, teacherOnly } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', protect, createAppointment);
router.put('/confirm', protect)
