const Appointment = require('../model/appointment.model');

// Create a new appointment
const createAppointment = async (req, res) => {
  const { student_id, teacher_id, date, time } = req.body;

  const appointment = new Appointment({
    student_id,
    teacher_id,
    date,
    time,
  });

  try {
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm an appointment (teacher only)
const confirmAppointment = async (req, res) => {
  const { id } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Confirmed';
    await appointment.save();

    res.json({ message: 'Appointment confirmed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('student_id teacher_id');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  confirmAppointment,
  getAppointments,
};
