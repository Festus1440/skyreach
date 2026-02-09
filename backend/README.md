# Skyreach Backend (Express.js)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Run development server
npm run dev

# Run production server
npm start
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/submissions` | Get all submissions (admin) |

## 📧 Contact Form POST /api/contact

### Request Body
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "service": "ac-repair",
  "message": "My AC is not cooling properly"
}
```

### Response
```json
{
  "success": true,
  "message": "Thank you! Your request has been submitted...",
  "data": {
    "reference": 1704661200000,
    "emailSent": true
  }
}
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 3001) |
| NODE_ENV | Environment | No |
| EMAIL_SERVICE | Email provider | No |
| EMAIL_USER | Email username | Yes* |
| EMAIL_PASS | Email password | Yes* |
| ADMIN_EMAIL | Admin recipient | No |

*Required for email functionality

## 📮 Testing Email

Use Ethereal Email for testing:
1. Visit https://ethereal.email
2. Create account
3. Add credentials to .env
