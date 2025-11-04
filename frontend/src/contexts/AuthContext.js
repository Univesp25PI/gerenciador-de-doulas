// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";
import { DoulaService } from "../services/DoulaService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [doula, setDoula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      const token = AuthService.getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await DoulaService.getMe();
        setDoula(data);
      } catch (err) {
        console.error("Erro ao buscar doula logada:", err);
        AuthService.logout();
        setError("Sessão expirada. Faça login novamente.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const response = await AuthService.login(email, password);
    localStorage.setItem("access_token", response.access_token);
    localStorage.setItem("token_type", response.token_type);

    const data = await DoulaService.getMe();
    localStorage.setItem("doula_logada", JSON.stringify(data));
    setDoula(data);
  };

  const logout = () => {
    AuthService.logout();
    setDoula(null);
  };

  return (
    <AuthContext.Provider
      value={{
        doula,
        loading,
        error,
        login,
        logout,
        isAuthenticated: !!doula,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
