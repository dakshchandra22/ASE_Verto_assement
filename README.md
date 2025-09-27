# 🧠 Enhanced Online Quiz Application

A comprehensive, well-structured full-stack quiz application with user registration, random question selection, timer functionality, and email notifications.

## ✨ Features

### Core Features
- **User Registration**: Collect name, email, and phone before starting quiz
- **Random Question Selection**: 5 random questions selected from 25 available questions
- **Interactive Quiz Interface**: Clean, modern UI with smooth navigation
- **Question Navigation**: Previous/Next buttons to move between questions
- **Answer Tracking**: State management to track user responses
- **Score Calculation**: Backend API calculates accurate scores
- **Results Display**: Shows score, percentage, and detailed question review

### Enhanced Features
- **⏱️ Timer**: 2-minute countdown with visual warnings and auto-submit
- **📊 Detailed Results**: Shows which questions were correct/incorrect with explanations
- **📧 Email Notifications**: Automatic email with results sent to user
- **🎲 Random Selection**: Different questions each time you take the quiz
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🧪 Comprehensive Testing**: Backend tests for scoring logic
- **🎨 Modern UI/UX**: Beautiful gradient design with smooth animations

## 🏗️ Architecture

### Backend Structure (Modular & Component-Based)
```
server/
├── config/
│   └── database.js          # Database configuration and initialization
├── controllers/
│   └── quizController.js    # Business logic for quiz operations
├── routes/
│   └── quizRoutes.js        # API route definitions
├── services/
│   ├── emailService.js      # Email notification service
│   ├── questionService.js   # Question management service
│   └── userService.js       # User management service
├── middleware/               # Custom middleware (future use)
├── models/                  # Data models (future use)
├── tests/
│   └── quiz.test.js         # Test suite
├── app.js                   # Main application setup
├── index.js                 # Application entry point
└── .env.example             # Environment variables template
```

### Frontend Structure (Component-Based with Hooks)
```
client/src/
├── components/
│   ├── UserDetailsPage.js   # User registration form
│   ├── QuizPage.js          # Main quiz interface
│   ├── Timer.js             # Timer component
│   └── ResultsPage.js       # Results display
├── hooks/
│   ├── useQuiz.js           # Quiz state management
│   ├── useTimer.js          # Timer functionality
│   └── useValidation.js     # Form validation
├── utils/
│   └── api.js               # API service layer
├── constants/
│   └── index.js             # Application constants
├── App.js                   # Main app component
└── App.css                  # Styling
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone and install dependencies**:
```bash
cd ASE_Verto_assement
npm run install-all
```

2. **Set up environment variables**:
```bash
cd server
cp .env.example .env
# Edit .env with your email credentials
```

3. **Start the application**:
```bash
npm run dev
```

This will start both the backend server (port 3001) and frontend development server (port 3000).

### Manual Setup

If you prefer to run servers separately:

**Backend**:
```bash
cd server
npm install
npm run dev
```

**Frontend**:
```bash
cd client
npm install
npm start
```

## 📧 Email Configuration

### Environment Variables
Create a `.env` file in the `server` directory:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the app password in your `.env` file

## 🧪 Testing

Run the backend tests:
```bash
cd server
npm test
```

The test suite includes:
- Question fetching functionality
- Score calculation for various scenarios
- Error handling for invalid inputs
- API endpoint validation

## 📊 Database Schema

### Questions Table
```sql
CREATE TABLE questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_text TEXT NOT NULL,
  quiz_id INTEGER DEFAULT 1
);
```

### Options Table
```sql
CREATE TABLE options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions (id)
);
```

### User Details Table
```sql
CREATE TABLE user_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  quiz_session_id TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Quiz Flow

1. **User Registration**: User enters name, email, and phone number
2. **Question Selection**: System randomly selects 5 questions from 25 available
3. **Quiz Taking**: User answers questions with 2-minute timer
4. **Submission**: User submits answers or timer auto-submits
5. **Results & Email**: Score display with detailed review and email notification

