const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class Database {
  constructor() {
    this.dbPath = path.join(__dirname, '../quiz.db');
    this.db = new sqlite3.Database(this.dbPath);
    this.initializeTables();
  }

  initializeTables() {
    this.db.serialize(() => {
      // Create questions table
      this.db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        quiz_id INTEGER DEFAULT 1
      )`);

      // Create options table
      this.db.run(`CREATE TABLE IF NOT EXISTS options (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        option_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT 0,
        FOREIGN KEY (question_id) REFERENCES questions (id)
      )`);

      // Create user details table
      this.db.run(`CREATE TABLE IF NOT EXISTS user_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        quiz_session_id TEXT UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
    });
  }

  getConnection() {
    return this.db;
  }

  close() {
    this.db.close();
  }
}

module.exports = new Database();

