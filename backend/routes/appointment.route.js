const express = require('express');
const { protect } = require('../middleware/auth.middleware'); // Auth middleware to protect routes
const {
  createAppointment,
  confirmAppointment,
  getAppointments
} = require('../controllers/appointment.controller'); // Import controller functions

const router = express.Router();

// Route to create a new appointment (accessible to students)
router.post('/', protect, createAppointment);

// Route to confirm an appointment (accessible to teachers)
router.put('/:id/confirm', protect, confirmAppointment);

// Route to get all appointments (accessible to admins or authorized users)
router.get('/', protect, getAppointments);

module.exports = router;
