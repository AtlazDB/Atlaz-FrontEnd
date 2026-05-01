import api from './api';

export const vehicleService = {

  async list() {
    const response = await api.get('/vehicles');
    return response.data;
  },

  async searchById(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  async create(vehicles) {
    const response = await api.post('/vehicles', vehicles);
    return response.data;
  },

  async update(id, vehicles) {
    const response = await api.put(`/vehicles/${id}`, vehicles);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
};
