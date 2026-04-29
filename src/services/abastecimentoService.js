import api from './api.js'

export const fuelingService = {

  create: (data) => api.post('/fuelings', data),

  list: () => api.get('/fuelings').then(data => data.data),

  listByMonth: (month, year) =>
    api
      .get('/fuelings/by-month', { params: { month, year } })
      .then(r => r.data)
}