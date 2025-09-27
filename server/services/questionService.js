class QuestionService {
  constructor() {
    this.questions = [
      {
        id: 1,
        question: "What is the capital of France?",
        options: [
          { id: 1, text: "London", isCorrect: false },
          { id: 2, text: "Paris", isCorrect: true },
          { id: 3, text: "Berlin", isCorrect: false },
          { id: 4, text: "Madrid", isCorrect: false }
        ]
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: [
          { id: 5, text: "Venus", isCorrect: false },
          { id: 6, text: "Mars", isCorrect: true },
          { id: 7, text: "Jupiter", isCorrect: false },
          { id: 8, text: "Saturn", isCorrect: false }
        ]
      },
      {
        id: 3,
        question: "What is 2 + 2?",
        options: [
          { id: 9, text: "3", isCorrect: false },
          { id: 10, text: "4", isCorrect: true },
          { id: 11, text: "5", isCorrect: false },
          { id: 12, text: "6", isCorrect: false }
        ]
      },
      {
        id: 4,
        question: "Which programming language is known for its use in web development?",
        options: [
          { id: 13, text: "Java", isCorrect: false },
          { id: 14, text: "Python", isCorrect: false },
          { id: 15, text: "JavaScript", isCorrect: true },
          { id: 16, text: "C++", isCorrect: false }
        ]
      },
      {
        id: 5,
        question: "What is the largest mammal in the world?",
        options: [
          { id: 17, text: "African Elephant", isCorrect: false },
          { id: 18, text: "Blue Whale", isCorrect: true },
          { id: 19, text: "Giraffe", isCorrect: false },
          { id: 20, text: "Hippopotamus", isCorrect: false }
        ]
      },
      {
        id: 6,
        question: "Who painted the Mona Lisa?",
        options: [
          { id: 21, text: "Vincent van Gogh", isCorrect: false },
          { id: 22, text: "Leonardo da Vinci", isCorrect: true },
          { id: 23, text: "Pablo Picasso", isCorrect: false },
          { id: 24, text: "Michelangelo", isCorrect: false }
        ]
      },
      {
        id: 7,
        question: "What is the smallest country in the world?",
        options: [
          { id: 25, text: "Monaco", isCorrect: false },
          { id: 26, text: "Vatican City", isCorrect: true },
          { id: 27, text: "Liechtenstein", isCorrect: false },
          { id: 28, text: "San Marino", isCorrect: false }
        ]
      },
      {
        id: 8,
        question: "Which element has the chemical symbol 'O'?",
        options: [
          { id: 29, text: "Gold", isCorrect: false },
          { id: 30, text: "Oxygen", isCorrect: true },
          { id: 31, text: "Osmium", isCorrect: false },
          { id: 32, text: "Oganesson", isCorrect: false }
        ]
      },
      {
        id: 9,
        question: "What is the fastest land animal?",
        options: [
          { id: 33, text: "Lion", isCorrect: false },
          { id: 34, text: "Cheetah", isCorrect: true },
          { id: 35, text: "Leopard", isCorrect: false },
          { id: 36, text: "Tiger", isCorrect: false }
        ]
      },
      {
        id: 10,
        question: "Which ocean is the largest?",
        options: [
          { id: 37, text: "Atlantic", isCorrect: false },
          { id: 38, text: "Pacific", isCorrect: true },
          { id: 39, text: "Indian", isCorrect: false },
          { id: 40, text: "Arctic", isCorrect: false }
        ]
      }
    ];
    
    console.log(`✅ Initialized ${this.questions.length} questions`);
  }

  async getAllQuestions() {
    return Promise.resolve(this.questions);
  }

  async getRandomQuestions(count = 5) {
    const shuffled = this.shuffleArray([...this.questions]);
    return shuffled.slice(0, count);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  async getCorrectAnswers(questionIds) {
    const correctAnswers = [];
    
    questionIds.forEach(questionId => {
      const question = this.questions.find(q => q.id === questionId);
      if (question) {
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (correctOption) {
          correctAnswers.push({
            question_id: questionId,
            correct_option_id: correctOption.id,
            correct_answer: correctOption.text
          });
        }
      }
    });
    
    return Promise.resolve(correctAnswers);
  }
}

module.exports = new QuestionService();