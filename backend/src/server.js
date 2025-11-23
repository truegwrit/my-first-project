require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const recommendationRoutes = require('./routes/recommendations');
const userRoutes = require('./routes/user');
const socialRoutes = require('./routes/social');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/user', userRoutes);
app.use('/api/social', socialRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.io for real-time chat
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`Client ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on('send_message', async (data) => {
    // Emit message to conversation room
    io.to(data.conversationId).emit('new_message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Make io accessible to routes
app.set('io', io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = { app, io };
