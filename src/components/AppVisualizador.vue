<script setup>
import { ref, watch } from 'vue'

const { tabela } = defineProps(['tabela'])
const corpo_tabela = ref([])
const nome_tabela = ref(null)

function mudarTabela(valor) {
  if (valor === 'Janeiro2025') {
    corpo_tabela.value = [
      { id: 1, viatura: 'City', ocorrencia: 'Nenhuma' },
      { id: 2, viatura: 'Onix', ocorrencia: 'Alguma' },
    ]
  } else if (valor === 'Fevereiro2025') {
    corpo_tabela.value = [
      { id: 3, viatura: 'Kwid', ocorrencia: 'Sem nada' },
      { id: 4, viatura: 'Porche', ocorrencia: '' },
    ]
  } else if (valor === 'Março2025') {
    corpo_tabela.value = [{ id: 5, viatura: 'Picape', ocorrencia: 'Vazio' }]
  } else {
    corpo_tabela.value = []
  }
}
watch(
  () => tabela,
  (novoValor) => {
    mudarTabela(novoValor)
    nome_tabela.value = novoValor
  },
  { immediate: true },
)
/*
function exportarTabela() {
  let csv = "id,viatura,ocorrencia"
  for (const linha in corpo_tabela.value) {
    console.log(corpo_tabela[linha[linha]])
    const id_str = toString(corpo_tabela[linha.id])
    csv = csv + "\n" + id_str + corpo_tabela[linha.viatura] + corpo_tabela[linha.ocorrencia]
  }

  const blob = new Blob([csv], { type: 'text/csv' })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = nome_tabela.value + '.csv'

  link.click()
}
*/
/* Para quando tiver o metodo http
onMounted(async () => {
  try {
    //Colocar o link para requisição
    const response = await fetch('http/')
    corpo_tabela.value = await response.json()
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
})
 */
</script>

<template>
  <div class="tabela">
    <h1 class="titulo">Tabela</h1>
    <button v-if="corpo_tabela.length > 0" v-on:click="exportarTabela">Exportar tabela</button>
    <table v-if="corpo_tabela.length > 0">
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
    <p class="info" v-else>Sem informação</p>
  </div>
</template>

<style scoped>
.titulo {
  font-size: 30px;
  border-left: 5px #003366 solid;
  padding-left: 5px;
}
.tabela {
  display: flex;
  flex-direction: column;
  width: 821px;
}
.info {
  align-self: center;
}
button {
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: none;
  background-color: #003366;
  color: #ffffff;
  width: fit-content;
  cursor: pointer;
}
table {
  border-collapse: collapse;
}
td,
th {
  border: 1px solid #ddd;
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
