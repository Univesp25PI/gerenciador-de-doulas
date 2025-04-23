import { api } from '../api';
import mock from '../mocks/responses/get_doula_by_id.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true";

export const DoulaService = {
  getById: async (id) => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(mock.data), 300)
      );
    }
    const response = await api.get(`/doula/${id}`);
    return response.data;
  },
};
