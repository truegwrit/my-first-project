const express = require('express');
const pool = require('../database/connection');
const authMiddleware = require('../middleware/auth');
const aiService = require('../services/aiService');
const scrapingService = require('../services/scrapingService');

const router = express.Router();

// Create new conversation
router.post('/conversations', authMiddleware, async (req, res) => {
  try {
    const { title, aiModel } = req.body;
    const userId = req.user.userId;

    const result = await pool.query(
      'INSERT INTO conversations (user_id, title, ai_model) VALUES ($1, $2, $3) RETURNING *',
      [userId, title || 'New Conversation', aiModel || 'claude']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Get user's conversations
router.get('/conversations', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await pool.query(
      'SELECT * FROM conversations WHERE user_id = $1 ORDER BY updated_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

// Get conversation by ID
router.get('/conversations/:id', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.userId;

    const convResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (convResult.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const messagesResult = await pool.query(
      'SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
      [conversationId]
    );

    res.json({
      conversation: convResult.rows[0],
      messages: messagesResult.rows
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

// Send message
router.post('/conversations/:id/messages', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.userId;
    const { content } = req.body;

    // Verify conversation belongs to user
    const convResult = await pool.query(
      'SELECT * FROM conversations WHERE id = $1 AND user_id = $2',
      [conversationId, userId]
    );

    if (convResult.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const conversation = convResult.rows[0];

    // Save user message
    await pool.query(
      'INSERT INTO messages (conversation_id, role, content) VALUES ($1, $2, $3)',
      [conversationId, 'user', content]
    );

    // Get conversation history
    const historyResult = await pool.query(
      'SELECT role, content FROM messages WHERE conversation_id = $1 ORDER BY created_at ASC',
      [conversationId]
    );

    const messages = historyResult.rows;

    // Check for real-time recommendation
    const realtimeRec = await aiService.getRealTimeRecommendation(
      content,
      messages
    );

    let realtimeRecommendation = null;

    if (realtimeRec.shouldRecommend) {
      // Scrape art data
      const artData = await scrapingService.scrapeArtByType(
        realtimeRec.type,
        realtimeRec.title
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

      if (artResult.rows.length > 0) {
        const artItemId = artResult.rows[0].id;

        // Save recommendation
        const recResult = await pool.query(
          `INSERT INTO recommendations (conversation_id, user_id, art_item_id, reason, relevance_score, is_real_time)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [conversationId, userId, artItemId, realtimeRec.reason, realtimeRec.relevanceScore, true]
        );

        realtimeRecommendation = {
          ...recResult.rows[0],
          artItem: artData
        };
      }
    }

    // Get AI response
    const aiResponse = await aiService.chat(conversation.ai_model, messages);

    // Save AI message
    const aiMessageResult = await pool.query(
      'INSERT INTO messages (conversation_id, role, content, metadata) VALUES ($1, $2, $3, $4) RETURNING *',
      [conversationId, 'assistant', aiResponse.content, { model: aiResponse.model, usage: aiResponse.usage }]
    );

    // Update conversation timestamp
    await pool.query(
      'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [conversationId]
    );

    // Emit real-time update via socket.io
    const io = req.app.get('io');
    io.to(conversationId).emit('new_message', {
      conversationId,
      message: aiMessageResult.rows[0],
      realtimeRecommendation
    });

    res.json({
      message: aiMessageResult.rows[0],
      realtimeRecommendation
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Delete conversation
router.delete('/conversations/:id', authMiddleware, async (req, res) => {
  try {
    const conversationId = req.params.id;
    const userId = req.user.userId;

    const result = await pool.query(
      'DELETE FROM conversations WHERE id = $1 AND user_id = $2 RETURNING id',
      [conversationId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
});

module.exports = router;
