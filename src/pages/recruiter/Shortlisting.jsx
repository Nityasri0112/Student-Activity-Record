import React, { useState } from "react";

const candidates = [
  { id: 1, name: "Alex Student", cgpa: 8.38, skills: "React, Node.js", score: 85 },
  { id: 2, name: "John Doe", cgpa: 7.85, skills: "Python, Django", score: 78 },
  { id: 3, name: "Jane Smith", cgpa: 9.12, skills: "Java, Spring", score: 92 }
];

export default function Shortlisting() {
  const [shortlist, setShortlist] = useState([]);

  const toggleShortlist = (id) => {
    setShortlist(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Shortlisting Panel</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Candidates ({candidates.length})</h3>
        <div className="space-y-3">
          {candidates.map(c => (
            <div key={c.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <h4 className="font-medium">{c.name}</h4>
                <p className="text-sm text-gray-600">CGPA: {c.cgpa} | Skills: {c.skills} | Score: {c.score}</p>
              </div>
              <button 
                onClick={() => toggleShortlist(c.id)}
                className={`px-4 py-2 rounded ${shortlist.includes(c.id) ? 'bg-green-500 text-white' : 'border'}`}
              >
                {shortlist.includes(c.id) ? 'Shortlisted' : 'Shortlist'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {shortlist.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Shortlisted ({shortlist.length})</h3>
          <button className="px-4 py-2 bg-brand text-white rounded">Send to Placement Team</button>
        </div>
      )}
    </div>
  );
}
