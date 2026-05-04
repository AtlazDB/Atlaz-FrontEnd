import api from './api';

export const viaturaService = {

  async listar() {
    const response = await api.get('/vehicles');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  async criar(viatura) {
    const response = await api.post('/vehicles', viatura);
    return response.data;
  },

  async atualizar(id, viatura) {
    const response = await api.put(`/vehicles/${id}`, viatura);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
};
