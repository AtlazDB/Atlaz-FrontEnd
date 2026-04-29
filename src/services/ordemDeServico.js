import api from './api';

export const workOrderService = {
  async save(data) {
    const response = await api.post('/work-orders', data);
    return response.data;
  },

  async list() {
    const response = await api.get('/work-orders');
    return response.data;
  },

  async findById(id) {
    const response = await api.get(`/work-orders/${id}`);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/work-orders/${id}`, data);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/work-orders/${id}`);
    return response.data;
  },

  async listTypes() {
    const response = await api.get('/work-orders/occurrence-types');
    return response.data;
  },

  listByMonth: (month, year) =>
    api
      .get('/work-orders/by-month', { params: { month, year } })
      .then(r => r.data),

  exportCsv: async (month, year) => {
    const params =
      month != null ? `?month=${month + 1}&year=${year}` : ''

    const monthName =
      month != null
        ? `_${year}_${String(month + 1).padStart(2, '0')}`
        : ''

    const response = await api.get(`/work-orders/csv${params}`, {
      responseType: 'blob'
    })

    const url = URL.createObjectURL(response.data)

    const link = document.createElement('a')
    link.href = url
    link.download = `records${monthName}.csv`
    link.click()

    URL.revokeObjectURL(url)
  }
};