import React from "react";

export default function CreditsTracker() {
  const earned = 12, target = 20;
  const pct = Math.round((earned / target) * 100);
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="text-sm text-gray-500">Activity Credits</div>
      <div className="text-xl font-semibold mt-2">{earned} / {target}</div>
      <div className="w-full bg-gray-100 rounded-full h-3 mt-3 overflow-hidden">
        <div style={{ width: `${pct}%` }} className="h-3 bg-gradient-to-r from-brand to-purple-400" />
      </div>
      <div className="text-xs text-gray-500 mt-2">{pct}% of required credits</div>
    </div>
  );
}
