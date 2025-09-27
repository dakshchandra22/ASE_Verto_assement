# Email Configuration Setup

To enable email notifications for quiz completion, you need to configure email settings:

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Set Environment Variables**:
   ```bash
   export EMAIL_USER=your-email@gmail.com
   export EMAIL_PASS=your-16-character-app-password
   ```

## Alternative Email Providers

You can modify the email configuration in `server/index.js`:

```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook', // or 'yahoo', 'hotmail', etc.
  auth: {
    user: process.env.EMAIL_USER || 'your-email@outlook.com',
    pass: process.env.EMAIL_PASS || 'your-password'
  }
});
```

## Testing Email

The application will work without email configuration, but email notifications won't be sent. Check the server console for email-related errors.

## Security Note

Never commit real email credentials to version control. Use environment variables or a secure configuration file.

