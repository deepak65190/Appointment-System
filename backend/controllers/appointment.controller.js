const Appointment = require('../model/appointment.model');

// Create a new appointment
const createAppointment = async (req, res) => {
  const { teacher_id, date, time } = req.body;
  const student_id = req.user._id; 

  const appointment = new Appointment({
    student_id,
    teacher_id,
    date,
    time,
  });

  try {
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm an appointment (teacher only)
const confirmAppointment = async (req, res) => {
  const { id } = req.params; // ID should come from URL params

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ensure the user is a teacher and the appointment is pending
    if (req.user.role !== 'Teacher' || appointment.status !== 'Pending') {
      return res.status(403).json({ message: 'Not authorized to confirm this appointment' });
    }

    appointment.status = 'Confirmed';
    await appointment.save();

    res.json({ message: 'Appointment confirmed', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('student', 'name email') // Populate student details
      .populate('teacher', 'name email'); // Populate teacher details
    
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
