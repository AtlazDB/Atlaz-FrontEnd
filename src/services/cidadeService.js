import api from './api';

export const cidadeService = {
  async listar() {
    const response = await api.get('/cidades');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/cidades/${id}`);
    return response.data;
  },

  async criar(cidade) {
    const response = await api.post('/cidades', cidade);
    return response.data;
  },

  async atualizar(id, cidade) {
    const response = await api.put(`/cidades/${id}`, cidade);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/cidades/${id}`);
    return response.data;
  }
};