import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginFaculty() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // For demo purposes, simulate login with mock data
    if (email && password) {
      const mockUser = {
        id: "FAC001",
        name: "Dr. " + email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: "faculty"
      };
      
      login(mockUser);
      navigate("/faculty");
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Faculty Login</h2>
        <p className="text-gray-600 text-center mb-6">Access approval and monitoring tools</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Faculty Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="faculty@college.edu"
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
          
          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Login
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => navigate("/forgot-password")} 
            className="text-sm text-green-600 hover:underline mb-2 block"
          >
            Forgot Password?
          </button>
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => navigate("/signup/faculty")} 
            className="text-sm text-green-600 hover:underline"
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
