import React from "react";

export default function AchievementsList() {
  const items = [
    { id: 1, title: "Intro to ML - Coursera", status: "Approved" },
    { id: 2, title: "Hackathon Runner-up", status: "Approved" }
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="font-semibold mb-3">Achievements</div>       
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex items-start justify-between">
            <div>
              <div className="font-medium">{i.title}</div>
              <div className="text-xs text-gray-500">Certificate / Proof</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${i.status === "Approved" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-800"}`}>{i.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
