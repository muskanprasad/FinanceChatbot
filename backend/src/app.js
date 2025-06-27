const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const config = require('./config');

connectDB();

const app = express();

//CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Test route
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    time: new Date().toISOString()
  });
});

//Auth routes
app.use('/api/auth', authRoutes);

//Protected routes
app.use('/api/chat', require('./middleware/authMiddleware'), chatRoutes);

//Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    message: 'Something broke on the server!',
    error: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

module.exports = app;