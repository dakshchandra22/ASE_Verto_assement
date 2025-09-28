import React, { useState } from 'react';
import { useValidation } from '../hooks/useValidation';

const UserDetailsPage = ({ onStart, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const { errors, validateField, validateForm, clearFieldError } = useValidation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    clearFieldError(name);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    
    if (validation.isValid) {
      try {
        await onStart(formData);
      } catch (error) {
        console.error('Failed to start quiz:', error);
        // Error handling could be improved with a toast notification
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">🧠 Online Quiz Challenge</h1>
      <p className="subtitle">
        Test your knowledge with our interactive quiz!<br />
        Answer 5 random questions and see how well you score.
      </p>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#667eea', marginBottom: '20px' }}>Quiz Features:</h3>
        <ul style={{ textAlign: 'left', color: '#666', lineHeight: '2' }}>
          <li>📝 5 random questions from 25 available</li>
          <li>⏱️ 2-minute timer to challenge yourself</li>
          <li>📊 Detailed results with explanations</li>
          <li>📧 Email notification with your results</li>
          <li>📱 Mobile-friendly design</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="user-details-form">
        <h3 style={{ color: '#333', marginBottom: '20px' }}>Please provide your details:</h3>
        
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your full name"
            disabled={loading}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email address"
            disabled={loading}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="Enter your phone number"
            disabled={loading}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <button 
          type="submit"
          className="btn" 
          disabled={loading}
        >
          {loading ? 'Starting Quiz...' : 'Start Quiz'}
        </button>
      </form>
    </div>
  );
};

export default UserDetailsPage;