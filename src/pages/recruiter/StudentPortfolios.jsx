import React from "react";

const portfolios = [
  { id: 1, student: "Alex Student", certificates: 5, projects: 3, verified: true },
  { id: 2, student: "John Doe", certificates: 8, projects: 2, verified: true }
];

export default function StudentPortfolios() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Student Portfolios</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolios.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">{p.student}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {p.certificates} Certificates | {p.projects} Projects
            </p>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Verified</span>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-brand text-white rounded text-sm">View Portfolio</button>
              <button className="px-4 py-2 border rounded text-sm">Download PDF</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
