import React, { useState, useEffect } from "react";
import { recruiterAPI } from "../../services/api";

export default function JobPosting() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", company: "", location: "", type: "Full-time", description: "", requirements: "", salary: "" });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await recruiterAPI.getJobs();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const addJob = async () => {
    if (!form.title || !form.company) return;
    try {
      const jobData = {
        ...form,
        requirements: form.requirements.split(',').map(r => r.trim()),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      };
      const data = await recruiterAPI.createJob(jobData);
      setJobs([...jobs, data.job]);
      setForm({ title: "", company: "", location: "", type: "Full-time", description: "", requirements: "", salary: "" });
      alert('Job posted successfully!');
    } catch (error) {
      alert('Failed to post job: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this job posting?')) return;
    try {
      await fetch(`http://localhost:5000/api/recruiter/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(jobs.filter(j => j._id !== id));
      alert('Job deleted');
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setEditForm({
      title: job.title,
      description: job.description,
      salary: job.salary,
      requirements: job.requirements.join(', ')
    });
  };

  const handleUpdate = async (id) => {
    try {
      const updateData = {
        ...editForm,
        requirements: editForm.requirements.split(',').map(r => r.trim())
      };
      await fetch(`http://localhost:5000/api/recruiter/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updateData)
      });
      setJobs(jobs.map(j => j._id === id ? { ...j, ...updateData } : j));
      setEditingId(null);
      alert('Job updated');
    } catch (error) {
      alert('Failed to update: ' + error.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Job & Internship Posting</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Post New Opening</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="text" placeholder="Job Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="p-2 border rounded" />
          <input type="text" placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="p-2 border rounded" />
          <input type="text" placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="p-2 border rounded" />
          <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="p-2 border rounded">
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
          <input type="text" placeholder="Salary Range" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} className="p-2 border rounded" />
          <input type="text" placeholder="Requirements (comma separated)" value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} className="p-2 border rounded" />
        </div>
        <textarea placeholder="Job Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full p-2 border rounded mt-3" rows="3"></textarea>
        <button onClick={addJob} className="px-4 py-2 bg-purple-600 text-white rounded mt-3">Post Job</button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Posted Jobs</h3>
        <div className="space-y-3">
          {jobs.map(j => (
            <div key={j._id} className="border p-4 rounded">
              {editingId === j._id ? (
                <div className="space-y-3">
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Job Title"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows="2"
                    placeholder="Description"
                  />
                  <input
                    value={editForm.salary}
                    onChange={(e) => setEditForm({...editForm, salary: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Salary"
                  />
                  <input
                    value={editForm.requirements}
                    onChange={(e) => setEditForm({...editForm, requirements: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder="Requirements (comma separated)"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(j._id)} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 border rounded text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{j.title}</h4>
                    <p className="text-sm text-gray-600">{j.company} • {j.location} • {j.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{j.description}</p>
                    <p className="text-sm text-green-600 mt-1">💰 {j.salary}</p>
                    <p className="text-sm mt-2">{j.applications?.length || 0} Applications</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(j)} className="px-2 py-1 text-blue-600 text-sm hover:bg-blue-50 rounded">Edit</button>
                    <button onClick={() => handleDelete(j._id)} className="px-2 py-1 text-red-600 text-sm hover:bg-red-50 rounded">Delete</button>
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
