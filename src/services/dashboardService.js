// src/services/dashboardService.js
import api from './api';

export const dashboardService = {
  async getResumoReal() {
    return await api.get('/dashboard');
  }
};
