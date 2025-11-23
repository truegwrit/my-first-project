const express = require('express');
const pool = require('../database/connection');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Follow a user
router.post('/follow/:userId', authMiddleware, async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followingId = req.params.userId;

    if (followerId === parseInt(followingId)) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }

    const result = await pool.query(
      'INSERT INTO followers (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
      [followerId, followingId]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({ error: 'Already following this user' });
    }

    res.json({ message: 'Successfully followed user' });
  } catch (error) {
    console.error('Follow user error:', error);
    res.status(500).json({ error: 'Failed to follow user' });
  }
});

// Unfollow a user
router.delete('/follow/:userId', authMiddleware, async (req, res) => {
  try {
    const followerId = req.user.userId;
    const followingId = req.params.userId;

    const result = await pool.query(
      'DELETE FROM followers WHERE follower_id = $1 AND following_id = $2 RETURNING id',
      [followerId, followingId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not following this user' });
    }

    res.json({ message: 'Successfully unfollowed user' });
  } catch (error) {
    console.error('Unfollow user error:', error);
    res.status(500).json({ error: 'Failed to unfollow user' });
  }
});

// Get followers
router.get('/followers', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT u.id, u.username, u.display_name, u.avatar_url, f.created_at as followed_at
       FROM followers f
       JOIN users u ON f.follower_id = u.id
       WHERE f.following_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get followers error:', error);
    res.status(500).json({ error: 'Failed to fetch followers' });
  }
});

// Get following
router.get('/following', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT u.id, u.username, u.display_name, u.avatar_url, f.created_at as followed_at
       FROM followers f
       JOIN users u ON f.following_id = u.id
       WHERE f.follower_id = $1
       ORDER BY f.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Failed to fetch following' });
  }
});

// Create a review
router.post('/reviews', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { artItemId, rating, reviewText, isPublic } = req.body;

    if (!artItemId || !rating) {
      return res.status(400).json({ error: 'Art item ID and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      `INSERT INTO reviews (user_id, art_item_id, rating, review_text, is_public)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, artItemId, rating, reviewText, isPublic !== false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Get reviews for an art item
router.get('/reviews/art/:artItemId', authMiddleware, async (req, res) => {
  try {
    const artItemId = req.params.artItemId;

    const result = await pool.query(
      `SELECT r.*, u.username, u.display_name, u.avatar_url
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.art_item_id = $1 AND r.is_public = true
       ORDER BY r.created_at DESC`,
      [artItemId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Share a recommendation
router.post('/share', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recommendationId, shareMessage, isPublic } = req.body;

    if (!recommendationId) {
      return res.status(400).json({ error: 'Recommendation ID is required' });
    }

    const result = await pool.query(
      `INSERT INTO shared_recommendations (user_id, recommendation_id, share_message, is_public)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, recommendationId, shareMessage, isPublic !== false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Share recommendation error:', error);
    res.status(500).json({ error: 'Failed to share recommendation' });
  }
});

// Get public shared recommendations (feed)
router.get('/feed', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    const result = await pool.query(
      `SELECT sr.*,
              u.username, u.display_name, u.avatar_url,
              r.reason, r.relevance_score,
              a.type, a.title, a.creator, a.description, a.image_url, a.external_url,
              (SELECT COUNT(*) FROM likes WHERE shared_recommendation_id = sr.id) as like_count,
              EXISTS(SELECT 1 FROM likes WHERE shared_recommendation_id = sr.id AND user_id = $1) as is_liked
       FROM shared_recommendations sr
       JOIN users u ON sr.user_id = u.id
       JOIN recommendations r ON sr.recommendation_id = r.id
       JOIN art_items a ON r.art_item_id = a.id
       WHERE sr.is_public = true
       ORDER BY sr.created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.user.userId, limit, offset]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get feed error:', error);
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
});

// Like a shared recommendation
router.post('/like/:sharedRecId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const sharedRecId = req.params.sharedRecId;

    const result = await pool.query(
      'INSERT INTO likes (user_id, shared_recommendation_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
      [userId, sharedRecId]
    );

    if (result.rows.length === 0) {
      return res.status(409).json({ error: 'Already liked' });
    }

    res.json({ message: 'Successfully liked' });
  } catch (error) {
    console.error('Like error:', error);
    res.status(500).json({ error: 'Failed to like' });
  }
});

// Unlike a shared recommendation
router.delete('/like/:sharedRecId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const sharedRecId = req.params.sharedRecId;

    const result = await pool.query(
      'DELETE FROM likes WHERE user_id = $1 AND shared_recommendation_id = $2 RETURNING id',
      [userId, sharedRecId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Not liked' });
    }

    res.json({ message: 'Successfully unliked' });
  } catch (error) {
    console.error('Unlike error:', error);
    res.status(500).json({ error: 'Failed to unlike' });
  }
});

module.exports = router;
