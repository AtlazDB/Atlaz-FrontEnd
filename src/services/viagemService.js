import api from './api';

export const movimentacaoService = {
  async salvar(dados) {
    const response = await api.post('/movimentacoes', dados);
    return response.data;
  },

  async listar() {
    const response = await api.get('/movimentacoes');
    return response.data;
  },

  async buscarPorId(id) {
    const response = await api.get(`/movimentacoes/${id}`);
    return response.data;
  },

  async atualizar(id, dados) {
    const response = await api.put(`/movimentacoes/${id}`, dados);
    return response.data;
  },

  async deletar(id) {
    const response = await api.delete(`/movimentacoes/${id}`);
    return response.data;
  }
};