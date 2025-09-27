// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import services to initialize them
require('./services/questionService');
require('./services/userService');
require('./services/emailService');

// Import routes
const quizRoutes = require('./routes/quizRoutes');

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // CORS configuration
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true
    }));

    // Body parsing middleware
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging middleware
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  setupRoutes() {
    // API routes
    this.app.use('/api', quizRoutes);

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        message: 'Quiz API Server',
        version: '1.0.0',
        endpoints: {
          health: 'GET /api/health',
          startQuiz: 'POST /api/start-quiz',
          submitAnswers: 'POST /api/submit-answers'
        }
      });
    });

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Endpoint not found',
        message: `The endpoint ${req.method} ${req.originalUrl} does not exist`
      });
    });
  }

  setupErrorHandling() {
    // Global error handler
    this.app.use((err, req, res, next) => {
      console.error('Global error handler:', err);
      
      // Don't leak error details in production
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      res.status(err.status || 500).json({
        error: 'Internal server error',
        message: isDevelopment ? err.message : 'Something went wrong',
        ...(isDevelopment && { stack: err.stack })
      });
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }

  start() {
    if (process.env.NODE_ENV !== 'test') {
      this.app.listen(this.port, () => {
        console.log(`🚀 Quiz API server running on port ${this.port}`);
        console.log(`📧 Email configured: ${process.env.EMAIL_USER ? 'Yes' : 'No'}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`📊 API Documentation: http://localhost:${this.port}`);
      });
    }
  }

  getApp() {
    return this.app;
  }
}

module.exports = App;

