import { api } from '../api';
import mock1 from '../mocks/responses/get_all_aula_by_doula.json';
import mock3 from '../mocks/responses/get_aula_by_id.json';
import mock4 from '../mocks/responses/post_aula.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true";

export const AulaService = {
  getAll: async () => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock1.data), 300)
      );
    }
    const response = await api.get('/lesson');
    return response.data.data;
  },

  getById: async (id) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock3.data), 300)
      );
    }
    const response = await api.get(`/lesson/${id}`);
    return response.data;
  },

  create: async (data) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock4.data), 300)
      );
    }
    const response = await api.post('/lesson', data);
    return response.data;
  },
};
