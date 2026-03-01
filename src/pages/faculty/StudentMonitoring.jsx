import React, { useState } from "react";

const students = [
  { id: 1, name: "Alex Student", roll: "CS001", attendance: 92, cgpa: 8.38, activities: 12 },
  { id: 2, name: "John Doe", roll: "CS002", attendance: 85, cgpa: 7.85, activities: 8 },
  { id: 3, name: "Jane Smith", roll: "CS003", attendance: 95, cgpa: 9.12, activities: 15 }
];

export default function StudentMonitoring() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Student Monitoring</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Students List</h3>
          <div className="space-y-2">
            {students.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className={`w-full text-left p-3 rounded border ${selectedStudent?.id === s.id ? 'bg-blue-50 border-blue-500' : ''}`}
              >
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-gray-600">{s.roll}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {selectedStudent ? (
            <>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Student Progress</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded">
                    <div className="text-2xl font-bold text-blue-600">{selectedStudent.attendance}%</div>
                    <div className="text-sm text-gray-600">Attendance</div>
                  </div>
                  <div className="p-4 border rounded">
                    <div className="text-2xl font-bold text-green-600">{selectedStudent.cgpa}</div>
                    <div className="text-sm text-gray-600">CGPA</div>
                  </div>
                  <div className="p-4 border rounded">
                    <div className="text-2xl font-bold text-purple-600">{selectedStudent.activities}</div>
                    <div className="text-sm text-gray-600">Activities</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Attendance Analysis</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 border-b">
                    <span>January 2024</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span>December 2023</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <div className="flex justify-between p-2 border-b">
                    <span>November 2023</span>
                    <span className="font-medium">88%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Performance Pattern</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 border-l-4 border-green-500">
                    <strong>Strength:</strong> Consistent attendance and high CGPA
                  </div>
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500">
                    <strong>Area to Improve:</strong> Participation in competitions
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-500">
                    <strong>Recommendation:</strong> Encourage more technical workshops
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm h-full flex items-center justify-center text-gray-400">
              Select a student to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
