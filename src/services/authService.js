import { fetchData } from './api';

export const authService = {
  login: async (credentials) => {
    return fetchData('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    return fetchData('/auth/logout', {
      method: 'POST',
    });
  },

  register: async (userData) => {
    return fetchData('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  verifyToken: async (token) => {
    return fetchData('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};
