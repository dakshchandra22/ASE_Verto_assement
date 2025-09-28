import React from 'react';

const StartPage = ({ onStart, loading }) => {
  return (
    <div className="container">
      <h1 className="title">🧠 Online Quiz Challenge</h1>
      <p className="subtitle">
        Test your knowledge with our interactive quiz!<br />
        Answer 5 questions and see how well you score.
      </p>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Quiz Features:</h3>
        <ul style={{ textAlign: 'left', color: '#666', lineHeight: '2' }}>
          <li>📝 Multiple choice questions</li>
          <li>⏱️ Timer to challenge yourself</li>
          <li>📊 Detailed results with explanations</li>
          <li>🔄 Navigate between questions freely</li>
          <li>📱 Mobile-friendly design</li>
        </ul>
      </div>

      <button 
        className="btn" 
        onClick={onStart}
        disabled={loading}
      >
        {loading ? 'Loading Questions...' : 'Start Quiz'}
      </button>
    </div>
  );
};

export default StartPage;

