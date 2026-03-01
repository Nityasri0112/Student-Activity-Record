import React, { useState, useEffect } from "react";
import { studentAPI } from "../../services/api";

export default function DigitalPortfolio() {
  const [profile, setProfile] = useState({
    name: "Alex Student",
    email: "alex@example.com",
    phone: "+91 9876543210",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    cgpa: "8.38",
    skills: "Python, React, JavaScript, Node.js, MongoDB",
    bio: "Passionate computer science student with experience in full-stack development",
    linkedIn: "https://linkedin.com/in/alexstudent",
    github: "https://github.com/alexstudent",
    portfolio: "https://alexstudent.dev"
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState("portfolio");
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    loadProfileData();
    fetchActivities();
  }, []);

  useEffect(() => {
    const baseUrl = "https://smarthub.edu/portfolio/";
    const slug = profile.name.toLowerCase().replace(/\s+/g, '-');
    setShareLink(`${baseUrl}${slug}`);
  }, [profile.name]);

  const loadProfileData = async () => {
    try {
      const profileData = await studentAPI.getProfile();
      setProfile(profileData);
      localStorage.setItem('studentProfile', JSON.stringify(profileData));
    } catch (error) {
      console.error('Error loading profile:', error);
      const savedProfile = localStorage.getItem('studentProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    }
  };

  const fetchActivities = async () => {
    try {
      const data = await studentAPI.getActivities();
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setActivities([
        { id: 1, title: "Intro to ML - Coursera", category: "Course", status: "Approved", date: "2024-01-15", credits: 2 },
        { id: 2, title: "Hackathon Runner-up", category: "Competition", status: "Approved", date: "2024-02-20", credits: 3 },
        { id: 3, title: "React Workshop", category: "Workshop", status: "Pending", date: "2024-03-10", credits: 1 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPortfolio = () => {
    const approvedActivities = activities.filter(a => a.status === 'Approved');
    const content = `
DIGITAL PORTFOLIO
=================

PERSONAL INFORMATION
Name: ${profile.name}
Email: ${profile.email}
Phone: ${profile.phone}
Course: ${profile.course}
Year: ${profile.year}
CGPA: ${profile.cgpa}

BIO
${profile.bio}

SKILLS
${profile.skills}

SOCIAL LINKS
LinkedIn: ${profile.linkedIn}
GitHub: ${profile.github}
Portfolio: ${profile.portfolio}

ACHIEVEMENTS (${approvedActivities.length})
${approvedActivities.map(a => `• ${a.title} (${a.category}) - ${new Date(a.date).getFullYear()} - ${a.credits} credits`).join('\n')}

Total Credits Earned: ${approvedActivities.reduce((sum, a) => sum + (a.credits || 0), 0)}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_Portfolio.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadResume = () => {
    const content = `
${profile.name}
${profile.email} | ${profile.phone}

EDUCATION
${profile.course} - ${profile.year}
CGPA: ${profile.cgpa}

SKILLS
${profile.skills}

ABOUT
${profile.bio}

ACHIEVEMENTS
${activities.filter(a => a.status === 'Approved').map(a => `• ${a.title} (${a.category})`).join('\n')}

LINKS
LinkedIn: ${profile.linkedIn}
GitHub: ${profile.github}
Portfolio: ${profile.portfolio}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Portfolio link copied to clipboard!');
  };

  const PortfolioPreview = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          {profile.name.split(' ').map(n => n[0]).join('')}
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
        <p className="text-gray-600">{profile.course} - {profile.year}</p>
        <p className="text-sm text-gray-500">{profile.email} | {profile.phone}</p>
        <div className="mt-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            CGPA: {profile.cgpa}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">About</h2>
        <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.split(',').map((skill, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Achievements ({activities.filter(a => a.status === 'Approved').length})
        </h2>
        <div className="space-y-3">
          {activities.filter(a => a.status === 'Approved').map(activity => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-800">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.category} • {new Date(activity.date).getFullYear()}</p>
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                {activity.credits} credits
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <span className="text-lg font-semibold text-blue-600">
            Total Credits: {activities.filter(a => a.status === 'Approved').reduce((sum, a) => sum + (a.credits || 0), 0)}
          </span>
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Connect</h2>
        <div className="flex gap-4">
          <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" 
             className="text-blue-600 hover:underline">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" 
             className="text-gray-700 hover:underline">GitHub</a>
          <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" 
             className="text-purple-600 hover:underline">Portfolio</a>
        </div>
      </div>
    </div>
  );

  const ResumePreview = () => (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto" style={{ fontFamily: 'serif' }}>
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
        <p className="text-sm text-gray-600">{profile.email} | {profile.phone}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2">EDUCATION</h2>
        <p className="text-sm">{profile.course} - {profile.year}</p>
        <p className="text-sm">CGPA: {profile.cgpa}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2">SKILLS</h2>
        <p className="text-sm">{profile.skills}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2">SUMMARY</h2>
        <p className="text-sm leading-relaxed">{profile.bio}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2">ACHIEVEMENTS</h2>
        <ul className="text-sm space-y-1">
          {activities.filter(a => a.status === 'Approved').map(activity => (
            <li key={activity.id}>• {activity.title} ({activity.category}) - {new Date(activity.date).getFullYear()}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-800 border-b border-gray-400 pb-1 mb-2">LINKS</h2>
        <div className="text-sm space-y-1">
          <p>LinkedIn: {profile.linkedIn}</p>
          <p>GitHub: {profile.github}</p>
          <p>Portfolio: {profile.portfolio}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Digital Portfolio & Resume</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => { setPreviewType("portfolio"); setShowPreview(true); }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            👁️ Preview Portfolio
          </button>
          <button 
            onClick={() => { setPreviewType("resume"); setShowPreview(true); }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📄 Preview Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-3xl mb-2">📁</div>
          <h3 className="font-semibold mb-2">Download Portfolio</h3>
          <p className="text-sm text-gray-600 mb-4">Complete portfolio with all achievements</p>
          <button 
            onClick={downloadPortfolio}
            className="px-4 py-2 bg-brand text-white rounded hover:bg-blue-700"
          >
            Download
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-3xl mb-2">📄</div>
          <h3 className="font-semibold mb-2">Download Resume</h3>
          <p className="text-sm text-gray-600 mb-4">Professional resume format</p>
          <button 
            onClick={downloadResume}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Download
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="text-3xl mb-2">🔗</div>
          <h3 className="font-semibold mb-2">Share Portfolio</h3>
          <p className="text-sm text-gray-600 mb-4">Public portfolio link</p>
          <button 
            onClick={copyShareLink}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Copy Link
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Portfolio Statistics</h3>
        {loading ? (
          <div className="text-center py-4">Loading statistics...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{activities.filter(a => a.status === 'Approved').length}</div>
              <div className="text-sm text-gray-600">Approved Achievements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {activities.filter(a => a.status === 'Approved').reduce((sum, a) => sum + (a.credits || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Credits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{activities.filter(a => a.status === 'Pending').length}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{profile.skills.split(',').length}</div>
              <div className="text-sm text-gray-600">Skills Listed</div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-blue-800">Your Portfolio URL</div>
            <div className="text-sm text-blue-600 break-all">{shareLink}</div>
          </div>
          <button 
            onClick={copyShareLink}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Copy
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-100 rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {previewType === 'portfolio' ? 'Portfolio Preview' : 'Resume Preview'}
              </h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            
            {previewType === 'portfolio' ? <PortfolioPreview /> : <ResumePreview />}
            
            <div className="mt-6 text-center">
              <button 
                onClick={previewType === 'portfolio' ? downloadPortfolio : downloadResume}
                className="px-6 py-2 bg-brand text-white rounded hover:bg-blue-700 mr-3"
              >
                📥 Download {previewType === 'portfolio' ? 'Portfolio' : 'Resume'}
              </button>
              <button 
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 border rounded hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}