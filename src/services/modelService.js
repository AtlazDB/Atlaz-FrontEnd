import api from './api';

export const modelService = {
  async listar() {
    const response = await api.get('/models');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/models/${id}`);
    return response.data;
  },

  async criar(modelo) {
    const response = await api.post('/models', modelo);
    return response.data;
  },

  async atualizar(id, modelo) {
    const response = await api.put(`/models/${id}`, modelo);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/models/${id}`);
    return response.data;
  }
};
