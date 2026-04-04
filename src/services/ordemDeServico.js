import api from './api';

export const ordemDeServicoService = {
  async salvar(dados) {
    const response = await api.post('/ordens-servico', dados);
    return response.data;
  },

  async listar() {
    const response = await api.get('/ordens-servico');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/ordens-servico/${id}`);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/ordens-servico/${id}`, dados);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/ordens-servico/${id}`);
    return response.data;
  },
  async listaTipos() {
    const response = await api.get('/ordens-servico/tipos-ocorrencia');
    return response.data;
  },

  listarPorMes: (mes, ano) => api.get('/ordens-servico/por-mes', { params: { mes, ano } }).then(r => r.data),

  exportarCsv: async (mes, ano) => {
    const params = mes != null ? `?mes=${mes + 1}&ano=${ano}` : ''
    const nomeMes = mes != null ? `_${ano}_${String(mes + 1).padStart(2, '0')}` : ''
    const response = await api.get(`/ordens-servico/csv${params}`, { responseType: 'blob' })

    const url = URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = url
    link.download = `registros${nomeMes}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }
};
