import React, { useState } from "react";

export default function MasterControl() {
  const [activeTab, setActiveTab] = useState("departments");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Master Control</h2>
      
      <div className="flex gap-2 border-b">
        <button onClick={() => setActiveTab("departments")} className={`px-4 py-2 ${activeTab === "departments" ? "border-b-2 border-brand text-brand" : ""}`}>Departments</button>
        <button onClick={() => setActiveTab("faculty")} className={`px-4 py-2 ${activeTab === "faculty" ? "border-b-2 border-brand text-brand" : ""}`}>Faculty</button>
        <button onClick={() => setActiveTab("recruiters")} className={`px-4 py-2 ${activeTab === "recruiters" ? "border-b-2 border-brand text-brand" : ""}`}>Recruiters</button>
        <button onClick={() => setActiveTab("roles")} className={`px-4 py-2 ${activeTab === "roles" ? "border-b-2 border-brand text-brand" : ""}`}>Roles</button>
      </div>

      {activeTab === "departments" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Departments</h3>
            <button className="px-4 py-2 bg-brand text-white rounded">Add Department</button>
          </div>
          <div className="space-y-2">
            {["Computer Science", "Electronics", "Mechanical", "Civil"].map((dept, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded">
                <span>{dept}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600 text-sm">Edit</button>
                  <button className="text-red-600 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "faculty" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Faculty Management</h3>
            <button className="px-4 py-2 bg-brand text-white rounded">Add Faculty</button>
          </div>
          <div className="space-y-2">
            {["Dr. Smith - CS", "Prof. Johnson - ECE", "Dr. Williams - Mech"].map((fac, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded">
                <span>{fac}</span>
                <div className="flex gap-2">
                  <button className="text-blue-600 text-sm">Edit</button>
                  <button className="text-red-600 text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "recruiters" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Recruiter Approvals</h3>
          <div className="space-y-2">
            {["Tech Corp - Pending", "Amazon - Approved", "Google - Pending"].map((rec, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded">
                <span>{rec}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">Roles & Permissions</h3>
          <div className="space-y-3">
            {["Admin - Full Access", "Faculty - Approve/View", "Student - View Only"].map((role, i) => (
              <div key={i} className="p-3 border rounded">
                <div className="font-medium">{role}</div>
                <button className="text-blue-600 text-sm mt-2">Edit Permissions</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
