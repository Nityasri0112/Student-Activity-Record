import React, { useState } from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Portfolio() {
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState("portfolio");
  
  const profile = {
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
  };

  const activities = [
    { id: 1, title: "Intro to ML - Coursera", category: "Course", status: "Approved", date: "2024-01-15", credits: 2 },
    { id: 2, title: "Hackathon Runner-up", category: "Competition", status: "Approved", date: "2024-02-20", credits: 3 }
  ];

  const downloadPortfolio = async () => {
    const element = document.getElementById('portfolio-preview');
    if (!element) {
      alert('Please open portfolio preview first');
      return;
    }
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save('Portfolio.pdf');
  };

  const downloadResume = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      alert('Please open resume preview first');
      return;
    }
    
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save('Resume.pdf');
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://smarthub.edu/portfolio/alex-student');
    alert('Portfolio link copied!');
  };

  const PortfolioPreview = () => (
    <div id="portfolio-preview" className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
          {profile.name.split(' ').map(n => n[0]).join('')}
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
        <p className="text-gray-600">{profile.course} - {profile.year}</p>
        <p className="text-sm text-gray-500">{profile.email} | {profile.phone}</p>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-2 inline-block">
          CGPA: {profile.cgpa}
        </span>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-gray-600">{profile.bio}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {profile.skills.split(',').map((skill, i) => (
            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Achievements</h2>
        {activities.map(activity => (
          <div key={activity.id} className="flex justify-between p-3 bg-gray-50 rounded mb-2">
            <div>
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.category}</p>
            </div>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
              {activity.credits} credits
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const ResumePreview = () => (
    <div id="resume-preview" className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-sm text-gray-600">{profile.email} | {profile.phone}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-400 pb-1 mb-2">EDUCATION</h2>
        <p className="text-sm">{profile.course} - {profile.year}</p>
        <p className="text-sm">CGPA: {profile.cgpa}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-400 pb-1 mb-2">SKILLS</h2>
        <p className="text-sm">{profile.skills}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold border-b border-gray-400 pb-1 mb-2">ACHIEVEMENTS</h2>
        {activities.map(activity => (
          <p key={activity.id} className="text-sm">• {activity.title} ({activity.category})</p>
        ))}
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
            onClick={copyLink}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Copy Link
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Portfolio Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">Approved Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">Total Credits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-sm text-gray-600">Skills Listed</div>
          </div>
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
