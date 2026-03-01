import React from "react";
import { useNavigate } from "react-router-dom";

const student = {
  name: "Alex Student",
  id: "2106030112",
  email: "alex.student@college.edu",
  phone: "+91 9876543210",
  cgpa: 8.38,
  department: "Computer Science",
  year: "Final Year",
  skills: ["React", "Node.js", "Python", "MongoDB", "AWS"],
  certificates: [
    { name: "AWS Certified Developer", issuer: "Amazon", date: "2024-01-15", verified: true },
    { name: "React Advanced", issuer: "Udemy", date: "2023-12-10", verified: true },
    { name: "Full Stack Development", issuer: "Coursera", date: "2023-11-05", verified: true }
  ],
  projects: [
    { name: "E-commerce Platform", tech: "MERN Stack", description: "Built a full-stack e-commerce application" },
    { name: "Chat Application", tech: "React, Socket.io", description: "Real-time messaging app with WebSocket" }
  ],
  achievements: [
    "Winner - College Hackathon 2023",
    "Best Project Award - Final Year",
    "Published Research Paper on AI"
  ]
};

export default function StudentProfile() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="text-brand hover:underline">← Back</button>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-brand text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{student.name}</h2>
              <p className="text-gray-600">{student.id}</p>
              <p className="text-sm text-gray-500">{student.department} | {student.year}</p>
              <div className="mt-2 flex gap-4 text-sm">
                <span>📧 {student.email}</span>
                <span>📱 {student.phone}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-brand">{student.cgpa}</div>
            <div className="text-sm text-gray-600">CGPA</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {student.skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Achievements</h3>
          <ul className="space-y-2">
            {student.achievements.map((ach, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Verified Certificates</h3>
        <div className="space-y-3">
          {student.certificates.map((cert, i) => (
            <div key={i} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h4 className="font-medium">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.issuer} | {cert.date}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Verified</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <div className="space-y-4">
          {student.projects.map((proj, i) => (
            <div key={i} className="border-l-4 border-brand pl-4">
              <h4 className="font-medium">{proj.name}</h4>
              <p className="text-sm text-gray-600">{proj.tech}</p>
              <p className="text-sm mt-1">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button className="px-6 py-3 bg-brand text-white rounded-lg">Shortlist Candidate</button>
        <button className="px-6 py-3 border rounded-lg">Download Resume</button>
        <button className="px-6 py-3 border rounded-lg">Send Message</button>
      </div>
    </div>
  );
}
