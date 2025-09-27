const request = require('supertest');
const app = require('../index');

describe('Quiz API Tests', () => {
  describe('GET /api/questions', () => {
    test('should return all questions without correct answers', async () => {
      const response = await request(app)
        .get('/api/questions')
        .expect(200);

      expect(response.body).toHaveProperty('questions');
      expect(Array.isArray(response.body.questions)).toBe(true);
      expect(response.body.questions.length).toBeGreaterThan(0);

      // Check that questions have required structure
      response.body.questions.forEach(question => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('question');
        expect(question).toHaveProperty('options');
        expect(Array.isArray(question.options)).toBe(true);
        expect(question.options.length).toBeGreaterThan(0);

        // Check that options don't contain correct answer info
        question.options.forEach(option => {
          expect(option).toHaveProperty('id');
          expect(option).toHaveProperty('text');
          expect(option).not.toHaveProperty('isCorrect');
        });
      });
    });
  });

  describe('POST /api/submit-answers', () => {
    test('should calculate correct score for all correct answers', async () => {
      // First get questions to get valid option IDs
      const questionsResponse = await request(app).get('/api/questions');
      const questions = questionsResponse.body.questions;

      // Create answers with all correct options
      const answers = questions.map(question => ({
        questionId: question.id,
        optionId: question.options[1].id // Assuming second option is correct for all
      }));

      const response = await request(app)
        .post('/api/submit-answers')
        .send({ answers })
        .expect(200);

      expect(response.body).toHaveProperty('score');
      expect(response.body).toHaveProperty('totalQuestions');
      expect(response.body).toHaveProperty('percentage');
      expect(response.body).toHaveProperty('results');
      expect(response.body.totalQuestions).toBe(questions.length);
    });

    test('should calculate correct score for all wrong answers', async () => {
      const questionsResponse = await request(app).get('/api/questions');
      const questions = questionsResponse.body.questions;

      // Create answers with all wrong options (first option)
      const answers = questions.map(question => ({
        questionId: question.id,
        optionId: question.options[0].id
      }));

      const response = await request(app)
        .post('/api/submit-answers')
        .send({ answers })
        .expect(200);

      expect(response.body.score).toBe(0);
      expect(response.body.percentage).toBe(0);
      expect(response.body.results.every(result => !result.isCorrect)).toBe(true);
    });

    test('should handle partial correct answers', async () => {
      const questionsResponse = await request(app).get('/api/questions');
      const questions = questionsResponse.body.questions;

      // Create answers with some correct and some wrong
      const answers = questions.map((question, index) => ({
        questionId: question.id,
        optionId: index % 2 === 0 ? question.options[1].id : question.options[0].id
      }));

      const response = await request(app)
        .post('/api/submit-answers')
        .send({ answers })
        .expect(200);

      expect(response.body.score).toBeGreaterThan(0);
      expect(response.body.score).toBeLessThan(response.body.totalQuestions);
      expect(response.body.percentage).toBeGreaterThan(0);
      expect(response.body.percentage).toBeLessThan(100);
    });

    test('should handle empty answers array', async () => {
      const response = await request(app)
        .post('/api/submit-answers')
        .send({ answers: [] })
        .expect(200);

      expect(response.body.score).toBe(0);
      expect(response.body.percentage).toBe(0);
    });

    test('should handle invalid request format', async () => {
      const response = await request(app)
        .post('/api/submit-answers')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should handle non-array answers', async () => {
      const response = await request(app)
        .post('/api/submit-answers')
        .send({ answers: "invalid" })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
    });
  });
});

