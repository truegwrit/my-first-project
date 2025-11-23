-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    preferred_ai_model VARCHAR(50) DEFAULT 'claude',
    art_categories JSONB DEFAULT '[]',
    notification_settings JSONB DEFAULT '{}',
    privacy_settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id)
);

-- Conversations
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    ai_model VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Art items (cached from web scraping)
CREATE TABLE IF NOT EXISTS art_items (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(500) NOT NULL,
    creator VARCHAR(255),
    description TEXT,
    image_url TEXT,
    external_url TEXT,
    metadata JSONB DEFAULT '{}',
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendations
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    art_item_id INTEGER REFERENCES art_items(id) ON DELETE CASCADE,
    reason TEXT,
    relevance_score DECIMAL(3, 2),
    is_real_time BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Saved recommendations
CREATE TABLE IF NOT EXISTS saved_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recommendation_id INTEGER REFERENCES recommendations(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, recommendation_id)
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    art_item_id INTEGER REFERENCES art_items(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Followers
CREATE TABLE IF NOT EXISTS followers (
    id SERIAL PRIMARY KEY,
    follower_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    following_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Shared recommendations
CREATE TABLE IF NOT EXISTS shared_recommendations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recommendation_id INTEGER REFERENCES recommendations(id) ON DELETE CASCADE,
    share_message TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    shared_recommendation_id INTEGER REFERENCES shared_recommendations(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, shared_recommendation_id)
);

-- Create indexes
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX idx_recommendations_conversation_id ON recommendations(conversation_id);
CREATE INDEX idx_art_items_type ON art_items(type);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_art_item_id ON reviews(art_item_id);
CREATE INDEX idx_followers_follower_id ON followers(follower_id);
CREATE INDEX idx_followers_following_id ON followers(following_id);
