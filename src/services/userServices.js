import api from './api';

export const userService = {
  async list() {
    const response = await api.get('/users');
    return response.data;
  },

  async searchById(id) {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async create(user) {
    const response = await api.post('/users', user);
    return response.data;
  },

  async atualizar(id, user) {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/users${id}`);
    return response.data;
  }
};
