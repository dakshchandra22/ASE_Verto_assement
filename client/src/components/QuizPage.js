import React, { useState } from 'react';
import { useTimer } from '../hooks/useTimer';
import Timer from './Timer';

const QuizPage = ({ questions, answers, onAnswerChange, onSubmit, loading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const { timeLeft, formattedTime, status } = useTimer(
    () => {
      // Auto-submit when time runs out
      onSubmit();
    },
    timerActive
  );

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestionIndex];

  const handleOptionSelect = (optionId) => {
    onAnswerChange(currentQuestionIndex, optionId);
  };

  const goToNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setTimerActive(false);
    onSubmit();
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = answers.filter(answer => answer !== null).length;

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Submitting your answers...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <Timer timeLeft={timeLeft} formattedTime={formattedTime} status={status} />
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="question-container">
        <div className="question-number">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        
        <h2 className="question-text">
          {currentQuestion.question}
        </h2>

        <div className="options-container">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={`option ${currentAnswer?.optionId === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.text}
            </div>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button
          className="nav-btn"
          onClick={goToPrevious}
          disabled={currentQuestionIndex === 0}
        >
          ← Previous
        </button>

        <div style={{ color: '#666', fontSize: '0.9rem' }}>
          {answeredCount} of {questions.length} answered
        </div>

        {currentQuestionIndex === questions.length - 1 ? (
          <button
            className="btn btn-secondary"
            onClick={handleSubmit}
            disabled={answeredCount === 0}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="nav-btn"
            onClick={goToNext}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;