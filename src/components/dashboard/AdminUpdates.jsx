import React from "react";
import dayjs from "dayjs";

const updates = [
  { id: 1, type: "Interview", title: "Amazon Campus Drive", date: "2024-02-15", time: "10:00 AM" },
  { id: 2, type: "Event", title: "Tech Fest 2024", date: "2024-02-20", time: "9:00 AM" },
  { id: 3, type: "Interview", title: "Google Interview Round", date: "2024-02-18", time: "2:00 PM" },
  { id: 4, type: "Event", title: "Workshop on AI/ML", date: "2024-02-22", time: "11:00 AM" }
];

export default function AdminUpdates() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">📢 Upcoming Updates</h3>
      <div className="space-y-3">
        {updates.map(update => (
          <div key={update.id} className="border-l-4 border-brand pl-4 py-2 bg-gray-50 rounded">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs px-2 py-1 rounded ${update.type === 'Interview' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {update.type}
                </span>
                <h4 className="font-medium mt-1">{update.title}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {dayjs(update.date).format("MMM D, YYYY")} at {update.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
