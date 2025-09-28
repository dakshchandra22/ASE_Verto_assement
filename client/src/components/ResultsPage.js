import React from 'react';

const ResultsPage = ({ results, questions, onRestart }) => {
  if (!results) {
    return (
      <div className="container">
        <div className="loading">Loading results...</div>
      </div>
    );
  }

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return '#28a745';
    if (percentage >= 60) return '#ffc107';
    return '#dc3545';
  };

  const getScoreMessage = (percentage) => {
    if (percentage >= 80) return 'Excellent! 🎉';
    if (percentage >= 60) return 'Good job! 👍';
    if (percentage >= 40) return 'Not bad! 😊';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="container">
      <div className="results-container">
        <h1 className="title">Quiz Complete! 🎯</h1>
        
        <div className="score-display" style={{ color: getScoreColor(results.percentage) }}>
          {results.percentage}%
        </div>
        
        <div className="score-fraction">
          {results.score} out of {results.totalQuestions} correct
        </div>
        
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
          {getScoreMessage(results.percentage)}
        </p>

        {/* Email notification info */}
        <div style={{ 
          background: '#e8f5e8', 
          border: '2px solid #28a745', 
          borderRadius: '10px', 
          padding: '20px', 
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>📧 Email Notification Sent!</h4>
          <p style={{ margin: '0', color: '#333' }}>
            A detailed results report has been sent to <strong>{results.user?.email}</strong>
          </p>
        </div>

        <div className="results-list">
          <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Question Review
          </h3>
          
          {results.results.map((result, index) => {
            const question = questions.find(q => q.id === result.questionId);
            const selectedOption = question?.options.find(opt => opt.id === result.userAnswer);
            
            return (
              <div 
                key={result.questionId} 
                className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}
              >
                <div className="result-question">
                  {result.isCorrect ? '✅' : '❌'} Question {index + 1}: {question?.question}
                </div>
                
                <div className="result-answer">
                  <strong>Your answer:</strong> {selectedOption?.text || 'No answer selected'}
                </div>
                
                {!result.isCorrect && (
                  <div className="result-answer">
                    <strong>Correct answer:</strong> {result.correctAnswerText}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '40px' }}>
          <button className="btn" onClick={onRestart}>
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;