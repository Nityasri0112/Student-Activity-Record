const API_BASE_URL = '/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// API call helper
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please check if backend is running.');
    }
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  register: (userData) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  forgotPassword: (email) => apiCall('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token, newPassword) => apiCall('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, newPassword }) }),
  resetPasswordDirect: (email, newPassword) => apiCall('/auth/reset-password-direct', { method: 'POST', body: JSON.stringify({ email, newPassword }) }),
};

// Student APIs
export const studentAPI = {
  getProfile: () => apiCall('/students/profile'),
  updateProfile: (data) => apiCall('/students/profile', { method: 'PUT', body: JSON.stringify(data) }),
  getActivities: () => apiCall('/students/activities'),
  uploadActivity: (data) => apiCall('/students/activities', { method: 'POST', body: JSON.stringify(data) }),
  updateActivity: (id, data) => apiCall(`/students/activities/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteActivity: (id) => apiCall(`/students/activities/${id}`, { method: 'DELETE' }),
  updateResume: (data) => apiCall('/students/resume', { method: 'PUT', body: JSON.stringify(data) }),
  updatePortfolio: (data) => apiCall('/students/portfolio', { method: 'PUT', body: JSON.stringify(data) }),
};

// Faculty APIs
export const facultyAPI = {
  getPendingActivities: () => apiCall('/faculty/pending-approvals'),
  approveActivity: (id) => apiCall(`/faculty/activities/${id}/approve`, { method: 'PUT' }),
  rejectActivity: (id, reason) => apiCall(`/faculty/activities/${id}/reject`, { method: 'PUT', body: JSON.stringify({ reason }) }),
  bulkApprove: (ids) => apiCall('/faculty/activities/bulk-approve', { method: 'PUT', body: JSON.stringify({ activityIds: ids }) }),
  getStudents: () => apiCall('/faculty/students'),
  getReports: () => apiCall('/faculty/reports'),
};

// Recruiter APIs
export const recruiterAPI = {
  getStudents: (filters) => apiCall(`/recruiters/students?${new URLSearchParams(filters)}`),
  getStudentProfile: (id) => apiCall(`/recruiters/students/${id}`),
  createJob: (data) => apiCall('/recruiters/jobs', { method: 'POST', body: JSON.stringify(data) }),
  getJobs: () => apiCall('/recruiters/jobs'),
  shortlistStudent: (jobId, studentId) => apiCall(`/recruiters/jobs/${jobId}/shortlist`, { method: 'POST', body: JSON.stringify({ studentId }) }),
  getApplications: (jobId) => apiCall(`/recruiters/jobs/${jobId}/applications`),
};

// Admin APIs
export const adminAPI = {
  getStats: () => apiCall('/admin/stats'),
  getUsers: () => apiCall('/admin/users'),
  createUser: (data) => apiCall('/admin/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id, data) => apiCall(`/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id) => apiCall(`/admin/users/${id}`, { method: 'DELETE' }),
  bulkUpload: (users) => apiCall('/admin/bulk-upload', { method: 'POST', body: JSON.stringify({ users }) }),
  getAuditLogs: () => apiCall('/admin/audit-logs'),
};
