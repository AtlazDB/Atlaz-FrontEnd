import api from './api';

export const vehicleService = {

  async list() {
    const response = await api.get('/vehicles');
    return response.data;
  },
  
  async findById(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data;
  },

  async create(vehicle) {
    const response = await api.post('/vehicles', vehicle);
    return response.data;
  },

  async update(id, vehicle) {
    const response = await api.put(`/vehicles/${id}`, vehicle);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  }
};