import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupFaculty() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    facultyId: "",
    department: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  function onSubmit(e) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    // API call to register faculty
    fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'faculty',
        rollNumber: formData.facultyId,
        department: formData.department
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate("/faculty");
      } else {
        alert(data.message);
      }
    })
    .catch(err => alert('Registration failed'));
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Faculty Signup</h2>
        <p className="text-gray-600 text-center mb-6">Create your faculty account</p>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Dr. John Smith"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="faculty@college.edu"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Faculty ID</label>
            <input
              type="text"
              name="facultyId"
              value={formData.facultyId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="FAC2024001"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Computer Science"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️🗨️"}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg pr-10"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "👁️" : "👁️🗨️"}
              </button>
            </div>
          </div>
          
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Sign Up
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <button 
            onClick={() => navigate("/login/faculty")} 
            className="text-sm text-green-600 hover:underline"
          >
            Login here
          </button>
        </div>
        
        <button onClick={() => navigate("/")} className="mt-4 text-sm text-gray-500 hover:underline">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}