const express = require('express');
const pool = require('../database/connection');
const authMiddleware = require('../middleware/auth');
const aiService = require('../services/aiService');
const scrapingService = require('../services/scrapingService');

const router = express.Router();

// Generate summary recommendations for a conversation
router.post('/conversations/:id/summary', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.userId;

    // Verify conversation belongs to user
    const convResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (convResult.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    // Get conversation history
    const messagesResult = await pool.query(
      'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
      [conversationId]
    );

    // Analyze conversation for recommendations
    const recommendations = await aiService.analyzeForRecommendations(
      messagesResult.rows,
      null
    );

    // Process each recommendation
    const savedRecommendations = [];

    for (const rec of recommendations) {
      try {
        // Scrape art data
        const artData = await scrapingService.scrapeArtByType(
          rec.type,
          rec.title
        );

        // Save art item
        const artResult = await pool.query(
          `INSERT INTO art_items (type, title, creator, description, image_url, external_url, metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT DO NOTHING
           RETURNING id`,
          [
            artData.type,
            artData.title,
            artData.creator,
            artData.description,
            artData.imageUrl,
            artData.externalUrl,
            artData.metadata
          ]
        );

        let artItemId;
        if (artResult.rows.length > 0) {
          artItemId = artResult.rows[0].id;
        } else {
          // Art item already exists, find it
          const existingArt = await pool.query(
            'SELECT id FROM art_items WHERE title = $1 AND creator = $2',
            [artData.title, artData.creator]
          );
          artItemId = existingArt.rows[0]?.id;
        }

        if (artItemId) {
          // Save recommendation
          const recResult = await pool.query(
            `INSERT INTO recommendations (conversation_id, user_id, art_item_id, reason, relevance_score, is_real_time)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [conversationId, userId, artItemId, rec.reason, rec.relevanceScore, false]
          );

          savedRecommendations.push({
            ...recResult.rows[0],
            artItem: artData
          });
        }
      } catch (error) {
        console.error('Error processing recommendation:', error);
      }
    }

    res.json({
      recommendations: savedRecommendations,
      total: savedRecommendations.length
    });
  } catch (error) {
    console.error('Generate summary error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

// Get recommendations for a conversation
router.get('/conversations/:id', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT r.*, a.type, a.title, a.creator, a.description, a.image_url, a.external_url, a.metadata
       FROM recommendations r
       JOIN art_items a ON r.art_item_id = a.id
       WHERE r.conversation_id = $1 AND r.user_id = $2
       ORDER BY r.relevance_score DESC, r.created_at DESC`,
      [conversationId, userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// Save a recommendation
router.post('/:id/save', authMiddleware, async (req, res) => {
  try {
    const recommendationId = req.params.id;
    const userId = req.user.userId;
    const { notes } = req.body;

    const result = await pool.query(
      `INSERT INTO saved_recommendations (user_id, recommendation_id, notes)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, recommendation_id) DO UPDATE SET notes = $3
       RETURNING *`,
      [userId, recommendationId, notes || null]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Save recommendation error:', error);
    res.status(500).json({ error: 'Failed to save recommendation' });
  }
});

// Get all saved recommendations for user
router.get('/saved', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      `SELECT sr.*, r.reason, r.relevance_score,
              a.type, a.title, a.creator, a.description, a.image_url, a.external_url, a.metadata
       FROM saved_recommendations sr
       JOIN recommendations r ON sr.recommendation_id = r.id
       JOIN art_items a ON r.art_item_id = a.id
       WHERE sr.user_id = $1
       ORDER BY sr.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get saved recommendations error:', error);
    res.status(500).json({ error: 'Failed to fetch saved recommendations' });
  }
});

// Remove saved recommendation
router.delete('/saved/:id', authMiddleware, async (req, res) => {
  try {
    const savedRecId = req.params.id;
    const userId = req.user.userId;

    const result = await pool.query(
      'DELETE FROM saved_recommendations WHERE id = $1 AND user_id = $2 RETURNING id',
      [savedRecId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Saved recommendation not found' });
    }

    res.json({ message: 'Saved recommendation removed' });
  } catch (error) {
    console.error('Remove saved recommendation error:', error);
    res.status(500).json({ error: 'Failed to remove saved recommendation' });
  }
});

module.exports = router;
