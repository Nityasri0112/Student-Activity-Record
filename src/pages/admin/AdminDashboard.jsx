import React from "react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-blue-600">1,245</div>
          <div className="text-sm text-gray-600 mt-1">Total Students</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-green-600">87</div>
          <div className="text-sm text-gray-600 mt-1">Faculty Members</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-purple-600">34</div>
          <div className="text-sm text-gray-600 mt-1">Recruiters</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-orange-600">156</div>
          <div className="text-sm text-gray-600 mt-1">Active Jobs</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Activity Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Pending Approvals</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">New Registrations</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Active Sessions</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">342</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Institution Analytics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Certificates Verified</span>
              <span className="font-medium">1,234</span>
            </div>
            <div className="flex justify-between">
              <span>Placement Rate</span>
              <span className="font-medium">78%</span>
            </div>
            <div className="flex justify-between">
              <span>Average CGPA</span>
              <span className="font-medium">7.85</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
