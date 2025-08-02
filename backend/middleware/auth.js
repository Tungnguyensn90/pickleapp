const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if token exists in database
    const [sessions] = await pool.execute(
      'SELECT * FROM user_sessions WHERE token = ? AND expires_at > NOW()',
      [token]
    );

    if (sessions.length === 0) {
      return res.status(401).json({ error: 'Invalid token or token expired.' });
    }

    // Get user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found.' });
    }

    req.user = users[0];
    req.token = token;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = auth; 