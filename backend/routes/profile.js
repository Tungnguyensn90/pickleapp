const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');
const auth = require('../middleware/auth');
const { upload, uploadChibi } = require('../middleware/upload');
const chibiAvatarService = require('../services/chibiAvatarService');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  try {
    const { first_name, last_name, location, player_rank, elo, description } = req.body;
    
    const updateFields = [];
    const updateValues = [];

    if (first_name !== undefined) {
      updateFields.push('first_name = ?');
      updateValues.push(first_name);
    }
    if (last_name !== undefined) {
      updateFields.push('last_name = ?');
      updateValues.push(last_name);
    }
    if (location !== undefined) {
      updateFields.push('location = ?');
      updateValues.push(location);
    }
    if (player_rank !== undefined) {
      updateFields.push('player_rank = ?');
      updateValues.push(player_rank);
    }
    if (elo !== undefined) {
      updateFields.push('elo = ?');
      updateValues.push(elo);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateValues.push(req.user.id);

    await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Upload avatar (always creates chibi version)
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create chibi avatar from uploaded image
    const chibiResult = await chibiAvatarService.createChibiAvatar(req.file.path, req.user.id);

    if (!chibiResult.success) {
      return res.status(500).json({ error: 'Failed to create chibi avatar' });
    }

    const avatarPath = `/uploads/chibi/${chibiResult.filename}`;

    // Delete old avatar if exists
    const [oldUser] = await pool.execute(
      'SELECT avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    if (oldUser[0].avatar) {
      const oldAvatarPath = path.join(__dirname, '..', oldUser[0].avatar);
      try {
        await fsPromises.unlink(oldAvatarPath);
      } catch (error) {
        console.error('Error deleting old avatar:', error);
      }
    }

    // Update user avatar with chibi version
    await pool.execute(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatarPath, req.user.id]
    );

    // Clean up original uploaded file
    try {
      await fsPromises.unlink(req.file.path);
    } catch (error) {
      console.error('Error deleting original file:', error);
    }

    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ 
      user: users[0],
      message: 'Chibi avatar created successfully!'
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ error: 'Failed to create chibi avatar' });
  }
});

// Delete avatar
router.delete('/avatar', auth, async (req, res) => {
  try {
    const [user] = await pool.execute(
      'SELECT avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    if (user[0].avatar) {
      const avatarPath = path.join(__dirname, '..', user[0].avatar);
      try {
        await fsPromises.unlink(avatarPath);
      } catch (error) {
        console.error('Error deleting avatar file:', error);
      }
    }

    // Clear avatar fields in database
    await pool.execute(
      'UPDATE users SET avatar = NULL WHERE id = ?',
      [req.user.id]
    );

    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ user: users[0] });
  } catch (error) {
    console.error('Delete avatar error:', error);
    res.status(500).json({ error: 'Failed to delete avatar' });
  }
});

// Change password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    // Get current user password
    const [users] = await pool.execute(
      'SELECT password FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, users[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, req.user.id]
    );

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router; 