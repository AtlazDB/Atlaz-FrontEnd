<script setup>
import { ref, onMounted } from 'vue'

const corpo_tabela = ref([
  { id: 1, viatura: 'City', ocorrencia: 'Nenhuma' },
  { id: 2, viatura: 'Onix', ocorrencia: 'Alguma' },
  { id: 3, viatura: 'Kwid', ocorrencia: 'Sem nada' },
  { id: 4, viatura: 'Porche', ocorrencia: '' },
  { id: 5, viatura: 'Picape', ocorrencia: 'Vazio' },
])

onMounted(async () => {
  try {
    //Colocar o link para requisição
    const response = await fetch('')
    corpo_tabela.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
</script>
<template>
  <table>
    <tr>
      <!-- Veículo -->
      <th>Viatura</th>
      <!-- Motivo -->
      <th>Ocorrência</th>
      <th>Justificativa</th>
      <th>Requisitante</th>
      <th>Destino</th>
      <!-- Medição -->
      <th>quilometragem saída</th>
      <th>Quilometragem chegada</th>
      <th>Horário saída</th>
      <th>Horário chegada</th>
      <th>Data saída</th>
      <th>Data chegada</th>
      <!-- Abastecimento -->
      <th>Litros</th>
      <th>Valor</th>
      <th>Nota fiscal</th>
    </tr>
    <tr v-for="linha in corpo_tabela" :key="linha.id">
      <td>{{ linha.viatura }}</td>
      <td>{{ linha.ocorrencia }}</td>
      <!-- ... -->
    </tr>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
td, th {
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
</style>
