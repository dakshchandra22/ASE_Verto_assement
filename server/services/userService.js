const crypto = require('crypto');

class UserService {
  constructor() {
    this.users = new Map(); // In-memory storage
  }

  async createUser(userData) {
    const { name, email, phone } = userData;
    const sessionId = this.generateSessionId();
    const userId = Date.now(); // Simple ID generation
    
    const user = {
      id: userId,
      name,
      email,
      phone,
      sessionId,
      createdAt: new Date()
    };
    
    this.users.set(sessionId, user);
    return Promise.resolve(user);
  }

  async getUserBySessionId(sessionId) {
    const user = this.users.get(sessionId);
    return Promise.resolve(user || null);
  }

  async getUserById(userId) {
    for (let user of this.users.values()) {
      if (user.id === userId) {
        return Promise.resolve(user);
      }
    }
    return Promise.resolve(null);
  }

  async getAllUsers() {
    const users = Array.from(this.users.values());
    return Promise.resolve(users);
  }

  generateSessionId() {
    // Generate a simple session ID using timestamp and random string
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomStr}`;
  }

  validateUserData(userData) {
    const { name, email, phone } = userData;
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!email || !this.isValidEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (!phone || phone.trim().length < 10) {
      errors.push('Please provide a valid phone number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = new UserService();
