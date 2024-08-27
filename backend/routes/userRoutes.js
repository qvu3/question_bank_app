const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fallback to ensure JWT secret is defined
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

if (JWT_SECRET === 'default_secret_key') {
  console.warn('Warning: Using fallback JWT secret. Make sure JWT_SECRET is defined in your .env file.');
}

// User registration
router.post('/register', async (req, res) => {
  const { username, password, email} = req.body; 
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'Username already exists' });

    // Create a new user instance
    const user = new User({ username, password, email, role: 'student' }); 
    await user.save(); 

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'User registration failed' });
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Log to check if JWT_SECRET is correctly loaded
    // console.log('JWT Secret:', JWT_SECRET);

    // Create a JWT token with the user's ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },  // Include role in the payload
      JWT_SECRET, // Use the secret key
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role }); // Send role back to the client for front-end handling
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
