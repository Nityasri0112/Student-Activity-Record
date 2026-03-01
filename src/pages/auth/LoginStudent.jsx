import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginStudent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  function onSubmit(e) {
    e.preventDefault();
    
    // For demo purposes, simulate login with mock data
    // In production, this would be an actual API call
    if (email && password) {
      const mockUser = {
        id: "2106030112",
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: "student"
      };
      
      login(mockUser);
      navigate("/student");
    } else {
      alert('Please enter both email and password');
    }
    
    // Uncomment below for actual API integration:
    /*
    fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        login(data.user);
        localStorage.setItem('token', data.token);
        navigate("/student");
      } else {
        alert(data.message);
      }
    })
    .catch(err => alert('Login failed'));
    */
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Student Login</h2>
        <p className="text-gray-600 text-center mb-6">Access your academic portal</p>
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="student@college.edu"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          
          <button type="submit" className="w-full py-3 bg-brand text-white rounded-lg hover:bg-purple-700">
            Login
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate("/forgot-password")} 
            className="text-sm text-blue-600 hover:underline mb-2 block"
          >
            Forgot Password?
          </button>
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => navigate("/signup/student")} 
            className="text-sm text-blue-600 hover:underline"
          >
            Sign up here
          </button>
        </div>
        
        <button onClick={() => navigate("/")} className="mt-4 text-sm text-gray-500 hover:underline">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
