import React, { useState } from "react";

const allStudents = [
  { id: 1, name: "Alex Student", roll: "CS001", dept: "CS", skills: ["React", "Node.js"], achievements: 12, credits: 45, attendance: 92 },
  { id: 2, name: "John Doe", roll: "CS002", dept: "CS", skills: ["Python", "Django"], achievements: 8, credits: 38, attendance: 85 },
  { id: 3, name: "Jane Smith", roll: "ECE001", dept: "ECE", skills: ["VLSI", "Embedded"], achievements: 15, credits: 50, attendance: 95 }
];

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    skill: "",
    minAchievements: "",
    minCredits: "",
    minAttendance: ""
  });
  const [results, setResults] = useState(allStudents);

  const handleSearch = () => {
    let filtered = allStudents.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.roll.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.dept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.skill) {
      filtered = filtered.filter(s => 
        s.skills.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase()))
      );
    }
    if (filters.minAchievements) {
      filtered = filtered.filter(s => s.achievements >= parseInt(filters.minAchievements));
    }
    if (filters.minCredits) {
      filtered = filtered.filter(s => s.credits >= parseInt(filters.minCredits));
    }
    if (filters.minAttendance) {
      filtered = filtered.filter(s => s.attendance >= parseInt(filters.minAttendance));
    }

    setResults(filtered);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({ skill: "", minAchievements: "", minCredits: "", minAttendance: "" });
    setResults(allStudents);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Search & Filter Students</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Search</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, roll no, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border rounded"
          />
          <button onClick={handleSearch} className="px-6 py-2 bg-brand text-white rounded">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Advanced Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Skill Set</label>
            <input
              type="text"
              placeholder="e.g. React"
              value={filters.skill}
              onChange={(e) => setFilters({...filters, skill: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Achievements</label>
            <input
              type="number"
              placeholder="e.g. 10"
              value={filters.minAchievements}
              onChange={(e) => setFilters({...filters, minAchievements: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Credits</label>
            <input
              type="number"
              placeholder="e.g. 40"
              value={filters.minCredits}
              onChange={(e) => setFilters({...filters, minCredits: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Attendance %</label>
            <input
              type="number"
              placeholder="e.g. 85"
              value={filters.minAttendance}
              onChange={(e) => setFilters({...filters, minAttendance: e.target.value})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={handleSearch} className="px-4 py-2 bg-blue-500 text-white rounded">
            Apply Filters
          </button>
          <button onClick={resetFilters} className="px-4 py-2 border rounded">
            Reset
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Results ({results.length})</h3>
        <div className="space-y-3">
          {results.map(student => (
            <div key={student.id} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.roll} | {student.dept}</p>
                  <p className="text-sm text-gray-600">Skills: {student.skills.join(", ")}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span>Achievements: {student.achievements}</span>
                    <span>Credits: {student.credits}</span>
                    <span>Attendance: {student.attendance}%</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-brand text-white rounded text-sm">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
