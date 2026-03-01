import React, { useState } from "react";

export default function ActivityManagement() {
  const [form, setForm] = useState({ title: "", type: "", date: "", venue: "" });
  const [activities, setActivities] = useState([
    { id: 1, title: "AI Workshop", type: "Workshop", date: "2024-02-20", assigned: 45 }
  ]);

  const addActivity = () => {
    if (!form.title || !form.type || !form.date) {
      alert("Please fill all fields");
      return;
    }
    setActivities([...activities, { id: Date.now(), ...form, assigned: 0 }]);
    setForm({ title: "", type: "", date: "", venue: "" });
    alert("Activity added successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Activity Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Add New Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Activity Title"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            className="p-3 border rounded"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({...form, type: e.target.value})}
            className="p-3 border rounded"
          >
            <option value="">Select Type</option>
            <option>Workshop</option>
            <option>Competition</option>
            <option>Seminar</option>
            <option>Conference</option>
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})}
            className="p-3 border rounded"
          />
          <input
            type="text"
            placeholder="Venue"
            value={form.venue}
            onChange={(e) => setForm({...form, venue: e.target.value})}
            className="p-3 border rounded"
          />
        </div>
        <button onClick={addActivity} className="mt-4 px-4 py-2 bg-brand text-white rounded">
          Add Activity
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Upcoming Activities</h3>
        <div className="space-y-3">
          {activities.map(activity => (
            <div key={activity.id} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.type} | {activity.date}</p>
                  <p className="text-sm text-gray-600">Assigned to: {activity.assigned} students</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
                    Assign Students
                  </button>
                  <button className="px-3 py-1 border rounded text-sm">Edit</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
