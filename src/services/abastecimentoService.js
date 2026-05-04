import api from './api.js'

export const abastecimentoService = {

  criar: (dados) => api.post('/refuelings', dados),

  listar: () => api.get('/refuelings').then(dados => dados.data),
  listarPorMes: (mes, ano) => api.get('/refuelings/por-mes', { params: { mes, ano } }).then(r => r.data)
}
