import React from "react";
import { Link } from "react-router-dom";

export default function FacultyPanel() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Faculty Panel</h2>
        <div>
          <Link className="px-4 py-2 rounded bg-brand text-white mr-2" to="/faculty/approvals">Approvals</Link>
          <Link className="px-4 py-2 rounded border" to="/faculty/analytics">Analytics</Link>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          Faculty dashboard — quick stats and pending approvals.
        </div>
      </div>
    </div>
  );
}
