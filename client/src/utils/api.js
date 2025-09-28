const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async startQuiz(userData) {
    return this.request('/start-quiz', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async submitAnswers(answers, sessionId) {
    return this.request('/submit-answers', {
      method: 'POST',
      body: JSON.stringify({ answers, sessionId }),
    });
  }

  static async getHealth() {
    return this.request('/health');
  }
}

export default ApiService;

