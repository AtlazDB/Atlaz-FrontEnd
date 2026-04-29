import api from './api';

export const cityService = {
  async list() {
    const response = await api.get('/cities');
    return response.data;
  },

  async findById(id) {
    const response = await api.get(`/cities/${id}`);
    return response.data;
  },

  async create(city) {
    const response = await api.post('/cities', city);
    return response.data;
  },

  async update(id, city) {
    const response = await api.put(`/cities/${id}`, city);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/cities/${id}`);
    return response.data;
  }
};