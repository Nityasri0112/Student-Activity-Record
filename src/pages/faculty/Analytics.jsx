import React from "react";
import ParticipationChart from "../../components/charts/ParticipationChart";

export default function Analytics() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Institution Analytics</h2>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ParticipationChart />
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="font-semibold">Top Stats</div>
          <ul className="mt-3 list-disc ml-5 text-sm">
            <li>Average Credits Earned: 14</li>
            <li>Verified Certificates (this month): 24</li>
            <li>Active Students: 1,010</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
