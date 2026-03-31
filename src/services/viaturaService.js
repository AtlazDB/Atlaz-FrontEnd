import api from './api';

export const viaturaService = {

  async listar() {
    const response = await api.get('/viaturas');
    return response.data;
  },
  
  async buscarPorId(id) {
    const response = await api.get(`/viaturas/${id}`);
    return response.data;
  },

  async criar(viatura) {
    const response = await api.post('/viaturas', viatura);
    return response.data;
  },

  async atualizar(id, viatura) {
    const response = await api.put(`/viaturas/${id}`, viatura);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/viaturas/${id}`);
    return response.data;
  }
};