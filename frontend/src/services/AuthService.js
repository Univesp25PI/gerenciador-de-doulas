import { api } from '../api';
import mockLogin from '../mocks/responses/post_login.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true"; // ← CORRIGIDO

export const AuthService = {
  login: async (email, password) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockLogin.data), 300)
      );
    }

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    formData.append("grant_type", "password");

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    
    return response.data.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("doula_logada");
  },

  getToken: () => {
    return localStorage.getItem("access_token");
  },

  isAuthenticated: () => {
    return !!AuthService.getToken();
  }
};