import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { studentAPI } from "../../services/api";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }
      
      console.log('Fetching activities...');
      const data = await studentAPI.getActivities();
      console.log('Received data:', data);
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      alert('Failed to load activities: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this activity?')) return;
    try {
      await studentAPI.deleteActivity(id);
      setActivities(activities.filter(a => a._id !== id));
      alert('Activity deleted');
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    }
  };

  const handleEdit = (activity) => {
    setEditingId(activity._id);
    setEditForm({ title: activity.title, description: activity.description });
  };

  const handleUpdate = async (id) => {
    try {
      await studentAPI.updateActivity(id, editForm);
      setActivities(activities.map(a => 
        a._id === id ? { ...a, ...editForm } : a
      ));
      setEditingId(null);
      alert('Activity updated');
    } catch (error) {
      alert('Failed to update: ' + error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">My Activities</h2>
        <div className="flex gap-2">
          <button onClick={fetchActivities} className="px-4 py-2 rounded border hover:bg-gray-50">Refresh</button>
          <Link className="px-4 py-2 rounded bg-brand text-white" to="/student/activities/upload">Upload Activity</Link>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {activities.map(a => (
          <div key={a._id} className="bg-white p-4 rounded-lg shadow-sm">
            {editingId === a._id ? (
              <div className="space-y-3">
                <input
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full p-2 border rounded"
                  rows="2"
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(a._id)} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                  <button onClick={() => setEditingId(null)} className="px-3 py-1 border rounded text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-gray-500">{a.category} • {new Date(a.date).toLocaleDateString()}</div>
                  {a.description && <div className="text-sm text-gray-600 mt-1">{a.description}</div>}
                  {a.reviewComment && (
                    <div className="text-sm mt-2 p-2 bg-gray-50 rounded">
                      <span className="font-medium">Faculty Comment:</span> {a.reviewComment}
                    </div>
                  )}
                  {a.credits > 0 && (
                    <div className="text-sm text-green-600 mt-1">
                      Credits Awarded: {a.credits}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-sm ${a.status === "Approved" ? "bg-green-50 text-green-700" : a.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-800"}`}>
                    {a.status}
                  </div>
                  {a.status === 'Pending' && (
                    <>
                      <button onClick={() => handleEdit(a)} className="px-2 py-1 text-blue-600 text-sm hover:bg-blue-50 rounded">Edit</button>
                      <button onClick={() => handleDelete(a._id)} className="px-2 py-1 text-red-600 text-sm hover:bg-red-50 rounded">Delete</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
