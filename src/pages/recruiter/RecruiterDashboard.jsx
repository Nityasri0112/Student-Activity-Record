import React, { useState } from "react";

const students = [
  { id: 1, name: "Alex Student", cgpa: 8.38, skills: "React, Node.js", verified: true },
  { id: 2, name: "John Doe", cgpa: 7.85, skills: "Python, Django", verified: true },
  { id: 3, name: "Jane Smith", cgpa: 9.12, skills: "Java, Spring", verified: true }
];

export default function RecruiterDashboard() {
  const [minCGPA, setMinCGPA] = useState(7.0);
  const [skillFilter, setSkillFilter] = useState("");

  const filtered = students.filter(s => 
    s.verified && s.cgpa >= minCGPA && 
    (skillFilter === "" || s.skills.toLowerCase().includes(skillFilter.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Recruiter Dashboard</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Min CGPA</label>
            <input type="number" step="0.1" value={minCGPA} onChange={e => setMinCGPA(parseFloat(e.target.value))} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm mb-2">Skills</label>
            <input type="text" value={skillFilter} onChange={e => setSkillFilter(e.target.value)} placeholder="e.g. React" className="w-full p-2 border rounded" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Verified Students ({filtered.length})</h3>
        <div className="space-y-3">
          {filtered.map(s => (
            <div key={s.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h4 className="font-medium">{s.name}</h4>
                <p className="text-sm text-gray-600">CGPA: {s.cgpa} | Skills: {s.skills}</p>
              </div>
              <button onClick={() => window.location.href = '/recruiter/student/profile'} className="px-4 py-2 bg-brand text-white rounded">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
