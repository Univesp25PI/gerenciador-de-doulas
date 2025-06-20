import { api } from '../api';
import mock1 from '../mocks/responses/get_all_gestantes_by_doula.json';
import mock2 from '../mocks/responses/get_gestante_by_id.json';
import mock3 from '../mocks/responses/post_gestante.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true";

export const GestanteService = {
  getAllByDoula: async () => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock1.data), 300)
      );
    }
    else {
      const response = await api.get('/gestante');
      return response.data.data;
    }
  },

  getById: async (id) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock2.data), 300)
      );
    }
    else {
      const response = await api.get(`/gestante/${id}`);
      return response.data.data;
    }
  },

  create: async (data) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock3.data), 300)
      );
    }
    else {
      const response = await api.post('/gestante', data);
      return response.data.data;
    }
  },
};
