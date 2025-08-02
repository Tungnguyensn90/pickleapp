const express = require('express');
const { pool } = require('../config/database');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const path = require('path');
const fs = require('fs');

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
    const { first_name, last_name, date_of_birth, location, player_rank, elo, description } = req.body;

    // Build update query dynamically
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
    if (date_of_birth !== undefined) {
      updateFields.push('date_of_birth = ?');
      updateValues.push(date_of_birth);
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

    const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
    
    await pool.execute(query, updateValues);

    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({ 
      message: 'Profile updated successfully',
      user: users[0]
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Upload avatar
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get current avatar to delete old file
    const [currentUser] = await pool.execute(
      'SELECT avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    // Delete old avatar file if exists
    if (currentUser[0]?.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', currentUser[0].avatar);
      if (fs.existsSync(oldAvatarPath)) {
        fs.unlinkSync(oldAvatarPath);
      }
    }

    // Update avatar path in database
    const avatarPath = `/uploads/${req.file.filename}`;
    await pool.execute(
      'UPDATE users SET avatar = ? WHERE id = ?',
      [avatarPath, req.user.id]
    );

    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: avatarPath,
      user: users[0]
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
});

// Delete avatar
router.delete('/avatar', auth, async (req, res) => {
  try {
    // Get current avatar
    const [currentUser] = await pool.execute(
      'SELECT avatar FROM users WHERE id = ?',
      [req.user.id]
    );

    if (currentUser[0]?.avatar) {
      // Delete avatar file
      const avatarPath = path.join(__dirname, '..', currentUser[0].avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }

      // Remove avatar path from database
      await pool.execute(
        'UPDATE users SET avatar = NULL WHERE id = ?',
        [req.user.id]
      );
    }

    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, email, first_name, last_name, avatar, date_of_birth, location, player_rank, elo, description FROM users WHERE id = ?',
      [req.user.id]
    );

    res.json({
      message: 'Avatar deleted successfully',
      user: users[0]
    });

  } catch (error) {
    console.error('Avatar delete error:', error);
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

    // Get current user with password
    const [users] = await pool.execute(
      'SELECT password FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const bcrypt = require('bcryptjs');
    const isPasswordValid = await bcrypt.compare(currentPassword, users[0].password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedNewPassword, req.user.id]
    );

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router; 