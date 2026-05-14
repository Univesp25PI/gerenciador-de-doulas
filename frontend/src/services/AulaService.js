import { api } from '../api';
import mock1 from '../mocks/responses/get_all_aula_by_doula.json';
import mock2 from '../mocks/responses/get_all_aula_by_gestante.json';
import mock3 from '../mocks/responses/get_aula_by_id.json';
import mock4 from '../mocks/responses/post_aula.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true";

const getMockAulas = () => {
  const stored = localStorage.getItem('mockAulas');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('mockAulas', JSON.stringify(mock1.data));
  return mock1.data;
};

const setMockAulas = (data) => {
  localStorage.setItem('mockAulas', JSON.stringify(data));
};

export const AulaService = {
  getAllByDoula: async () => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(getMockAulas()), 300)
      );
    }
    const response = await api.get('/aula');
    return response.data.data;
  },

  getAllByGestante: async (gestanteId) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const aulas = getMockAulas();
          const filtered = aulas.filter(a => String(a.id_gestante) === String(gestanteId));
          resolve(filtered.length > 0 ? filtered : mock2.data);
        }, 300);
      });
    }
    const response = await api.get(`/aulas/gestante/${gestanteId}`);
    return response.data.data;
  },

  getById: async (id) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const aulas = getMockAulas();
          const aula = aulas.find(a => String(a.id) === String(id));
          resolve(aula || mock3.data);
        }, 300);
      });
    }
    const response = await api.get(`/aula/${id}`);
    return response.data;
  },

  create: async (data) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const aulas = getMockAulas();
          const newAula = {
            id: Math.floor(Math.random() * 10000),
            id_gestante: data.id_gestante,
            numero_aula: data.numero_aula || aulas.length + 1,
            tipo_aula: data.tipo_aula,
            data_aula: data.data_aula,
            local_aula: data.local_aula,
            observacoes: data.observacoes,
            create_date: new Date().toISOString(),
            update_date: new Date().toISOString()
          };
          aulas.push(newAula);
          setMockAulas(aulas);
          resolve(newAula);
        }, 300);
      });
    }
    const response = await api.post('/aula', data);
    return response.data;
  },
};

