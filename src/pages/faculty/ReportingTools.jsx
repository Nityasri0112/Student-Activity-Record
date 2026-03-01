import React, { useState } from "react";

export default function ReportingTools() {
  const [filters, setFilters] = useState({ year: "2024", program: "All" });

  const generateReport = (type) => {
    alert(`Generating ${type} report for ${filters.year}, ${filters.program}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reporting Tools</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Report Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.year}
            onChange={(e) => setFilters({...filters, year: e.target.value})}
            className="p-3 border rounded"
          >
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
          </select>
          <select
            value={filters.program}
            onChange={(e) => setFilters({...filters, program: e.target.value})}
            className="p-3 border rounded"
          >
            <option>All Programs</option>
            <option>B.Tech CS</option>
            <option>B.Tech ECE</option>
            <option>B.Tech Mech</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Apply Filters</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Department Report Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded">
            <h4 className="font-medium mb-2">Year-wise Report</h4>
            <p className="text-sm text-gray-600 mb-3">Track student performance by academic year</p>
            <button onClick={() => generateReport('Year-wise')} className="px-4 py-2 bg-brand text-white rounded text-sm">
              Generate Report
            </button>
          </div>
          <div className="p-4 border rounded">
            <h4 className="font-medium mb-2">Program-wise Report</h4>
            <p className="text-sm text-gray-600 mb-3">Compare programs and departments</p>
            <button onClick={() => generateReport('Program-wise')} className="px-4 py-2 bg-brand text-white rounded text-sm">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Compliance Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <div className="text-3xl mb-2">📋</div>
            <h4 className="font-medium mb-2">NAAC Report</h4>
            <p className="text-sm text-gray-600 mb-3">Generate NAAC accreditation report</p>
            <button onClick={() => generateReport('NAAC')} className="px-4 py-2 bg-green-500 text-white rounded text-sm w-full">
              Generate
            </button>
          </div>
          <div className="p-4 border rounded">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-medium mb-2">NIRF Report</h4>
            <p className="text-sm text-gray-600 mb-3">Generate NIRF ranking report</p>
            <button onClick={() => generateReport('NIRF')} className="px-4 py-2 bg-blue-500 text-white rounded text-sm w-full">
              Generate
            </button>
          </div>
          <div className="p-4 border rounded">
            <div className="text-3xl mb-2">📊</div>
            <h4 className="font-medium mb-2">AICTE Report</h4>
            <p className="text-sm text-gray-600 mb-3">Generate AICTE compliance report</p>
            <button onClick={() => generateReport('AICTE')} className="px-4 py-2 bg-purple-500 text-white rounded text-sm w-full">
              Generate
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Export Data</h3>
        <div className="flex gap-4">
          <button className="px-4 py-2 border rounded">📄 Export as PDF</button>
          <button className="px-4 py-2 border rounded">📊 Export as Excel</button>
          <button className="px-4 py-2 border rounded">📋 Export as CSV</button>
        </div>
      </div>
    </div>
  );
}
