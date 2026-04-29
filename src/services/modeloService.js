import api from './api';

export const modelService = {
  async list() {
    const response = await api.get('/models');
    return response.data;
  },

  async findById(id) {
    const response = await api.get(`/models/${id}`);
    return response.data;
  },

  async create(model) {
    const response = await api.post('/models', model);
    return response.data;
  },

  async update(id, model) {
    const response = await api.put(`/models/${id}`, model);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/models/${id}`);
    return response.data;
  }
};