const bcrypt        = require('bcryptjs');
const User          = require('../models/User');
const generateToken = require('../utils/generateToken');

// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      data: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error('Register error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Registration failed'
    });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required',
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id);

    return res.json({
      success: true,
      data: {
        _id:   user._id,
        name:  user.name,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Login failed',
    });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  return res.json({
    success: true,
    data: {
      _id:   req.user._id,
      name:  req.user.name,
      email: req.user.email,
    },
  });
};

module.exports = { registerUser, loginUser, getMe };
