<script setup>
import { ref, onMounted } from 'vue'
import { ordemDeServicoService } from '@/services/serviceOrder.js'

const emit = defineEmits(['date_selected'])

const selected = ref(null)
const isMinimized = ref(true)
const selectorItems = ref([])

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

onMounted(async () => {
  try {
    const serviceOrders = await ordemDeServicoService.list()

    const seen = new Set()
    const items = []

    serviceOrders.forEach((serviceOrder) => {
      const date = new Date(serviceOrder.dataSaida)

      const month = date.getMonth()
      const year = date.getFullYear()

      const key = `${month}-${year}`

      if (!seen.has(key)) {
        seen.add(key)

        items.push({
          title: monthNames[month],
          month,
          year,
        })
      }
    })

    items.sort((a, b) => a.year - b.year || a.month - b.month)

    selectorItems.value = items
  } catch (error) {
    console.error('Erro ao carregar meses:', error)
  }
})
</script>

<template>
  <div
    class="selector"
    :class="{ closed: !isMinimized }"
  >
    <h1 class="title">
      Datas
    </h1>

    <!--
    <select>
      <option value="1">2026</option>
      <option value="2">2025</option>
    </select>
    -->

    <div
      class="months"
      v-if="isMinimized"
    >
      <div
        class="month-card"
        v-on:click="
          () => {
            selected = 'all'
            emit('date_selected', null)
          }
        "
        v-bind:class="{ active: selected === 'all' }"
      >
        <h1>Todos</h1>
      </div>

      <div
        class="month-card"
        v-for="item in selectorItems"
        :key="item.title + item.year"
        v-on:click="
          () => {
            selected = item.title + item.year

            emit('date_selected', {
              month: item.month,
              year: item.year,
            })
          }
        "
        v-bind:class="{
          active: selected === item.title + item.year,
        }"
      >
        <h1>{{ item.title }}</h1>

        <p>{{ item.year }}</p>
      </div>
    </div>

    <button
      class="minimizer"
      v-on:click="isMinimized = !isMinimized"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        :class="{ closed: !isMinimized }"
      >
        <path
          d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.title {
  width: 130px;
  font-size: 24px;
}

.selector {
  height: 400px;
  width: fit-content;
  max-height: fit-content;
  margin: 20px 10px 40px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
}

.selector.closed {
  position: absolute;
  top: 64px;
  right: 0;
}

.minimizer {
  width: stretch;
  background-color: #ffffff;
  border: 0;
  cursor: pointer;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  transition: 0.2s;
}

svg:hover {
  width: 25px;
  height: 25px;
}

svg.closed {
  transform: rotate(-180deg);
}

.months {
  display: flex;
  flex-direction: column;
  height: 230px;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 130px;
  margin-top: 10px;
}

.months:hover {
  overflow-y: auto;
}

.month-card {
  border-bottom: 1px solid #ddd;
  padding-left: 5px;
  padding-bottom: 5px;
  width: 130px;
  cursor: pointer;
}

.month-card:hover {
  color: #003366;
  opacity: 0.7;
}

.month-card.active {
  color: #ffffff;
  background: #003366;
  transition: 0.3s;
}

.min:active {
  color: #003366;
}

h1 {
  font-size: 16px;
}

p {
  font-size: 12px;
  margin: 0;
}
</style>
