import React, { useState, useEffect } from "react";
import { studentAPI } from "../../services/api";

export default function DocumentVerification() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correctionRequest, setCorrectionRequest] = useState('');
  const [showCorrectionModal, setShowCorrectionModal] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await studentAPI.getActivities();
      setActivities(data.activities || []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestCorrection = async (activityId) => {
    if (!correctionRequest.trim()) {
      alert('Please provide correction details');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/students/activities/${activityId}/request-correction`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ 
          correctionRequest: correctionRequest,
          status: 'Pending' // Reset to pending for re-review
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to request correction');
      }
      
      alert('Correction request submitted successfully!');
      setShowCorrectionModal(null);
      setCorrectionRequest('');
      fetchActivities(); // Refresh data
    } catch (error) {
      alert('Failed to request correction: ' + error.message);
    }
  };

  const stats = {
    approved: activities.filter(a => a.status === 'Approved').length,
    pending: activities.filter(a => a.status === 'Pending').length,
    rejected: activities.filter(a => a.status === 'Rejected').length
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Document Verification Status</h2>
        <button onClick={fetchActivities} className="px-4 py-2 rounded border hover:bg-gray-50">Refresh</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-sm text-gray-600 mt-1">Approved</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-gray-600 mt-1">Pending</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
          <div className="text-sm text-gray-600 mt-1">Rejected</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Submitted Documents ({activities.length})</h3>
        <div className="space-y-3">
          {activities.map(doc => (
            <div key={doc._id} className="border rounded p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{doc.title}</h4>
                  <p className="text-sm text-gray-600">{doc.category} | {new Date(doc.date).toLocaleDateString()}</p>
                  {doc.reviewedBy && <p className="text-sm text-gray-600">Reviewer: {doc.reviewedBy.name}</p>}
                  {doc.credits > 0 && <p className="text-sm text-green-600">Credits: {doc.credits}</p>}
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  doc.status === 'Approved' ? 'bg-green-100 text-green-700' :
                  doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {doc.status}
                </span>
              </div>
              
              {doc.reviewComment && (
                <div className="mt-2 p-2 bg-gray-50 border-l-4 border-gray-400 text-sm">
                  <strong>Faculty Comment:</strong> {doc.reviewComment}
                </div>
              )}
              
              {doc.status === 'Rejected' && (
                <div className="mt-2">
                  <button 
                    onClick={() => setShowCorrectionModal(doc._id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Request Correction
                  </button>
                </div>
              )}
              
              {doc.status === 'Pending' && (
                <div className="mt-2 text-sm text-gray-600">
                  ⏳ Awaiting faculty approval
                </div>
              )}
              
              {showCorrectionModal === doc._id && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                  <label className="block text-sm font-medium mb-2">Correction Request:</label>
                  <textarea
                    value={correctionRequest}
                    onChange={(e) => setCorrectionRequest(e.target.value)}
                    className="w-full p-2 border rounded text-sm"
                    rows="3"
                    placeholder="Explain what needs to be corrected..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleRequestCorrection(doc._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                      Submit Request
                    </button>
                    <button
                      onClick={() => setShowCorrectionModal(null)}
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
