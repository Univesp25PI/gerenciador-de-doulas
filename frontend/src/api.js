// src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Intercepta requests e injeta o token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type") || "Bearer";

  if (token) {
    config.headers.Authorization = `${tokenType} ${token}`;
  }

  return config;
});

export default api;
