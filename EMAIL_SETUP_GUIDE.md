# Email Setup Guide for Quiz Application

## Current Status ✅

Your Quiz Application is now **fully functional**! The backend server is running without errors and the email service is properly configured.

## Email Configuration Status

**Current Configuration**: Email service is set up but using test credentials
- **Status**: Email notifications are **disabled** (using test credentials)
- **Reason**: Using placeholder email credentials for security

## To Enable Real Email Notifications

### Step 1: Get Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Copy the 16-character password

### Step 2: Update Environment Variables

Edit `/Users/dakshchandra/Desktop/project/ASE_Verto_assement/server/.env`:

```env
# Replace these with your actual Gmail credentials
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Step 3: Restart Backend Server

```bash
cd server
npm start
```

## Testing Email Functionality

### Method 1: Complete Quiz Flow
1. Open http://localhost:3000
2. Register with a real email address
3. Complete the quiz
4. Check your email for results

### Method 2: API Testing
```bash
# Start quiz
curl -X POST http://localhost:3001/api/start-quiz \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Your Name",
    "email": "your-email@gmail.com",
    "phone": "1234567890"
  }'

# Submit answers (use sessionId from above response)
curl -X POST http://localhost:3001/api/submit-answers \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "your-session-id",
    "answers": [
      {"questionId": 42, "optionId": 164},
      {"questionId": 61, "optionId": 251}
    ]
  }'
```

## Email Service Features

### ✅ What's Working
- **Email Service**: Properly initialized and configured
- **Quiz Results**: Automatically sent after quiz completion
- **Error Handling**: Graceful fallback when email not configured
- **Security**: Credentials stored in environment variables

### 📧 Email Content
- **Subject**: "Quiz Completion - Your Results"
- **Content**: 
  - Personalized greeting
  - Score display with color coding
  - Percentage and total questions
  - Professional HTML formatting

### 🔧 Email Service Methods
- `isConfigured()`: Checks if real email credentials are set
- `sendQuizResults()`: Sends formatted quiz results
- `generateEmailTemplate()`: Creates HTML email template

## Troubleshooting

### Email Not Sending
1. **Check credentials**: Ensure EMAIL_USER and EMAIL_PASS are correct
2. **Verify 2FA**: Make sure 2-Factor Authentication is enabled
3. **App Password**: Use 16-character app password, not regular password
4. **Check logs**: Look at server console for error messages

### Common Issues
- **"Email not configured"**: Using test credentials
- **"Authentication failed"**: Wrong email/password combination
- **"Connection timeout"**: Network or Gmail server issues

### Server Logs
The server will show:
- `📧 Email configured: Yes/No`
- Email sending success/failure messages
- Detailed error information

## Security Best Practices

1. **Never commit real credentials** to version control
2. **Use app passwords** instead of regular passwords
3. **Keep .env files secure** and add to .gitignore
4. **Use different credentials** for development/production

## Alternative Email Providers

You can modify the email service to use other providers:

```javascript
// In server/services/emailService.js
this.transporter = nodemailer.createTransporter({
  service: 'outlook', // or 'yahoo', 'hotmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Current Application Status

✅ **Backend Server**: Running on http://localhost:3001  
✅ **Frontend App**: Running on http://localhost:3000  
✅ **Database**: SQLite initialized with questions  
✅ **API Endpoints**: All working correctly  
✅ **Email Service**: Configured and ready  
⚠️ **Email Notifications**: Disabled (using test credentials)

**Next Step**: Update email credentials in `.env` file to enable real email notifications!
