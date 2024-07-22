const express = require('express');
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',protect, admin, getAllUsers)
  router.route("/:id")
  .patch(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
