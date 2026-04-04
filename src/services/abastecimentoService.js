import api from './api.js'

export const abastecimentoService = {

  criar: (dados) => api.post('/abastecimentos', dados),

  listar: () => api.get('/abastecimentos').then(dados => dados.data),
  listarPorMes: (mes, ano) => api.get('/abastecimentos/por-mes', { params: { mes, ano } }).then(r => r.data)
}
