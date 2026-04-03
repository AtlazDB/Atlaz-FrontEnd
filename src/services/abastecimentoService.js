import api from './api.js'

export const abastecimentoService = {
  async criar (dados) {
    return api.post('/abastecimentos', dados);
  }
}
