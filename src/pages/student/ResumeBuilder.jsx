import React, { useState } from "react";

export default function ResumeBuilder() {
  const [template, setTemplate] = useState("modern");
  const [isEditing, setIsEditing] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: "Alex Student",
    email: "alex.student@college.edu",
    phone: "+91 9876543210",
    education: "B.Tech Computer Science - CGPA: 8.38",
    skills: "React, Node.js, Python, MongoDB, AWS",
    projects: "E-commerce Platform - Built using MERN Stack"
  });
  const [aiOptimizing, setAiOptimizing] = useState(false);

  const handleDownloadPDF = () => {
    const content = `
      ${resumeData.name}
      ${resumeData.email} | ${resumeData.phone}
      
      EDUCATION
      ${resumeData.education}
      
      SKILLS
      ${resumeData.skills}
      
      PROJECTS
      ${resumeData.projects}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.name.replace(' ', '_')}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
    alert('Resume downloaded! (Note: For proper PDF, integrate with jsPDF library)');
  };

  const handleAIOptimize = async () => {
    setAiOptimizing(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        skills: "React.js, Node.js, Python, MongoDB, AWS, JavaScript, HTML/CSS, Git",
        projects: "E-commerce Platform - Developed full-stack web application using MERN Stack with user authentication, payment integration, and responsive design"
      }));
      setAiOptimizing(false);
      alert('Resume optimized with AI suggestions!');
    }, 2000);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    alert('Resume content updated!');
  };

  const getTemplateStyles = () => {
    switch(template) {
      case 'modern':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-white',
          header: 'text-blue-900 border-b-2 border-blue-500',
          section: 'text-blue-800 border-b border-blue-300',
          text: 'text-gray-700'
        };
      case 'classic':
        return {
          container: 'bg-white',
          header: 'text-black font-serif',
          section: 'text-black font-serif border-b-2 border-black',
          text: 'text-gray-900 font-serif'
        };
      case 'minimal':
        return {
          container: 'bg-gray-50',
          header: 'text-gray-800',
          section: 'text-gray-700 border-b border-gray-400',
          text: 'text-gray-600'
        };
      default:
        return {
          container: 'bg-gray-50',
          header: 'text-gray-800',
          section: 'text-gray-700 border-b border-gray-400',
          text: 'text-gray-600'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">AI Resume Builder</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">🤖 AI Resume Suggestions</h3>
        <div className="space-y-3 text-sm">
          <div className="p-3 bg-blue-50 border-l-4 border-blue-500">
            <strong>Skill Recommendation:</strong> Add "React.js" and "Node.js" to match 85% of job postings
          </div>
          <div className="p-3 bg-green-50 border-l-4 border-green-500">
            <strong>Project Suggestion:</strong> Highlight your E-commerce project in the summary
          </div>
          <div className="p-3 bg-purple-50 border-l-4 border-purple-500">
            <strong>Format Tip:</strong> Use action verbs like "Developed", "Implemented", "Led"
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Select Template</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["modern", "classic", "minimal"].map(t => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              className={`p-4 border-2 rounded capitalize ${template === t ? 'border-brand bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="text-4xl mb-2">📄</div>
              <div className="font-medium">{t}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Resume Preview</h3>
        <div className={`border rounded p-6 min-h-96 ${styles.container}`}>
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  value={resumeData.name}
                  onChange={(e) => setResumeData({...resumeData, name: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    value={resumeData.email}
                    onChange={(e) => setResumeData({...resumeData, email: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    value={resumeData.phone}
                    onChange={(e) => setResumeData({...resumeData, phone: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <input
                  value={resumeData.education}
                  onChange={(e) => setResumeData({...resumeData, education: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills</label>
                <textarea
                  value={resumeData.skills}
                  onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Projects</label>
                <textarea
                  value={resumeData.projects}
                  onChange={(e) => setResumeData({...resumeData, projects: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-500 text-white rounded">Save Changes</button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-4">
                <h2 className={`text-2xl font-bold ${styles.header}`}>{resumeData.name}</h2>
                <p className={`text-sm ${styles.text}`}>{resumeData.email} | {resumeData.phone}</p>
              </div>
              
              <div className="mb-4">
                <h3 className={`font-semibold pb-1 mb-2 ${styles.section}`}>Education</h3>
                <p className={`text-sm ${styles.text}`}>{resumeData.education}</p>
              </div>
              
              <div className="mb-4">
                <h3 className={`font-semibold pb-1 mb-2 ${styles.section}`}>Skills</h3>
                <p className={`text-sm ${styles.text}`}>{resumeData.skills}</p>
              </div>
              
              <div className="mb-4">
                <h3 className={`font-semibold pb-1 mb-2 ${styles.section}`}>Projects</h3>
                <p className={`text-sm ${styles.text}`}>{resumeData.projects}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex gap-3">
          <button onClick={handleDownloadPDF} className="px-4 py-2 bg-brand text-white rounded hover:bg-blue-700">
            📄 Download PDF
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)} 
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            ✏️ {isEditing ? 'Cancel Edit' : 'Edit Content'}
          </button>
          <button 
            onClick={handleAIOptimize} 
            disabled={aiOptimizing}
            className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {aiOptimizing ? '🔄 Optimizing...' : '🤖 AI Optimize'}
          </button>
        </div>
      </div>
    </div>
  );
}
