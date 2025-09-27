const questionService = require('../services/questionService');
const userService = require('../services/userService');
const emailService = require('../services/emailService');

class QuizController {
  constructor() {
    this.questionService = questionService;
    this.userService = userService;
    this.emailService = emailService;
  }

  // Health check endpoint
  getHealth(req, res) {
    res.json({
      status: 'OK',
      message: 'Quiz API is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    });
  }

  // Start quiz with user details
  async startQuiz(req, res) {
    try {
      const { name, email, phone } = req.body;

      // Validate user data
      const validation = this.userService.validateUserData({ name, email, phone });
      if (!validation.isValid) {
        return res.status(400).json({
          error: 'Invalid user data',
          details: validation.errors
        });
      }

      // Create user and get session ID
      const user = await this.userService.createUser({ name, email, phone });
      
      // Get random questions for the quiz
      const questions = await this.questionService.getRandomQuestions(5);

      res.json({
        success: true,
        sessionId: user.sessionId,
        questions: questions,
        message: 'Quiz started successfully'
      });

    } catch (error) {
      console.error('Error starting quiz:', error);
      res.status(500).json({
        error: 'Failed to start quiz',
        message: error.message
      });
    }
  }

  // Submit answers and get results
  async submitAnswers(req, res) {
    try {
      const { sessionId, answers } = req.body;

      if (!sessionId || !answers || !Array.isArray(answers)) {
        return res.status(400).json({
          error: 'Invalid request data',
          message: 'Session ID and answers array are required'
        });
      }

      // Get user by session ID
      const user = await this.userService.getUserBySessionId(sessionId);
      if (!user) {
        return res.status(404).json({
          error: 'Session not found',
          message: 'Invalid session ID'
        });
      }

      // Get correct answers for the questions
      const questionIds = answers.map(answer => answer.questionId);
      const correctAnswers = await this.questionService.getCorrectAnswers(questionIds);

      // Calculate score
      const results = this.calculateScore(answers, correctAnswers);
      const score = results.filter(result => result.isCorrect).length;
      const totalQuestions = answers.length;
      const percentage = Math.round((score / totalQuestions) * 100);

      // Prepare quiz result for email
      const quizResult = {
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        score,
        totalQuestions,
        percentage,
        results
      };

      // Send email notification (if configured)
      const emailResult = await this.emailService.sendQuizResults(quizResult);
      
      res.json({
        success: true,
        score,
        totalQuestions,
        percentage,
        results,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        emailSent: emailResult.success,
        message: 'Quiz completed successfully'
      });

    } catch (error) {
      console.error('Error submitting answers:', error);
      res.status(500).json({
        error: 'Failed to submit answers',
        message: error.message
      });
    }
  }

  // Calculate score and prepare results
  calculateScore(userAnswers, correctAnswers) {
    const results = [];

    userAnswers.forEach(userAnswer => {
      const correctAnswer = correctAnswers.find(
        correct => correct.question_id === userAnswer.questionId
      );

      if (correctAnswer) {
        results.push({
          questionId: userAnswer.questionId,
          userAnswer: userAnswer.optionId,
          correctAnswer: correctAnswer.correct_option_id,
          correctAnswerText: correctAnswer.correct_answer,
          isCorrect: userAnswer.optionId === correctAnswer.correct_option_id
        });
      }
    });

    return results;
  }

  // Get all questions (admin endpoint)
  async getAllQuestions(req, res) {
    try {
      const questions = await this.questionService.getAllQuestions();
      res.json({
        success: true,
        questions,
        count: questions.length
      });
    } catch (error) {
      console.error('Error getting questions:', error);
      res.status(500).json({
        error: 'Failed to get questions',
        message: error.message
      });
    }
  }

  // Get all users (admin endpoint)
  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json({
        success: true,
        users,
        count: users.length
      });
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({
        error: 'Failed to get users',
        message: error.message
      });
    }
  }
}

module.exports = new QuizController();
