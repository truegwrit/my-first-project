const express = require('express');
const pool = require('../database/connection');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const userResult = await pool.query(
      'SELECT id, email, username, display_name, avatar_url, bio, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const prefsResult = await pool.query(
      'SELECT * FROM user_preferences WHERE user_id = $1',
      [userId]
    );

    res.json({
      ...userResult.rows[0],
      preferences: prefsResult.rows[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { displayName, avatarUrl, bio } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET display_name = COALESCE($1, display_name),
           avatar_url = COALESCE($2, avatar_url),
           bio = COALESCE($3, bio),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id, email, username, display_name, avatar_url, bio`,
      [displayName, avatarUrl, bio, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update user preferences
router.put('/preferences', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { preferredAiModel, artCategories, notificationSettings, privacySettings } = req.body;

    const result = await pool.query(
      `UPDATE user_preferences
       SET preferred_ai_model = COALESCE($1, preferred_ai_model),
           art_categories = COALESCE($2, art_categories),
           notification_settings = COALESCE($3, notification_settings),
           privacy_settings = COALESCE($4, privacy_settings),
           updated_at = CURRENT_TIMESTAMP
       WHERE user_id = $5
       RETURNING *`,
      [preferredAiModel, artCategories, notificationSettings, privacySettings, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

// Get user's public profile (for other users to view)
router.get('/:username', authMiddleware, async (req, res) => {
  try {
    const username = req.params.username;

    const result = await pool.query(
      'SELECT id, username, display_name, avatar_url, bio, created_at FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Get follower/following counts
    const followerCount = await pool.query(
      'SELECT COUNT(*) FROM followers WHERE following_id = $1',
      [user.id]
    );

    const followingCount = await pool.query(
      'SELECT COUNT(*) FROM followers WHERE follower_id = $1',
      [user.id]
    );

    // Check if current user is following this user
    const isFollowing = await pool.query(
      'SELECT id FROM followers WHERE follower_id = $1 AND following_id = $2',
      [req.user.userId, user.id]
    );

    res.json({
      ...user,
      followerCount: parseInt(followerCount.rows[0].count),
      followingCount: parseInt(followingCount.rows[0].count),
      isFollowing: isFollowing.rows.length > 0
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