## 🔧 API Endpoints

### GET /api/health
Health check endpoint.

**Response**:
```json
{
  "status": "OK",
  "message": "Quiz API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /api/start-quiz
Register user and get 5 random questions.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

**Response**:
```json
{
  "questions": [
    {
      "id": 1,
      "question": "What is the capital of France?",
      "options": [
        {"id": 1, "text": "London"},
        {"id": 2, "text": "Paris"},
        {"id": 3, "text": "Berlin"},
        {"id": 4, "text": "Madrid"}
      ]
    }
  ],
  "sessionId": "unique-session-id"
}
```

### POST /api/submit-answers
Submit user answers and receive score calculation with email notification.

**Request**:
```json
{
  "answers": [
    {"questionId": 1, "optionId": 2},
    {"questionId": 2, "optionId": 3}
  ],
  "sessionId": "unique-session-id"
}
```

**Response**:
```json
{
  "score": 2,
  "totalQuestions": 5,
  "percentage": 40,
  "results": [
    {
      "questionId": 1,
      "userAnswer": 2,
      "correctAnswer": 2,
      "correctAnswerText": "Paris",
      "isCorrect": true
    }
  ],
  "user": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890"
  }
}
```

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Feedback**: Selected options highlighted, progress bar
- **Timer Warnings**: Color changes and pulsing animation
- **Score Visualization**: Color-coded results based on performance
- **Form Validation**: Real-time validation for user details

## 🛠️ Development

### Code Organization Principles

#### Backend
- **Separation of Concerns**: Controllers handle HTTP, services handle business logic
- **Dependency Injection**: Services are injected into controllers
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Environment Configuration**: All configuration through environment variables
- **Database Abstraction**: Database operations encapsulated in services

#### Frontend
- **Custom Hooks**: Reusable logic extracted into custom hooks
- **Component Composition**: Small, focused components
- **State Management**: Centralized state management with useQuiz hook
- **API Abstraction**: API calls abstracted into service layer
- **Constants**: Configuration values centralized in constants file

### Adding New Features

#### Backend
1. Create service in `services/` directory
2. Add controller method in `controllers/quizController.js`
3. Define route in `routes/quizRoutes.js`
4. Add tests in `tests/` directory

#### Frontend
1. Create component in `components/` directory
2. Add custom hook if needed in `hooks/` directory
3. Update constants if needed
4. Add API methods in `utils/api.js`

### Adding New Questions

Modify the `questions` array in `server/services/questionService.js`:

```javascript
const questions = [
  {
    text: "Your question here?",
    options: [
      { text: "Option 1", isCorrect: false },
      { text: "Option 2", isCorrect: true },
      { text: "Option 3", isCorrect: false },
      { text: "Option 4", isCorrect: false }
    ]
  }
];
```

## 🚀 Deployment

### Backend Deployment
1. Set up a Node.js hosting service (Heroku, Railway, etc.)
2. Configure environment variables for email
3. Deploy the server directory

### Frontend Deployment
1. Build the React app: `cd client && npm run build`
2. Deploy the build folder to a static hosting service
3. Update API URLs in the frontend code

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests for new functionality
5. Submit a pull request

---

**Built with ❤️ using React, Node.js, Express, SQLite, and Nodemailer**

## 🎉 What's New in This Version

- ✅ **Modular Architecture**: Clean separation of concerns with services, controllers, and routes
- ✅ **Custom Hooks**: Reusable logic with useQuiz, useTimer, and useValidation hooks
- ✅ **Environment Configuration**: Proper environment variable management
- ✅ **Error Handling**: Comprehensive error handling and validation
- ✅ **API Service Layer**: Abstracted API calls with proper error handling
- ✅ **Constants Management**: Centralized configuration values
- ✅ **Component-Based Design**: Small, focused, reusable components
- ✅ **Type Safety**: Better prop validation and error handling
- ✅ **Scalable Structure**: Easy to extend and maintain