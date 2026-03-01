# SmartHub Setup Guide

## Prerequisites
- Node.js installed
- MongoDB Compass installed and running
- Git Bash or Command Prompt

## Step 1: Start MongoDB
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Database `smarthub` will be created automatically

## Step 2: Setup Backend
```bash
cd backend
npm install
npm start
```
Backend will run on: http://localhost:5000

## Step 3: Setup Frontend
```bash
cd smart-hub
npm install
npm run dev
```
Frontend will run on: http://localhost:5173

## Step 4: Test the Application

### Create Test Users
Use Postman or Thunder Client to create users:

**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "John Student",
  "email": "student@test.com",
  "password": "password123",
  "role": "student",
  "rollNumber": "2024001"
}
```

**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "Jane Faculty",
  "email": "faculty@test.com",
  "password": "password123",
  "role": "faculty",
  "department": "Computer Science"
}
```

**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "Tech Recruiter",
  "email": "recruiter@test.com",
  "password": "password123",
  "role": "recruiter",
  "company": "Tech Corp"
}
```

**POST** `http://localhost:5000/api/auth/register`
```json
{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

## Step 5: Login and Test Features
1. Go to http://localhost:5173
2. Click on any portal card
3. Login with test credentials
4. Test all features!

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB Compass is running
- Check connection string in `backend/.env`

### Port Already in Use
- Backend: Change PORT in `backend/.env`
- Frontend: Change port in `vite.config.js`

### CORS Error
- Backend already configured for http://localhost:5173
- If using different port, update CORS in `backend/src/server.js`

## Project Structure
```
smart-hub/
├── src/                    # Frontend React app
│   ├── pages/             # All portal pages
│   ├── components/        # Reusable components
│   └── services/          # API service layer
├── backend/               # Backend Node.js app
│   └── src/
│       ├── controllers/   # Business logic
│       ├── models/        # MongoDB schemas
│       ├── routes/        # API routes
│       └── middleware/    # Auth middleware
└── SETUP_GUIDE.md        # This file
```

## Next Steps
- Integrate API calls in frontend components
- Add loading states and error handling
- Test all CRUD operations
- Deploy to production (optional)

🚀 **Your SmartHub is ready to use!**
