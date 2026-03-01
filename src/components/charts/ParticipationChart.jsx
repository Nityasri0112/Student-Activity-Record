import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { name: "Certs", value: 3 },
  { name: "Competitions", value: 2 },
  { name: "Workshops", value: 4 }
];

export default function ParticipationChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="font-semibold mb-3">Participation</div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6b46ff" radius={[6,6,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
