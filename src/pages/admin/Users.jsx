import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await adminAPI.getUsers();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await adminAPI.deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      alert('User deleted');
    } catch (error) {
      alert('Failed to delete: ' + error.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdate = async (id) => {
    try {
      await adminAPI.updateUser(id, editForm);
      setUsers(users.map(u => u._id === id ? { ...u, ...editForm } : u));
      setEditingUser(null);
      alert('User updated');
    } catch (error) {
      alert('Failed to update: ' + error.message);
    }
  };

  const filtered = users.filter(u => 
    (filter === "All" || u.role.toLowerCase() === filter.toLowerCase()) &&
    (searchTerm === "" || u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">User Management</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 border rounded"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-3 border rounded">
            <option>All</option>
            <option>Student</option>
            <option>Faculty</option>
            <option>Recruiter</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm">Name</th>
                <th className="px-4 py-2 text-left text-sm">Role</th>
                <th className="px-4 py-2 text-left text-sm">Email</th>
                <th className="px-4 py-2 text-left text-sm">Status</th>
                <th className="px-4 py-2 text-left text-sm">Last Login</th>
                <th className="px-4 py-2 text-left text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user._id} className="border-t">
                  {editingUser === user._id ? (
                    <td colSpan="6" className="px-4 py-3">
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="p-2 border rounded"
                          placeholder="Name"
                        />
                        <input
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="p-2 border rounded"
                          placeholder="Email"
                        />
                        <select
                          value={editForm.role}
                          onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                          className="p-2 border rounded"
                        >
                          <option value="student">Student</option>
                          <option value="faculty">Faculty</option>
                          <option value="recruiter">Recruiter</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleUpdate(user._id)} className="px-3 py-1 bg-green-500 text-white rounded text-sm">Save</button>
                        <button onClick={() => setEditingUser(null)} className="px-3 py-1 border rounded text-sm">Cancel</button>
                      </div>
                    </td>
                  ) : (
                    <>
                      <td className="px-4 py-3 text-sm">{user.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'student' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'faculty' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(user)} className="text-orange-600 text-sm hover:bg-orange-50 px-2 py-1 rounded">Edit</button>
                          <button onClick={() => handleDelete(user._id)} className="text-red-600 text-sm hover:bg-red-50 px-2 py-1 rounded">Delete</button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-4">Recent Updates</h3>
        <div className="space-y-2 text-sm">
          <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
            <div className="font-medium">New Student Registration</div>
            <div className="text-gray-600">Jane Smith registered - 2 hours ago</div>
          </div>
          <div className="p-3 border-l-4 border-green-500 bg-green-50">
            <div className="font-medium">Faculty Account Activated</div>
            <div className="text-gray-600">Prof. Johnson activated - 5 hours ago</div>
          </div>
          <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
            <div className="font-medium">Recruiter Approved</div>
            <div className="text-gray-600">Tech Corp approved - 1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}
