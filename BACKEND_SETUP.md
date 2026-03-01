# SmartHub Backend Setup Guide

## Prerequisites
1. Node.js (v16 or higher)
2. MongoDB (local or MongoDB Atlas)

## Step-by-Step Setup

### 1. Install MongoDB (Choose one option)

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud - FREE)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account
- Create cluster (free tier)
- Get connection string
- Update `backend/.env` with your connection string

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Edit `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smarthub
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smarthub
JWT_SECRET=your_secret_key_change_this
NODE_ENV=development
```

### 4. Start Backend Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

Server will run on: http://localhost:5000

### 5. Test API

Open browser or Postman:
```
GET http://localhost:5000/api/health
```

Should return: `{"status": "OK", "message": "SmartHub API is running"}`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student profile
- `GET /api/students/:id/activities` - Get student activities

### Activities
- `POST /api/activities` - Upload new activity
- `GET /api/activities` - Get all activities
- `PUT /api/activities/:id/approve` - Approve activity (faculty)
- `PUT /api/activities/:id/reject` - Reject activity (faculty)

### Faculty
- `GET /api/faculty/pending-approvals` - Get pending approvals
- `GET /api/faculty/students` - Get all students
- `POST /api/faculty/activities` - Create activity/event

### Recruiters
- `GET /api/recruiters/students` - Get verified students
- `POST /api/recruiters/jobs` - Post job
- `GET /api/recruiters/jobs` - Get posted jobs

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get system statistics

## Connect Frontend to Backend

Update frontend API calls in `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── facultyController.js
│   │   └── recruiterController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Activity.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── facultyRoutes.js
│   │   └── recruiterRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── .env
└── package.json
```

## Testing with Postman

### 1. Register User
```
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Test Student",
  "email": "student@test.com",
  "password": "password123",
  "role": "student",
  "rollNo": "CS001",
  "department": "Computer Science"
}
```

### 2. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "student@test.com",
  "password": "password123"
}
```

Copy the `token` from response.

### 3. Get Current User
```
GET http://localhost:5000/api/auth/me
Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

## Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running
- Verify connection string in `.env`
- For Atlas, check IP whitelist

**Port Already in Use:**
- Change PORT in `.env` to 5001 or another port

**Module Not Found:**
- Run `npm install` in backend folder

## Next Steps

1. Create remaining route files (I'll provide them)
2. Add file upload for certificates
3. Implement real-time chat with Socket.io
4. Add email notifications
5. Deploy to production (Heroku, Railway, or AWS)

Need help with any step? Let me know!
