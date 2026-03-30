<script setup>
import { ref, onMounted } from 'vue'
const data = ref("janeiro_2025")
const corpo_tabela = ref([
  { id: 1, viatura: 'City', ocorrencia: 'Nenhuma' },
  { id: 2, viatura: 'Onix', ocorrencia: 'Alguma' },
  { id: 3, viatura: 'Kwid', ocorrencia: 'Sem nada' },
  { id: 4, viatura: 'Porche', ocorrencia: '' },
  { id: 5, viatura: 'Picape', ocorrencia: 'Vazio' },
])
/* Para quando tiver o metodo http
onMounted(async () => {
  try {
    //Colocar o link para requisição
    const response = await fetch('')
    corpo_tabela.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
 */
function mudarTabela() {
  data.value =
}
</script>

<template>
  <div class="tabela">
    <button>Exportar tabela</button>
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
        <td>{{ linha.justificativa }}</td>
        <td>{{ linha.requisitante }}</td>
        <td>{{ linha.destino }}</td>

        <td>{{ linha.km_saida }}</td>
        <td>{{ linha.km_chegada }}</td>
        <td>{{ linha.hr_saida }}</td>
        <td>{{ linha.hr_chegada }}</td>
        <td>{{ linha.data_saida }}</td>
        <td>{{ linha.data_chegada }}</td>

        <td>{{ linha.litros }}</td>
        <td>{{ linha.valor }}</td>
        <td>{{ linha.nota_fiscal }}</td>
        <!-- ... -->
      </tr>
    </table>
  </div>
</template>

<style scoped>
button {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: none;
  background-color: #003366;
  color: #ffffff;
}
table {
  border-collapse: collapse;
}
td,
th {
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  font-size: 12px;
  padding-right: 3px;
  padding-left: 3px;
}
td {
  padding-top: 5px;
  padding-bottom: 5px;
}
tr:hover td {
  background-color: #7aa6cc;
  transition: 0.1s;
}
</style>
