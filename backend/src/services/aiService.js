const Anthropic = require('@anthropic-ai/sdk');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.googleAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }

  async chat(model, messages, options = {}) {
    switch (model) {
      case 'claude':
        return await this.chatWithClaude(messages, options);
      case 'gpt':
        return await this.chatWithGPT(messages, options);
      case 'gemini':
        return await this.chatWithGemini(messages, options);
      default:
        throw new Error(`Unsupported AI model: ${model}`);
    }
  }

  async chatWithClaude(messages, options) {
    try {
      const response = await this.anthropic.messages.create({
        model: options.modelVersion || 'claude-3-5-sonnet-20241022',
        max_tokens: options.maxTokens || 4096,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      });

      return {
        content: response.content[0].text,
        model: 'claude',
        usage: response.usage
      };
    } catch (error) {
      console.error('Claude API error:', error);
      throw error;
    }
  }

  async chatWithGPT(messages, options) {
    try {
      const response = await this.openai.chat.completions.create({
        model: options.modelVersion || 'gpt-4-turbo-preview',
        messages: messages,
        max_tokens: options.maxTokens || 4096
      });

      return {
        content: response.choices[0].message.content,
        model: 'gpt',
        usage: response.usage
      };
    } catch (error) {
      console.error('GPT API error:', error);
      throw error;
    }
  }

  async chatWithGemini(messages, options) {
    try {
      const model = this.googleAI.getGenerativeModel({
        model: options.modelVersion || 'gemini-pro'
      });

      // Convert messages to Gemini format
      const chat = model.startChat({
        history: messages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      });

      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.content);
      const response = await result.response;

      return {
        content: response.text(),
        model: 'gemini',
        usage: null
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  async analyzeForRecommendations(conversationHistory, artDatabase) {
    const prompt = `Analyze this conversation and recommend relevant art based on the user's preferences, mood, and interests.

Conversation history:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Based on this conversation, suggest specific art recommendations from these categories:
- Artwork (paintings, sculptures, photography)
- Films and TV shows
- Music (albums, artists, songs)
- Books (fiction, non-fiction, poetry)
- Comics/Manga
- Animation

For each recommendation, provide:
1. Title and creator
2. Brief description
3. Why it matches the user's conversation (reasoning)
4. Relevance score (0-1)

Return recommendations as a JSON array.`;

    // Use Claude for analysis by default
    const response = await this.chatWithClaude([
      { role: 'user', content: prompt }
    ], { maxTokens: 8000 });

    try {
      // Extract JSON from response
      const jsonMatch = response.content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return [];
    } catch (error) {
      console.error('Failed to parse recommendations:', error);
      return [];
    }
  }

  async getRealTimeRecommendation(userMessage, conversationContext) {
    const prompt = `Based on this user's message in their art discovery conversation, provide ONE immediate art recommendation if appropriate.

User's latest message: "${userMessage}"

Conversation context:
${conversationContext.slice(-5).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

If this message warrants an immediate recommendation, respond with a JSON object:
{
  "shouldRecommend": true,
  "title": "Art title",
  "creator": "Creator name",
  "type": "artwork/film/music/book/comic/animation",
  "reason": "Why this is relevant right now",
  "relevanceScore": 0.95
}

If no immediate recommendation is warranted, respond with:
{"shouldRecommend": false}`;

    const response = await this.chatWithClaude([
      { role: 'user', content: prompt }
    ], { maxTokens: 1000 });

    try {
      const jsonMatch = response.content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return { shouldRecommend: false };
    } catch (error) {
      console.error('Failed to parse real-time recommendation:', error);
      return { shouldRecommend: false };
    }
  }
}

module.exports = new AIService();
