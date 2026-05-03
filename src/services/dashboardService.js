// src/services/dashboardService.js
import api from './api';

export const dashboardService = {
  async getResumoMock() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            metrics: {
              viaturaAtivas: 24,
              viaturasTotal: 32,
              tecnicosEmCampo: 18,
              consumoMedio: 9.2
            },
            ativadadesHoje: [
              {
                id: 1045,
                tipo: "DESLOCAMENTO",
                prefixoViatura: "L-746",
                nomeTecnico: "William Hasan",
                descricao: "Jacareí → S. José dos Campos",
                Status: "CONCLUÍDO",
                corStatus: "EMERALD"
              },
              {
                id: 1046,
                tipo: "ABASTECIMENTO",
                prefixoViatura: "L-802",
                nomeTecnico: "Ricardo Oliveira",
                descricao: "Abastecimento: R$ 250,00",
                status: "EM ANDAMENTO",
                corStatus: "AMBER"
              }
            ]
          }
        });
      }, 800); // 800ms
    });
  },

  async getResumoReal() {
    return await api.get('/dashboard');
  }
};
