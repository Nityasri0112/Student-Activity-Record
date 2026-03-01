import React, { useState } from "react";

export default function Settings() {
  const [theme, setTheme] = useState("light");
  
  const applyTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
    alert(`${theme === 'dark' ? 'Dark' : 'Light'} theme applied successfully!`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Settings & Integrations</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">LMS/ERP Integration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">ERP System URL</label>
            <input type="text" placeholder="https://erp.college.edu" className="w-full p-3 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">API Key</label>
            <input type="password" placeholder="Enter API Key" className="w-full p-3 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">LMS System</label>
            <select className="w-full p-3 border rounded">
              <option>Moodle</option>
              <option>Canvas</option>
              <option>Blackboard</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-brand text-white rounded">Test Connection</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Report Templates</h3>
        <div className="space-y-3">
          <div className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">NAAC Template</div>
                <div className="text-sm text-gray-600">Configure NAAC report format</div>
              </div>
              <button className="text-blue-600 text-sm">Configure</button>
            </div>
          </div>
          <div className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">NIRF Template</div>
                <div className="text-sm text-gray-600">Configure NIRF report format</div>
              </div>
              <button className="text-blue-600 text-sm">Configure</button>
            </div>
          </div>
          <div className="p-4 border rounded">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Custom Report</div>
                <div className="text-sm text-gray-600">Create custom report template</div>
              </div>
              <button className="text-blue-600 text-sm">Create</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Portal Theme</h3>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <button
            onClick={() => setTheme('light')}
            className={`p-6 border-2 rounded transition ${theme === 'light' ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
          >
            <div className="text-4xl mb-2">☀️</div>
            <div className="font-medium">Light Mode</div>
            <div className="text-xs text-gray-500 mt-1">Default theme</div>
          </button>
          
          <button
            onClick={() => setTheme('dark')}
            className={`p-6 border-2 rounded transition ${theme === 'dark' ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}
          >
            <div className="text-4xl mb-2">🌙</div>
            <div className="font-medium">Dark Mode</div>
            <div className="text-xs text-gray-500 mt-1">Easy on eyes</div>
          </button>
        </div>
        <button 
          onClick={applyTheme}
          className="mt-4 px-6 py-3 bg-brand text-white rounded hover:opacity-90"
        >
          Apply Theme
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Email Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">SMTP Server</label>
            <input type="text" placeholder="smtp.gmail.com" className="w-full p-3 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email From</label>
            <input type="email" placeholder="noreply@college.edu" className="w-full p-3 border rounded" />
          </div>
          <button className="px-4 py-2 bg-brand text-white rounded">Save Configuration</button>
        </div>
      </div>
    </div>
  );
}
