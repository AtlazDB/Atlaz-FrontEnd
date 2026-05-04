import api from './api';

export const usuarioService = {
  async listar() {
    const response = await api.get('/users');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async criar(usuario) {
    const response = await api.post('/users', usuario);
    return response.data;
  },

  async atualizar(id, usuario) {
    const response = await api.put(`/users/${id}`, usuario);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};
