<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { refuelingService } from '@/services/refuelingService.js'
import { serviceOrderService } from '@/services/serviceOrderService.js'

const records = ref([])
const isLoading = ref(true)

const props = defineProps(['filter'])

const filteredRecords = computed(() => {
  if (!props.filter) return records.value

  return records.value.filter((record) => {
    const date = new Date(record.serviceOrder.departureDate)

    return (
      date.getMonth() === props.filter.month &&
      date.getFullYear() === props.filter.year
    )
  })
})

async function loadAll() {
  isLoading.value = true

  try {
    const [serviceOrders, refuelings] = await Promise.all([
      serviceOrderService.list(),
      refuelingService.list(),
    ])

    records.value = serviceOrders.map((serviceOrder) => {
      const refueling = refuelings.find(
        (refuelingItem) =>
          refuelingItem.serviceOrder?.id == serviceOrder.id,
      )

      return { serviceOrder, refueling }
    })
  } catch (error) {
    console.error('Erro: ' + error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => loadAll())

function formatHour(isoDate) {
  if (!isoDate) return '-'

  const [, hour] = isoDate.split('T')

  return hour.slice(0, 5) // pega só HH:mm
}

function formatDate(isoDate) {
  if (!isoDate) return '-'

  const [date] = isoDate.split('T')
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

function formatCurrency(value) {
  if (!value) return '-'

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

watch(
  () => props.filter,

  async (filter) => {
    if (!filter) {
      loadAll()
      return
    }

    isLoading.value = true

    try {
      const [serviceOrders, refuelings] = await Promise.all([
        serviceOrderService.listByMonth(
          filter.month + 1,
          filter.year,
        ),

        refuelingService.listByMonth(
          filter.month + 1,
          filter.year,
        ),
      ])

      records.value = serviceOrders.map((serviceOrder) => {
        const refueling = refuelings.find(
          (refuelingItem) =>
            refuelingItem.serviceOrder?.id === serviceOrder.id,
        )

        return { serviceOrder, refueling }
      })
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      isLoading.value = false
    }
  },
)
</script>

<template>
  <div class="table-container">
    <button
      v-if="filteredRecords.length > 0"
      @click="
        serviceOrderService.exportCsv(
          props.filter?.month,
          props.filter?.year,
        )
      "
    >
      Exportar tabela
    </button>

    <p v-if="isLoading">Carregando...</p>

    <table v-else-if="filteredRecords.length > 0">
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
        <tr
          v-for="record in filteredRecords"
          :key="record.serviceOrder.id"
        >
          <td>
            {{ record.serviceOrder.viatura.prefixo }}
            -
            {{ record.serviceOrder.viatura.modelo.nomeModelo }}
          </td>

          <td>
            {{ record.serviceOrder.tipoServico }}
          </td>

          <td>
            {{ record.serviceOrder.justificativa }}
          </td>

          <td>
            {{ record.serviceOrder.requisitante }}
          </td>

          <td>
            {{ record.serviceOrder.localDestino }}
          </td>

          <td>
            {{ record.serviceOrder.kmSaida }}
          </td>

          <td>
            {{ record.serviceOrder.kmChegada }}
          </td>

          <td>
            {{ formatHour(record.serviceOrder.dataSaida) }}
          </td>

          <td>
            {{ formatHour(record.serviceOrder.dataRetorno) }}
          </td>

          <td>
            {{ formatDate(record.serviceOrder.dataSaida) }}
          </td>

          <td>
            {{ formatDate(record.serviceOrder.dataRetorno) }}
          </td>

          <!-- Abastecimento pode ser vazio -->
          <td>
            {{ record.refueling?.litros ?? '-' }}
          </td>

          <td>
            {{
              record.refueling
                ? formatCurrency(record.refueling.valorTotal)
                : '-'
            }}
          </td>

          <td>
            {{ record.refueling?.numeroNotaFiscal ?? '-' }}
          </td>
        </tr>
      </tbody>
    </table>

    <p class="info" v-else>
      Sem informação
    </p>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.table-container {
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
