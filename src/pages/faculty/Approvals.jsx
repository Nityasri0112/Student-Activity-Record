import React, { useState, useEffect } from "react";
import { facultyAPI } from "../../services/api";

export default function Approvals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [comment, setComment] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(null);

  useEffect(() => {
    fetchPendingActivities();
  }, []);

  const fetchPendingActivities = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }
      
      console.log('Fetching pending activities...');
      
      const response = await fetch('http://localhost:5000/api/faculty/pending-approvals', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched activities:', data);
      setItems(data.data || []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      if (error.message.includes('Failed to fetch')) {
        alert('Cannot connect to server. Please check if backend is running.');
      } else {
        alert('Failed to load pending activities: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/activities/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ credits: 1, comment: comment })
      });
      
      if (!response.ok) {
        throw new Error('Failed to approve');
      }
      
      alert('Activity approved!');
      setItems(items.filter(i => i._id !== id));
      setComment('');
    } catch (error) {
      alert('Failed to approve: ' + error.message);
    }
  };

  const handleReject = async (id) => {
    if (!rejectReason) {
      alert("Please provide a reason for rejection");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/api/faculty/activities/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ reason: rejectReason })
      });
      
      if (!response.ok) {
        throw new Error('Failed to reject');
      }
      
      alert('Activity rejected');
      setItems(items.filter(i => i._id !== id));
      setShowRejectModal(null);
      setRejectReason("");
    } catch (error) {
      alert('Failed to reject: ' + error.message);
    }
  };

  const handleBulkApprove = async () => {
    if (selectedItems.length === 0) {
      alert("Please select items to approve");
      return;
    }
    try {
      await facultyAPI.bulkApprove(selectedItems);
      alert(`${selectedItems.length} items approved!`);
      setItems(items.filter(i => !selectedItems.includes(i._id)));
      setSelectedItems([]);
    } catch (error) {
      alert('Failed to bulk approve: ' + error.message);
    }
  };

  const toggleSelect = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Approval & Verification Panel</h2>
        <div className="flex gap-2">
          <button onClick={fetchPendingActivities} className="px-3 py-1 border rounded text-sm hover:bg-gray-50">
            🔄 Refresh
          </button>
          {selectedItems.length > 0 && (
            <button onClick={handleBulkApprove} className="px-4 py-2 bg-green-500 text-white rounded">
              Bulk Approve ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Pending Submissions ({items.length})</h3>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item._id} className="border rounded p-4">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => toggleSelect(item._id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">Student: {item.student?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-600">{item.category} | {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                    <button className="text-blue-600 text-sm">View Proof</button>
                  </div>
                  
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Add comment (optional)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full p-2 border rounded text-sm mb-2"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(item._id)}
                      className="px-4 py-2 bg-green-500 text-white rounded text-sm"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => setShowRejectModal(item._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded text-sm"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </div>
              </div>
              
              {showRejectModal === item._id && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded">
                  <label className="block text-sm font-medium mb-2">Reason for Rejection:</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    rows="2"
                    placeholder="Provide detailed reason..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleReject(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Confirm Reject
                    </button>
                    <button
                      onClick={() => setShowRejectModal(null)}
                      className="px-3 py-1 border rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
