import api from './api.js'

export const refuelingService = {

  create: (data) => api.post('/refuelings', data),

  list: () => api.get('/refuelings').then(dados => dados.data),
  listByMonth: (month, year) => api.get('/refuelings/by-month', { params: { mes: month, ano: year } }).then(r => r.data)
}
