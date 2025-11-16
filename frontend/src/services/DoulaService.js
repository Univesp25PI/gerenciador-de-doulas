import { api } from "../api";
import mockById from "../mocks/responses/get_doula_by_id.json";

const useMock = process.env.REACT_APP_USE_MOCK === "false";

export const DoulaService = {
  create: async (dados) => {
    if (!useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ id: 1, ...dados }), 300)
      );
    }
    const response = await api.post("/doulas", dados);
    return response.data.data;
  },

  getById: async (id) => {
    if (!useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockById.data), 300)
      );
    }
    const response = await api.get(`/doulas/${id}`);
    return response.data.data;
  },

  getAll: async () => {
    if (!useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve([]), 300)
      );
    }
    const response = await api.get("/doulas");
    return response.data.data;
  },

    // ✨ NOVO: Busca dados da doula logada
  getMe: async () => {
    if (!useMock) {
      // Mock local — apenas para testes
      return new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              id: 1,
              name: "Maria Silva",
              email: "maria@example.com",
              phone: "11999999999",
            }),
          300
        )
      );
    }

    // 🔹 Requisição real à API
    const response = await api.get("/auth/me");
    return response.data.data;
  }
};