import React from "react";

const logs = [
  { id: 1, action: "Certificate Approved", user: "Dr. Smith", timestamp: "2024-02-10 10:30 AM", status: "Success" },
  { id: 2, action: "Student Registered", user: "Admin", timestamp: "2024-02-10 09:15 AM", status: "Success" },
  { id: 3, action: "Recruiter Account Created", user: "Admin", timestamp: "2024-02-10 08:45 AM", status: "Success" },
  { id: 4, action: "Data Backup", user: "System", timestamp: "2024-02-10 02:00 AM", status: "Success" }
];

export default function AuditLogs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Audit & Logs</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Approval History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm">Action</th>
                <th className="px-4 py-2 text-left text-sm">User</th>
                <th className="px-4 py-2 text-left text-sm">Timestamp</th>
                <th className="px-4 py-2 text-left text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-t">
                  <td className="px-4 py-3 text-sm">{log.action}</td>
                  <td className="px-4 py-3 text-sm">{log.user}</td>
                  <td className="px-4 py-3 text-sm">{log.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Compliance Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border rounded text-left hover:bg-gray-50">
            <div className="font-medium">NAAC Report</div>
            <div className="text-sm text-gray-600 mt-1">Generate NAAC compliance report</div>
          </button>
          <button className="p-4 border rounded text-left hover:bg-gray-50">
            <div className="font-medium">NIRF Report</div>
            <div className="text-sm text-gray-600 mt-1">Generate NIRF ranking report</div>
          </button>
          <button className="p-4 border rounded text-left hover:bg-gray-50">
            <div className="font-medium">Placement Report</div>
            <div className="text-sm text-gray-600 mt-1">Generate placement statistics</div>
          </button>
          <button className="p-4 border rounded text-left hover:bg-gray-50">
            <div className="font-medium">Activity Report</div>
            <div className="text-sm text-gray-600 mt-1">Generate student activity report</div>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Portal Usage Monitor</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-sm text-gray-600">Total Logins Today</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-green-600">342</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-gray-600">Actions Performed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
