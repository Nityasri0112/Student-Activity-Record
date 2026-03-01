# 🚀 SmartHub Quick Start

## ⚡ Fast Setup (3 Steps)

### 1️⃣ Start MongoDB
- Open **MongoDB Compass**
- Connect to: `mongodb://localhost:27017`

### 2️⃣ Run the App
Double-click: **START_APP.bat**

OR manually:
```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend  
cd smart-hub
npm install
npm run dev
```

### 3️⃣ Seed Test Data
```bash
cd backend
node src/scripts/seedData.js
```

## 🔐 Test Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Student | student@test.com | password123 |
| Faculty | faculty@test.com | password123 |
| Recruiter | recruiter@test.com | password123 |
| Admin | admin@test.com | password123 |

## 🌐 Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## ✅ What's Integrated

### Frontend → Backend Connected
- ✅ Login with JWT authentication
- ✅ Student dashboard loads profile from API
- ✅ Activity upload saves to database
- ✅ Faculty approvals fetch pending activities
- ✅ Bulk approve/reject with reasons
- ✅ All API endpoints ready

### Features Working
- ✅ Role-based authentication
- ✅ Protected routes
- ✅ Real-time data from MongoDB
- ✅ Activity approval workflow
- ✅ Error handling & loading states

## 🧪 Test Flow

1. Go to http://localhost:5173
2. Click **Student Portal**
3. Login: `student@test.com` / `password123`
4. Upload an activity
5. Logout, login as Faculty: `faculty@test.com` / `password123`
6. Go to Approvals → Approve/Reject activities
7. Test other portals!

## 📁 Project Structure
```
smart-hub/
├── src/                    # Frontend
│   ├── services/api.js    # ✅ API integration
│   └── pages/             # All portal pages
├── backend/               # Backend
│   ├── src/controllers/   # ✅ Business logic
│   ├── src/models/        # ✅ MongoDB schemas
│   └── src/routes/        # ✅ API routes
└── START_APP.bat          # ✅ Quick launcher
```

## 🎯 Next Steps
- Test all CRUD operations
- Add more seed data
- Customize UI/features
- Deploy (optional)

**Everything is connected and ready to use!** 🎉
