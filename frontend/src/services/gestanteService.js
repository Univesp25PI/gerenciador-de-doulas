import { api } from '../api';
import mock1 from '../mocks/responses/get_all_gestantes_by_doula.json';
import mock2 from '../mocks/responses/get_gestante_by_id.json';
import mock3 from '../mocks/responses/post_gestante.json';

const useMock = process.env.REACT_APP_USE_MOCK === "true";

const getMockGestantes = () => {
  const stored = localStorage.getItem('mockGestantes');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('mockGestantes', JSON.stringify(mock1.data));
  return mock1.data;
};

const setMockGestantes = (data) => {
  localStorage.setItem('mockGestantes', JSON.stringify(data));
};

export const GestanteService = {
  getAllByDoula: async () => {
    if (useMock) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(getMockGestantes()), 300)
      );
    }
    else {
      const response = await api.get('/gestante');
      return response.data.data;
    }
  },

  getById: async (id) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const gestantes = getMockGestantes();
          const gestante = gestantes.find(g => String(g.id) === String(id));
          resolve(gestante || mock2.data);
        }, 300);
      });
    }
    else {
      const response = await api.get(`/gestante/${id}`);
      return response.data.data;
    }
  },

  create: async (data) => {
    if (useMock) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const gestantes = getMockGestantes();
          const newGestante = {
            id: Math.floor(Math.random() * 10000),
            id_doula: 1,
            nome: data.nome,
            idade: data.idade,
            primeira_gestacao: data.primeira_gestacao,
            ultima_menstruacao: data.ultima_menstruacao,
            semana_gestacional: data.semana_gestacional,
            previsao_parto: data.previsao_parto,
            comorbidades: data.comorbidades,
            create_date: new Date().toISOString(),
            update_date: new Date().toISOString()
          };
          gestantes.push(newGestante);
          setMockGestantes(gestantes);
          resolve(newGestante);
        }, 300);
      });
    }
    else {
      const response = await api.post('/gestante', data);
      return response.data.data;
    }
  },
};

