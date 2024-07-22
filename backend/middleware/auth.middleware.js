const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const protect = async (req, res, next) => {
  let token;
console.log("p")

    try {
      token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

     req.user = await User.findById(decoded.id).select('-password');
    
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
    console.log("ad")
  if (req.user && req.user.role === 'Institute') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role === 'Teacher') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a teacher' });
  }
};

module.exports = { protect, admin, teacherOnly };
