# SmartHub API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Auth Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student",
  "rollNo": "CS001",
  "department": "Computer Science",
  "phone": "+91 9876543210"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer TOKEN
```

---

## Student Endpoints

### Get All Students
```http
GET /students
```

### Get Student Profile
```http
GET /students/:id
```

### Update Student Profile
```http
PUT /students/:id
Authorization: Bearer TOKEN

{
  "phone": "+91 9876543210",
  "department": "Computer Science"
}
```

### Get Student Activities
```http
GET /students/:id/activities
```

### Upload Activity
```http
POST /students/activities
Authorization: Bearer TOKEN

{
  "title": "AWS Certification",
  "category": "MOOC",
  "date": "2024-02-10",
  "level": "International",
  "description": "Completed AWS Developer certification",
  "certificateUrl": "https://..."
}
```

---

## Faculty Endpoints

### Get Pending Approvals
```http
GET /faculty/pending-approvals
Authorization: Bearer TOKEN
```

### Approve Activity
```http
PUT /faculty/activities/:id/approve
Authorization: Bearer TOKEN

{
  "credits": 5,
  "comment": "Well done!"
}
```

### Reject Activity
```http
PUT /faculty/activities/:id/reject
Authorization: Bearer TOKEN

{
  "reason": "Certificate date mismatch"
}
```

### Get All Students
```http
GET /faculty/students
Authorization: Bearer TOKEN
```

### Get Student Details
```http
GET /faculty/students/:id
Authorization: Bearer TOKEN
```

---

## Recruiter Endpoints

### Get Verified Students
```http
GET /recruiters/students?department=CS&minCGPA=7.5
Authorization: Bearer TOKEN
```

### Get Student Portfolio
```http
GET /recruiters/students/:id/portfolio
Authorization: Bearer TOKEN
```

### Post Job
```http
POST /recruiters/jobs
Authorization: Bearer TOKEN

{
  "title": "Software Engineer",
  "company": "Tech Corp",
  "description": "Full stack developer position",
  "eligibility": "CGPA > 7.5",
  "location": "Bangalore",
  "salary": "8-12 LPA",
  "type": "Full-time"
}
```

### Get My Jobs
```http
GET /recruiters/jobs
Authorization: Bearer TOKEN
```

### Shortlist Candidate
```http
PUT /recruiters/jobs/:jobId/applications/:applicationId/shortlist
Authorization: Bearer TOKEN
```

---

## Admin Endpoints

### Get All Users
```http
GET /admin/users?role=student
Authorization: Bearer TOKEN
```

### Update User
```http
PUT /admin/users/:id
Authorization: Bearer TOKEN

{
  "isVerified": true
}
```

### Delete User
```http
DELETE /admin/users/:id
Authorization: Bearer TOKEN
```

### Get System Statistics
```http
GET /admin/stats
Authorization: Bearer TOKEN
```

### Bulk Upload Users
```http
POST /admin/bulk-upload
Authorization: Bearer TOKEN

{
  "users": [
    {
      "name": "Student 1",
      "email": "student1@college.edu",
      "password": "password123",
      "role": "student",
      "rollNo": "CS001"
    }
  ]
}
```

---

## Activity Endpoints

### Get All Activities
```http
GET /activities?status=Pending&student=STUDENT_ID
```

### Get Activity by ID
```http
GET /activities/:id
```

---

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## Testing with Postman

1. Import this collection
2. Set base URL: `http://localhost:5000/api`
3. Register a user
4. Login and copy token
5. Add token to Authorization header for protected routes

---

## Complete! 🎉

Your backend now supports:
- ✅ User authentication
- ✅ Student management
- ✅ Activity upload & approval
- ✅ Faculty monitoring
- ✅ Recruiter features
- ✅ Admin panel
- ✅ All CRUD operations
