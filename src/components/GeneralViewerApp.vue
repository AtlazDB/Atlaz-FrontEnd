<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { abastecimentoService } from '@/services/abastecimentoService.js'
import { ordemDeServicoService } from '@/services/ordemDeServico.js'

const registros = ref([])
const carregando = ref(true)
const props = defineProps(['filtro'])
const registrosFiltrados = computed(() => {
  if (!props.filtro) return registros.value
  return registros.value.filter((reg) => {
    const dataISO = reg.tipo === 'os' ? reg.os?.departureDate : reg.refueling?.dateTime
    if (!dataISO) return false
    const data = new Date(dataISO)
    return data.getMonth() === props.filtro.mes && data.getFullYear() === props.filtro.ano
  })
})

async function carregarTodos() {
  carregando.value = true
  try {
    const [ordens, abastecimentos] = await Promise.all([
      ordemDeServicoService.listar(),
      abastecimentoService.listar(),
    ])

    // linhas com OS
    const linhasOS = ordens.map((os) => {
      const refueling = abastecimentos.find((a) => a.serviceOrder?.id === os.id)
      return { os, refueling, tipo: 'os' }
    })

    // abastecimentos sem OS vinculada
    const linhasAbastecimento = abastecimentos
      .filter((a) => !a.serviceOrder)
      .map((a) => ({ os: null, refueling: a, tipo: 'abastecimento' }))

    registros.value = [...linhasOS, ...linhasAbastecimento]
  } catch (erro) {
    console.error('Erro: ' + erro)
  } finally {
    carregando.value = false
  }
}

onMounted(() => carregarTodos())

function formatarHora(dataISO) {
  if (!dataISO) return '-'
  const [, hora] = dataISO.split('T')
  return hora.slice(0, 5) // pega só HH:mm
}
function formatarData(dataISO) {
  if (!dataISO) return '-'
  const [data] = dataISO.split('T')
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarValor(valor) {
  if (!valor) return '-'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

watch(
  () => props.filtro,
  async (filtro) => {
    if (!filtro) {
      carregarTodos()
      return
    }
    carregando.value = true
    try {
      const [ordens, abastecimentos] = await Promise.all([
        ordemDeServicoService.listarPorMes(filtro.mes + 1, filtro.ano),
        abastecimentoService.listarPorMes(filtro.mes + 1, filtro.ano),
      ])

      registros.value = ordens.map((os) => {
        const abastecimento = abastecimentos.find((a) => a.serviceOrder?.id === os.id)
        return { os, abastecimento }
      })
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      carregando.value = false
    }
  },
)
</script>

<template>
  <div class="tabela">
    <button
      v-if="registrosFiltrados.length > 0"
      @click="ordemDeServicoService.exportarCsv(props.filtro?.mes, props.filtro?.ano)"
    >
      Exportar tabela
    </button>

    <p v-if="carregando">Carregando...</p>

    <table v-else-if="registrosFiltrados.length > 0">
      <thead>
        <tr>
          <th>Viatura</th>
          <th>Ocorrência</th>
          <th>Justificativa</th>
          <th>Requisitante</th>
          <th>Destino</th>
          <th>KM de saída</th>
          <th>KM de chegada</th>
          <th>Horário saída</th>
          <th>Horário chegada</th>
          <th>Data saída</th>
          <th>Data chegada</th>
          <!-- Abastecimento -->
          <th>Litros</th>
          <th>Valor</th>
          <th>Nota fiscal</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(reg, i) in registrosFiltrados" :key="i">
          <td>{{ reg.tipo === 'os' ? `${reg.os.vehicle.prefix} - ${reg.os.vehicle.model.modelName}` : reg.refueling?.vehicle?.prefix }}</td>
          <td>{{ reg.tipo === 'os' ? reg.os.serviceType : 'Abastecimento' }}</td>
          <td>{{ reg.os?.justification ?? '-' }}</td>
          <td>{{ reg.os?.requester ?? '-' }}</td>
          <td>{{ reg.os?.destinationLocation ?? '-' }}</td>
          <td>{{ reg.os?.departureKm ?? '-' }}</td>
          <td>{{ reg.os?.arrivalKm ?? '-' }}</td>
          <td>{{ reg.tipo === 'os' ? formatarHora(reg.os.departureDate) : formatarHora(reg.refueling?.dateTime) }}</td>
          <td>{{ formatarHora(reg.os?.returnDate) }}</td>
          <td>{{ reg.tipo === 'os' ? formatarData(reg.os.departureDate) : formatarData(reg.refueling?.dateTime) }}</td>
          <td>{{ formatarData(reg.os?.returnDate) }}</td>
          <td>{{ reg.refueling?.liters ?? '-' }}</td>
          <td>{{ reg.refueling ? formatarValor(reg.refueling.totalValue) : '-' }}</td>
          <td>{{ reg.refueling?.receiptNumber ?? '-' }}</td>
        </tr>
      </tbody>
    </table>

    <p class="info" v-else>Sem informação</p>
  </div>
</template>
<!--    <button v-if="corpo_tabela.length > 0" v-on:click="exportarTabela">Exportar tabela</button>-->
<!--    <table v-if="corpo_tabela.length > 0">-->
<!--      <thead>-->
<!--        <tr>-->

<!--        <tr v-for="linha in corpo_tabela" :key="linha.id">-->
<!--          <td>{{ linha.viatura }}</td>-->

<!--          <td>{{ linha.ocorrencia }}</td>-->
<!--          <td>{{ linha.justificativa }}</td>-->
<!--          <td>{{ linha.requisitante }}</td>-->
<!--          <td>{{ linha.destino }}</td>-->

<!--          <td>{{ linha.km_saida }}</td>-->
<!--          <td>{{ linha.km_chegada }}</td>-->
<!--          <td>{{ linha.hr_saida }}</td>-->
<!--          <td>{{ linha.hr_chegada }}</td>-->
<!--          <td>{{ linha.data_saida }}</td>-->
<!--          <td>{{ linha.data_chegada }}</td>-->

<!--          <td>{{ linha.litros }}</td>-->
<!--          <td>{{ linha.valor }}</td>-->
<!--          <td>{{ linha.nota_fiscal }}</td>-->
<!--          &lt;!&ndash; ... &ndash;&gt;-->
<!--        </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--    <p class="info" v-else>Sem informação</p>-->
<!--  </div>-->
<!--</template>-->

<style scoped>
@import '@/assets/style.css';

.tabela {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;
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
  margin-top: 20px;
  border-collapse: collapse;
  max-width: 100%;
  table-layout: fixed;
}
td,
th {
  border: 1px solid #ddd;
  font-size: 11px;
  padding-right: 2px;
  padding-left: 2px;
}
th:nth-child(6),
th:nth-child(7) {
  max-width: 55px;
}
td {
  padding-top: 5px;
  padding-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  text-align: center;
}
tbody tr:hover td {
  background-color: #7aa6cc;
  transition: 0.1s;
}
</style>
