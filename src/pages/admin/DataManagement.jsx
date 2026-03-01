import React, { useState } from "react";

export default function DataManagement() {
  const [file, setFile] = useState(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Data Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Bulk Upload Student Data</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="fileUpload" accept=".csv,.xlsx" />
          <label htmlFor="fileUpload" className="cursor-pointer">
            <div className="text-4xl mb-2">📁</div>
            <div className="text-sm text-gray-600">Click to upload CSV or Excel file</div>
            {file && <div className="text-sm text-brand mt-2">{file.name}</div>}
          </label>
        </div>
        <button className="mt-4 px-4 py-2 bg-brand text-white rounded">Upload Data</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Sync ERP/LMS Data</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <div className="font-medium">Student Records</div>
              <div className="text-sm text-gray-600">Last synced: 2 hours ago</div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Sync Now</button>
          </div>
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <div className="font-medium">Attendance Data</div>
              <div className="text-sm text-gray-600">Last synced: 1 day ago</div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Sync Now</button>
          </div>
          <div className="flex justify-between items-center p-3 border rounded">
            <div>
              <div className="font-medium">Grade Records</div>
              <div className="text-sm text-gray-600">Last synced: 3 hours ago</div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Sync Now</button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Backup & Restore</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h4 className="font-medium mb-2">Create Backup</h4>
            <p className="text-sm text-gray-600 mb-3">Generate a full system backup</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Create Backup</button>
          </div>
          <div className="border p-4 rounded">
            <h4 className="font-medium mb-2">Restore Data</h4>
            <p className="text-sm text-gray-600 mb-3">Restore from previous backup</p>
            <button className="px-4 py-2 bg-orange-500 text-white rounded">Restore</button>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Recent Backups</h4>
          <div className="space-y-2">
            {["Backup_2024_02_10.zip", "Backup_2024_02_09.zip", "Backup_2024_02_08.zip"].map((backup, i) => (
              <div key={i} className="flex justify-between items-center p-2 border rounded text-sm">
                <span>{backup}</span>
                <button className="text-blue-600">Download</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
