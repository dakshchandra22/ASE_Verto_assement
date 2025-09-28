# 🎯 ASE Verto Assessment Online Quiz Application

A complete full-stack online quiz application built with **Test-Driven Development (TDD)** methodology, featuring a modern React frontend and Express.js backend with email notifications.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api

## ✨ Features

### 🎮 Quiz System
- **10 Diverse Questions**: Covering various topics (Geography, Science, History, etc.)
- **Random Selection**: 5 random questions per quiz session
- **Multiple Choice**: 4 options per question with single correct answer
- **Real-time Scoring**: Instant score calculation with percentage
- **Session Management**: Secure user session tracking

### 👤 User Management
- **User Registration**: Name, email, and phone validation
- **Session Tracking**: Unique session IDs for each quiz
- **Data Validation**: Comprehensive input validation
- **In-Memory Storage**: Fast and reliable data persistence

### 📧 Email Notifications
- **Quiz Results**: Automatic email with detailed results
- **Gmail Integration**: SMTP configuration for reliable delivery
- **HTML Templates**: Professional email formatting
- **Error Handling**: Graceful fallback when email not configured

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **React Components**: Modular and reusable components
- **Timer Integration**: Built-in quiz timer functionality
- **Clean Interface**: Intuitive and user-friendly design

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **React Scripts** - Build tools
- **Modern JavaScript** - ES6+ features
- **CSS3** - Styling and animations

### Development
- **Git** - Version control
- **npm** - Package management
- **TDD** - Test-driven development
- **RESTful API** - API design principles

## 📁 Project Structure

```
ASE_Verto_assement/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── constants/     # Application constants
│   └── package.json
├── server/                 # Express.js backend
│   ├── controllers/       # API controllers
│   ├── services/         # Business logic services
│   ├── routes/           # API routes
│   ├── config/           # Configuration files
│   └── package.json
├── .gitignore            # Git ignore rules
├── README.md             # Project documentation
└── ENVIRONMENT_SETUP.md  # Environment setup guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/dakshchandra22/ASE_Verto_assement.git
cd ASE_Verto_assement
```

2. **Install backend dependencies**
```bash
cd server
   npm install
```

3. **Install frontend dependencies**
```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Backend
   cd ../server
   cp env-template.txt .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../client
   cp env-template.txt .env
   # Edit .env with your configuration
   ```

5. **Start the application**
```bash
   # Terminal 1 - Backend
   cd server
   npm start
   
   # Terminal 2 - Frontend
cd client
npm start
```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## 📧 Email Configuration

To enable email notifications, update `server/.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Update environment variables
4. Restart the server

## 🔧 API Endpoints

### Health Check
```http
GET /api/health
```

### Start Quiz
```http
POST /api/start-quiz
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}
```

### Submit Answers
```http
POST /api/submit-answers
Content-Type: application/json

{
  "sessionId": "session-id-here",
  "answers": [
    {"questionId": 1, "optionId": 2},
    {"questionId": 2, "optionId": 5}
  ]
}
```

## 🧪 Testing

The application was built using **Test-Driven Development (TDD)** methodology:

1. **Backend Tests**: Jest-based testing for API endpoints
2. **Frontend Tests**: React Testing Library for components
3. **Integration Tests**: End-to-end functionality testing
4. **Email Tests**: Email service validation

## 📚 Documentation

- [Environment Setup Guide](ENVIRONMENT_SETUP.md)
- [Email Configuration Guide](EMAIL_SETUP_GUIDE.md)
- [API Documentation](http://localhost:3001/api)

## 🎯 Features Implemented

### ✅ Core Functionality
- [x] User registration and validation
- [x] Quiz question management
- [x] Answer submission and scoring
- [x] Session management
- [x] Email notifications
- [x] Error handling

### ✅ Technical Features
- [x] RESTful API design
- [x] CORS configuration
- [x] Environment variable management
- [x] Input validation
- [x] Security best practices
- [x] Responsive design

### ✅ Development Features
- [x] Git version control
- [x] Comprehensive documentation
- [x] Environment configuration
- [x] Error logging
- [x] Code organization

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Configure email service
3. Deploy to cloud platform (Heroku, AWS, etc.)
4. Set up domain and SSL

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, etc.)
3. Configure API endpoints
4. Set up custom domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Daksh Chandra**
- GitHub: [@dakshchandra22](https://github.com/dakshchandra22)
- Project: [ASE Verto Assessment Online Quiz Application](https://github.com/dakshchandra22/ASE_Verto_assement)

## 🙏 Acknowledgments

- Built for ASE Verto Assessment
- Test-Driven Development methodology
- Modern web development best practices
- Comprehensive documentation and setup guides

---

**🎉 Ready to take a quiz? Visit http://localhost:3000 and start testing your knowledge!**