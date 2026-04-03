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
  }
};
