import React, { useState, useEffect } from "react";
import { studentAPI } from "../../services/api";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "Alex Student",
    email: "alex@example.com",
    phone: "+91 9876543210",
    dateOfBirth: "2002-05-15",
    address: "123 College Street, City, State 12345",
    rollNumber: "CS2021001",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    cgpa: "8.38",
    skills: "Python, React, JavaScript, Node.js, MongoDB",
    bio: "Passionate computer science student with experience in full-stack development",
    linkedIn: "https://linkedin.com/in/alexstudent",
    github: "https://github.com/alexstudent",
    portfolio: "https://alexstudent.dev"
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      // Load from database via API
      const profileData = await studentAPI.getProfile();
      setProfile(profileData);
      // Also save to localStorage as backup
      localStorage.setItem('studentProfile', JSON.stringify(profileData));
    } catch (error) {
      console.error('Error loading profile:', error);
      // Fallback to localStorage if API fails
      const savedProfile = localStorage.getItem('studentProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  };

  function onChange(e) {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Save to database via API
      await studentAPI.updateProfile(profile);
      
      // Also save to localStorage as backup
      localStorage.setItem('studentProfile', JSON.stringify(profile));
      
      setIsSaving(false);
      setIsEditing(false);
      setSavedMessage("Profile saved successfully!");
      setTimeout(() => setSavedMessage(""), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setIsSaving(false);
      setSavedMessage("Error saving profile. Please try again.");
      setTimeout(() => setSavedMessage(""), 3000);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Management</h2>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-brand text-white rounded hover:bg-blue-700">
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {savedMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
          ✅ {savedMessage}
        </div>
      )}

      <form onSubmit={save} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input name="name" value={profile.name} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" value={profile.email} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" value={profile.phone} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input name="dateOfBirth" type="date" value={profile.dateOfBirth} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea name="address" value={profile.address} onChange={onChange} disabled={!isEditing} rows="2" className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Academic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
              <input name="rollNumber" value={profile.rollNumber} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <input name="course" value={profile.course} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select name="year" value={profile.year} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50">
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
              <input name="cgpa" type="number" step="0.01" min="0" max="10" value={profile.cgpa} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Professional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
              <textarea name="skills" value={profile.skills} onChange={onChange} disabled={!isEditing} rows="2" placeholder="e.g., Python, React, JavaScript, Node.js" className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea name="bio" value={profile.bio} onChange={onChange} disabled={!isEditing} rows="3" placeholder="Brief description about yourself" className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input name="linkedIn" type="url" value={profile.linkedIn} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                <input name="github" type="url" value={profile.github} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                <input name="portfolio" type="url" value={profile.portfolio} onChange={onChange} disabled={!isEditing} className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50" />
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3">
            <button type="submit" disabled={isSaving} className="px-6 py-2 bg-brand text-white rounded hover:bg-blue-700 disabled:opacity-50">
              {isSaving ? "💾 Saving..." : "💾 Save Profile"}
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 border rounded hover:bg-gray-50">
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
