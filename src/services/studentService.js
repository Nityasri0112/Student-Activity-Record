import { fetchData } from './api';

export const studentService = {
  getStudentDashboard: async (studentId) => {
    return fetchData(`/students/${studentId}/dashboard`);
  },

  getActivities: async (studentId) => {
    return fetchData(`/students/${studentId}/activities`);
  },

  getPortfolio: async (studentId) => {
    return fetchData(`/students/${studentId}/portfolio`);
  },

  updateProfile: async (studentId, profileData) => {
    return fetchData(`/students/${studentId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};
