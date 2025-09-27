const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Health check endpoint
router.get('/health', quizController.getHealth.bind(quizController));

// Start quiz with user details
router.post('/start-quiz', quizController.startQuiz.bind(quizController));

// Submit answers and get results
router.post('/submit-answers', quizController.submitAnswers.bind(quizController));

module.exports = router;

