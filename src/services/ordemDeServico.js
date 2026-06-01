import api from './api';

const fmt = (d) => new Date(d).toISOString().split('T')[0]

export const ordemDeServicoService = {
  async salvar(dados) {
    const response = await api.post('/service-orders', dados);
    return response.data;
  },

  async listar() {
    const response = await api.get('/service-orders');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/service-orders/${id}`);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/service-orders/${id}`, dados);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/service-orders/${id}`);
    return response.data;
  },

  async listaTipos() {
    const response = await api.get('/service-orders/occurrence-types');
    return response.data;
  },

  listarPorMes: (mes, ano) =>
    api.get('/service-orders/by-month', { params: { mes, ano } }).then((r) => r.data),

  async exportarCsv(filtro, categoria) {
    const params = new URLSearchParams()

    if (filtro?.dataInicio && filtro?.dataFim) {
      params.set('dataInicio', fmt(filtro.dataInicio))
      params.set('dataFim', fmt(filtro.dataFim))
    } else if (filtro?.mes != null) {
      params.set('month', filtro.mes + 1)
      params.set('year', filtro.ano)
    }

    if (categoria && categoria !== 'all') {
      params.set('categoria', categoria)
    }

    const response = await api.get(`/service-orders/csv?${params}`, {
      responseType: 'blob',
    })

    const url = URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.download = 'records.csv'
    link.click()
    URL.revokeObjectURL(url)
  },

  async countByInterval(dataInicio, dataFim) {
    const params = new URLSearchParams({ dataInicio, dataFim })
    const response = await api.get(`/service-orders/count-by-interval?${params}`)
    return response.data
  },
}
