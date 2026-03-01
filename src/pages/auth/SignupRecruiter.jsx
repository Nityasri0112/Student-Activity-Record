import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupRecruiter() {
  const [form, setForm] = useState({
    companyName: "",
    recruiterName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    navigate("/login/recruiter");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Recruiter Sign Up</h2>
        <p className="text-gray-600 text-center mb-6">Create your recruiter account</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => setForm({...form, companyName: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Tech Corp"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Recruiter Name</label>
            <input
              type="text"
              value={form.recruiterName}
              onChange={(e) => setForm({...form, recruiterName: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="recruiter@company.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="+91 9876543210"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button type="submit" className="w-full py-3 bg-brand text-white rounded-lg hover:bg-purple-700">
            Sign Up
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => navigate("/login/recruiter")} className="text-brand hover:underline">
              Login
            </button>
          </p>
        </div>
        
        <button onClick={() => navigate("/")} className="mt-4 text-sm text-gray-500 hover:underline">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
