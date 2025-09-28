export const QUIZ_CONFIG = {
  TIMER_DURATION: 120, // 2 minutes in seconds
  QUESTIONS_COUNT: 5,
  TOTAL_QUESTIONS_AVAILABLE: 25,
};

export const TIMER_CONFIG = {
  WARNING_THRESHOLD: 60, // seconds
  CRITICAL_THRESHOLD: 30, // seconds
};

export const SCORE_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  AVERAGE: 40,
};

export const ROUTES = {
  USER_DETAILS: 'userDetails',
  QUIZ: 'quiz',
  RESULTS: 'results',
};

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PHONE: {
    PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
  },
};

