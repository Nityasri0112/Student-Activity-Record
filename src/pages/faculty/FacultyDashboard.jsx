import React from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Faculty Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md" onClick={() => navigate('/faculty/approvals')}>
          <div className="text-3xl font-bold text-yellow-600">24</div>
          <div className="text-sm text-gray-600 mt-1">Pending Approvals</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-blue-600">156</div>
          <div className="text-sm text-gray-600 mt-1">Total Students</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-green-600">89%</div>
          <div className="text-sm text-gray-600 mt-1">Avg Attendance</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-purple-600">342</div>
          <div className="text-sm text-gray-600 mt-1">Activities This Month</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Class-wise Summary</h3>
          <div className="space-y-3">
            {['CS-A', 'CS-B', 'CS-C'].map((cls, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded">
                <span className="font-medium">{cls}</span>
                <div className="flex gap-4 text-sm">
                  <span>Students: {50 + i * 2}</span>
                  <span className="text-green-600">Avg: 8.{2 + i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">📢 Notifications</h3>
          <div className="space-y-2">
            <div className="p-3 bg-yellow-50 border-l-4 border-yellow-500 text-sm">
              <strong>New Submission:</strong> 5 certificates pending review
            </div>
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 text-sm">
              <strong>Reminder:</strong> NAAC report due in 3 days
            </div>
            <div className="p-3 bg-green-50 border-l-4 border-green-500 text-sm">
              <strong>Update:</strong> Workshop scheduled for Feb 20
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Activity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-blue-600">45</div>
            <div className="text-sm text-gray-600">Workshops Attended</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-green-600">78</div>
            <div className="text-sm text-gray-600">Certifications Earned</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-purple-600">23</div>
            <div className="text-sm text-gray-600">Competitions Won</div>
          </div>
        </div>
      </div>
    </div>
  );
}
