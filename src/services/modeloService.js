import api from './api';

export const modeloService = {
  async listar() {
    const response = await api.get('/modelos');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/modelos/${id}`);
    return response.data;
  },

  async criar(modelo) {
    const response = await api.post('/modelos', modelo);
    return response.data;
  },

  async atualizar(id, modelo) {
    const response = await api.put(`/modelos/${id}`, modelo);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/modelos/${id}`);
    return response.data;
  }
};