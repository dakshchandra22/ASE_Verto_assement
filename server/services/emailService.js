const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
      
    });
  }

  isConfigured() {
    return process.env.EMAIL_USER && 
           process.env.EMAIL_USER !== 'your-email@gmail.com' &&
           process.env.EMAIL_USER !== 'test@example.com' &&
           process.env.EMAIL_PASS && 
           process.env.EMAIL_PASS !== 'your-app-password' &&
           process.env.EMAIL_PASS !== 'test-password';
  }

  async sendQuizResults(quizResult) {
    if (!this.isConfigured()) {
      console.log('Email not configured. Skipping email notification.');
      return { success: false, message: 'Email not configured' };
    }

    const { user, score, totalQuestions, percentage } = quizResult;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Quiz Completion - Your Results',
      html: this.generateEmailTemplate(user, score, totalQuestions, percentage)
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  generateEmailTemplate(user, score, totalQuestions, percentage) {
    const scoreColor = percentage >= 80 ? '#28a745' : 
                      percentage >= 60 ? '#ffc107' : '#dc3545';
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Quiz Completion Results</h2>
        <p>Dear ${user.name},</p>
        <p>Thank you for completing our quiz! Here are your results:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #667eea; margin-top: 0;">Your Score</h3>
          <p style="font-size: 24px; font-weight: bold; color: ${scoreColor};">
            ${score}/${totalQuestions} (${percentage}%)
          </p>
        </div>
        
        <p>We hope you enjoyed taking the quiz!</p>
        <p>Best regards,<br>Quiz Team</p>
      </div>
    `;
  }
}

module.exports = new EmailService();

