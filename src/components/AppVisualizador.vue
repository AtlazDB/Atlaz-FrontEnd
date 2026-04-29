<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { fuelingService } from '@/services/fuelingService.js'
import { workOrderService } from '@/services/workOrder.js'

const records = ref([])
const loading = ref(true)

const props = defineProps(['filter'])

const filteredRecords = computed(() => {
  if (!props.filter) return records.value

  return records.value.filter((record) => {
    const date = new Date(record.wo.departureDate)

    return (
      date.getMonth() === props.filter.month &&
      date.getFullYear() === props.filter.year
    )
  })
})

async function loadAll() {
  loading.value = true

  try {
    const [workOrders, fuelings] = await Promise.all([
      workOrderService.list(),
      fuelingService.list(),
    ])

    records.value = workOrders.map((wo) => {
      const fueling = fuelings.find((f) => f.workOrder?.id == wo.id)
      return { wo, fueling }
    })
  } catch (error) {
    console.error('Error: ' + error)
  } finally {
    loading.value = false
  }
}

onMounted(() => loadAll())

function formatTime(isoDate) {
  if (!isoDate) return '-'

  const [, time] = isoDate.split('T')
  return time.slice(0, 5) // gets only HH:mm
}

function formatDate(isoDate) {
  if (!isoDate) return '-'

  const [date] = isoDate.split('T')
  const [year, month, day] = date.split('-')

  return `${day}/${month}/${year}`
}

function formatValue(value) {
  if (!value) return '-'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

watch(
  () => props.filter,
  async (filter) => {
    if (!filter) {
      loadAll()
      return
    }

    loading.value = true

    try {
      const [workOrders, fuelings] = await Promise.all([
        workOrderService.listByMonth(filter.month + 1, filter.year),
        fuelingService.listByMonth(filter.month + 1, filter.year),
      ])

      records.value = workOrders.map((wo) => {
        const fueling = fuelings.find((f) => f.workOrder?.id === wo.id)
        return { wo, fueling }
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      loading.value = false
    }
  },
)
</script>

<template>
  <div class="table_container">
    <button
      v-if="filteredRecords.length > 0"
      @click="workOrderService.exportCsv(props.filter?.month, props.filter?.year)"
    >
      Export table
    </button>

    <p v-if="loading">Loading...</p>

    <table v-else-if="filteredRecords.length > 0">
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>Occurrence</th>
          <th>Justification</th>
          <th>Requester</th>
          <th>Destination</th>
          <th>Departure KM</th>
          <th>Arrival KM</th>
          <th>Departure Time</th>
          <th>Arrival Time</th>
          <th>Departure Date</th>
          <th>Arrival Date</th>

          <!-- Fueling -->
          <th>Liters</th>
          <th>Value</th>
          <th>Invoice</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="record in filteredRecords" :key="record.wo.id">
          <td>{{ record.wo.vehicle.prefix }} - {{ record.wo.vehicle.model.modelName }}</td>
          <td>{{ record.wo.serviceType }}</td>
          <td>{{ record.wo.justification }}</td>
          <td>{{ record.wo.requester }}</td>
          <td>{{ record.wo.destinationLocation }}</td>
          <td>{{ record.wo.departureKm }}</td>
          <td>{{ record.wo.arrivalKm }}</td>
          <td>{{ formatTime(record.wo.departureDate) }}</td>
          <td>{{ formatTime(record.wo.returnDate) }}</td>
          <td>{{ formatDate(record.wo.departureDate) }}</td>
          <td>{{ formatDate(record.wo.returnDate) }}</td>

          <!-- Fueling may be empty -->
          <td>{{ record.fueling?.liters ?? '-' }}</td>
          <td>{{ record.fueling ? formatValue(record.fueling.totalValue) : '-' }}</td>
          <td>{{ record.fueling?.invoiceNumber ?? '-' }}</td>
        </tr>
      </tbody>
    </table>

    <p class="info" v-else>No information</p>
  </div>
</template>

<!--
<button v-if="table_body.length > 0" v-on:click="exportTable">Export table</button>
<table v-if="table_body.length > 0">
  <thead>
    <tr>

    <tr v-for="row in table_body" :key="row.id">
      <td>{{ row.vehicle }}</td>

      <td>{{ row.occurrence }}</td>
      <td>{{ row.justification }}</td>
      <td>{{ row.requester }}</td>
      <td>{{ row.destination }}</td>

      <td>{{ row.departure_km }}</td>
      <td>{{ row.arrival_km }}</td>
      <td>{{ row.departure_hr }}</td>
      <td>{{ row.arrival_hr }}</td>
      <td>{{ row.departure_date }}</td>
      <td>{{ row.arrival_date }}</td>

      <td>{{ row.liters }}</td>
      <td>{{ row.value }}</td>
      <td>{{ row.invoice }}</td>
    </tr>
  </tbody>
</table>

<p class="info" v-else>No information</p>
</div>
</template>
-->

<style scoped>
@import '@/assets/style.css';

.table_container {
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