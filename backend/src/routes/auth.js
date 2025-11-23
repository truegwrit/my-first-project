const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/connection');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, username, password, displayName } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ error: 'Email, username, and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (email, username, password_hash, display_name) VALUES ($1, $2, $3, $4) RETURNING id, email, username, display_name, created_at',
      [email, username, passwordHash, displayName || username]
    );

    const user = result.rows[0];

    // Create user preferences
    await pool.query(
      'INSERT INTO user_preferences (user_id) VALUES ($1)',
      [user.id]
    );

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Email or username already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await pool.query(
      'SELECT id, email, username, password_hash, display_name FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.display_name
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
