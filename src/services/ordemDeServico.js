import api from './api';

export const ordemDeServicoService = {
  async salvar(dados) {
    const response = await api.post('/service-orders', dados);
    return response.data;
  },

  async list() {
    const response = await api.get('/service-orders');
    return response.data;
  },

  async searchById(id) {
    const response = await api.get(`/service-orders/${id}`);
    return response.data;
  },

  async update(id, dados) {
    const response = await api.put(`/service-orders/${id}`, dados);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/service-orders/${id}`);
    return response.data;
  },
  async listTypes() {
    const response = await api.get('/service-orders/tipos-ocorrencia');
    return response.data;
  },

  listByMonth: (month, year) => api.get('/service-orders/by-month', { params: { month: month, year: year } }).then(r => r.data),

  exportCsv: async (month, year) => {
    const params = month != null ? `?mes=${month + 1}&ano=${year}` : ''
    const monthName = month != null ? `_${year}_${String(month + 1).padStart(2, '0')}` : ''
    const response = await api.get(`/service-orders/csv${params}`, { responseType: 'blob' })

    const url = URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = url
    link.download = `registros${monthName}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }
};
