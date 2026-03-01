import React, { useState } from "react";
import { studentAPI } from "../../services/api";

const categories = ["Workshop", "Conference", "MOOC", "Certification", "Club Activity", "Internship", "Volunteering", "Competition", "Leadership"];

export default function ActivityUpload() {
  const [form, setForm] = useState({ title: "", category: categories[0], date: "", level: "College", source: "", description: "", file: null });

  function onChange(e) {
    const { name, value, files } = e.target;
    if (name === "file") return setForm(f => ({ ...f, file: files[0] }));
    setForm(f => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    try {
      const activityData = {
        title: form.title,
        category: form.category,
        date: form.date,
        level: form.level,
        description: form.source ? `${form.description} (Source: ${form.source})` : form.description,
        certificateUrl: form.file ? form.file.name : ''
      };
      
      // Validate required fields
      if (!form.title || !form.date) {
        alert('Please fill in all required fields');
        return;
      }
      
      console.log('Sending data:', activityData);
      
      // Use the existing studentAPI service
      await studentAPI.uploadActivity(activityData);
      
      alert('Activity submitted successfully! Pending faculty approval.');
      setForm({ title: "", category: categories[0], date: "", level: "College", source: "", description: "", file: null });
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit activity: ' + error.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Upload Activity / Certificate</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="title" value={form.title} onChange={onChange} placeholder="Activity Title" className="p-3 border rounded" />
            <select required name="category" value={form.category} onChange={onChange} className="p-3 border rounded">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input required name="date" type="date" value={form.date} onChange={onChange} className="p-3 border rounded" />
            <select name="level" value={form.level} onChange={onChange} className="p-3 border rounded">
              <option>Department</option>
              <option>College</option>
              <option>State</option>
              <option>National</option>
              <option>International</option>
            </select>
            <input name="source" value={form.source} placeholder="Source (e.g., Coursera)" onChange={onChange} className="p-3 border rounded" />
          </div>

          <textarea name="description" value={form.description} onChange={onChange} rows={4} placeholder="Short description" className="w-full p-3 border rounded" />

          <div>
            <label className="block text-sm font-medium mb-2">Upload proof (PDF / JPG / PNG)</label>
            <input type="file" name="file" accept="application/pdf,image/*" onChange={onChange} />
            {form.file && <div className="text-sm mt-2">Selected: {form.file.name}</div>}
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded bg-brand text-white">Submit</button>
            <button type="button" onClick={() => setForm({ title: "", category: categories[0], date: "", level: "College", source: "", description: "", file: null })} className="px-4 py-2 rounded border">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
