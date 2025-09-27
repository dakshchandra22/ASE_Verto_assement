# Environment Variables Setup Guide

This guide will help you set up environment variables for both the backend and frontend of your Quiz Application.

## Backend Environment Variables

### 1. Create Backend .env File

Navigate to the `server` directory and create a `.env` file:

```bash
cd server
cp env-template.txt .env
```

### 2. Backend Environment Variables

The following environment variables are used by the backend:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | Server port | `3001` | No |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` | No |
| `EMAIL_USER` | Gmail address for sending emails | - | Yes (for email) |
| `EMAIL_PASS` | Gmail app password | - | Yes (for email) |
| `DB_PATH` | SQLite database path | `./quiz.db` | No |
| `JWT_SECRET` | Secret key for JWT tokens | - | Yes (for auth) |
| `API_VERSION` | API version | `v1` | No |
| `API_PREFIX` | API route prefix | `/api` | No |

### 3. Email Configuration (Gmail)

To enable email notifications:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. **Update your .env file**:
   ```env
   EMAIL_USER=your-actual-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

## Frontend Environment Variables

### 1. Create Frontend .env File

Navigate to the `client` directory and create a `.env` file:

```bash
cd client
cp env-template.txt .env
```

### 2. Frontend Environment Variables

The following environment variables are used by the frontend:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:3001/api` | No |
| `REACT_APP_ENV` | Environment mode | `development` | No |
| `REACT_APP_NAME` | Application name | `Quiz Application` | No |
| `REACT_APP_VERSION` | Application version | `1.0.0` | No |

## Quick Setup Commands

Run these commands to quickly set up your environment files:

### Backend Setup
```bash
cd server
cp env-template.txt .env
# Edit .env with your actual values
```

### Frontend Setup
```bash
cd client
cp env-template.txt .env
# Edit .env with your actual values
```

## Environment-Specific Configurations

### Development
```env
# Backend (.env in server/)
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# Frontend (.env in client/)
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

### Production
```env
# Backend (.env in server/)
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-domain.com

# Frontend (.env in client/)
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_ENV=production
```

## Security Notes

1. **Never commit .env files** to version control
2. **Use strong, unique values** for JWT_SECRET in production
3. **Keep email credentials secure** and use app passwords
4. **Use environment-specific configurations** for different deployments

## Troubleshooting

### Backend Issues
- Ensure `dotenv` package is installed: `npm install dotenv`
- Check that `.env` file is in the `server` directory
- Verify all required variables are set

### Frontend Issues
- React environment variables must start with `REACT_APP_`
- Restart the development server after changing `.env` files
- Check browser console for API connection errors

### Email Issues
- Verify Gmail app password is correct
- Check that 2FA is enabled on Gmail account
- Review server console for email service errors

## Testing Your Setup

1. **Start the backend server**:
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend**:
   ```bash
   cd client
   npm start
   ```

3. **Check the console output** for any configuration errors

The application should work without email configuration, but email notifications won't be sent if email variables are not properly set.
