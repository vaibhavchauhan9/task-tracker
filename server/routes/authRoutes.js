const express = require('express');
const router  = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// ✅ Koi validation middleware nahi — controller mein hi handle hai
router.post('/register', registerUser);
router.post('/login',    loginUser);
router.get('/me',        protect, getMe);

module.exports = router;
