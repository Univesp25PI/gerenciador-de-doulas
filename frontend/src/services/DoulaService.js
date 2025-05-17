import { api } from "../api";
import mockById from "../mocks/responses/get_doula_by_id.json";

const useMock = process.env.REACT_APP_USE_MOCK === "true";

export const DoulaService = {
  getById: async (id) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mockById.data), 300)
      );
    }
    const response = await api.get(`/doula/${id}`);
    return response.data;
  },

  getAll: async () => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve([]), 300)
      );
    }
    const response = await api.get("/doula");
    return response.data.data;
  },
};

